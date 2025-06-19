import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import JSONDB from "../utils/db.js";
import removeContainer from "../utils/delete-handler.js";
import { pgPortClose } from "./conductor.controller.js";

export const pgdb = new JSONDB("pgdb");
const monitoringData = new Map();

export async function checkPG(req, res) {
 try {
  const pg = pgdb.find({ userid: req.user.id });
  if (pg) {
   return res.status(200).json({ msg: "Playground owned" });
  }
  res.status(401).json({ msg: "Playground not owned" });
 } catch (error) {
  console.log(error);
  res.status(500).json({ msg: "Error occured" });
 }
}

export async function generateID(req, res) {
 try {
  const uid = req.user.id;
  const { type, pgname } = req.params;
  const pg = pgdb.find({ userid: uid, type });
  let id = pg?._id;
  if (!pg) {
   id = pgdb.write({ userid: req.user.id, type, pgname, status: "inactive", start: Date.now(), lastActive: null }).id;
  }
  res.status(201).json({ msg: "Playground created", id });
 } catch (error) {
  console.log(error);
  res.status(500).json({ msg: "Error occured" });
 }
}

export async function poll(req, res) {
 try {
  const id = req.params.id;
  const service = monitoringData.get(id);
  if (!service) {
   return res.status(404).json({ msg: 'No active service' });
  }
  clearTimeout(service.interractivityTimeout);
  const interractivityTimeout = setTimeout(() => {
   clearTimeout(service.timeout);
   removerService(id);
  }, 5 * 60 * 1000);
  service.interractivityTimeout = interractivityTimeout;
  res.json({ msg: 'Ping received, inactivity timer reset.' });
 } catch (error) {
  console.log(error);
  res.status(500).json({ msg: "Error occured" });
 }
}

export async function create(req, res) {
 try {
  const startTime = Date.now();
  const uid = req.user.id;
  const id = req.params.id;
  const pg = pgdb.find({ _id: id });
  if (!pg) {
   return res.status(404).json({ msg: "Playground not found" });
  }
  if (uid !== pg.userid) {
   return res.status(403).json({ msg: "Not your playground" });
  }
  pgMonitor(startTime, pg?.start, pg._id);
  if (pg.post_name) {
   // populate(pg._id, pg.ip);
   return res.status(200).json({ msg: "Playground already exists", details: pg });
  }

  const uniqueId = uuidv4().replace(/\D/g, '').slice(0, 12);
  const response = await axios.post(`${process.env.BENDER_URL}/bridges/` + (pg.pgname ?? "2vmpg"), {
   id: `${pg._id}`,
   name: `pg${uniqueId}`,
   image: `repo.synnefo.solutions/devaraj/2vmpg`,
  });
  const result = pgdb.update(id, {
   ...response.data,
   post_name: `pg${uniqueId}`,
   status: "active",
   lastActive: startTime,
   userid: req.user.id
  });
  // populate(result.id, response.data.ip);
  // await waitForPort(response.data.ip, 8080);
  // await axios.get(`http://${response.data.ip}:8080/wait-for-vms`)
  await axios.post(`${process.env.VITE_CONDUCTOR_URL}/wait-for-vms`, { ip: response.data.ip })
  res.status(201).json({
   msg: "Playground created", details: {
    status: "active",
    lastActive: startTime
   }
  });
 } catch (error) {
  console.log(error);
  res.status(500).json({ msg: "Failed to create" });
 }
}

export async function read(req, res) {
 try {
  const uid = req.user.id;
  const nos = pgdb.readAll();
  const response = await axios.get(`${process.env.BENDER_URL}/bridges`);
  const result = nos.map(entry => {
   const match = response.data.find(e => e.name.endsWith(entry.post_name));
   return { ...entry, instance: match };
  });
  result.reverse();
  res.status(200).json({ msg: "List fetched successfully", result: result.filter(e => e.userid === uid) });
 } catch (error) {
  console.log(error);
  res.status(500).json({ msg: "Failed to list" });
 }
}

export async function remove(req, res) {
 try {
  const id = req.params.id;
  const name = pgdb.read(id)?.post_name;
  if (name) {
   removeContainer(name);
  }
  pgdb.deleteOne(id);
  await pgPortClose(id);
  const service = monitoringData.get(id);
  if (service) {
   clearTimeout(service.timeout);
   clearTimeout(service.interractivityTimeout);
  }
  monitoringData.delete(id);
  res.status(200).json({ msg: "Playground deleted successfully" });
 } catch (error) {
  console.log(error);
  res.status(500).json({ msg: "Failed to delete playground" });
 }
}

export async function getIP(req, res) {
 try {
  const id = req.params.id;
  const ip = pgdb.read(id).ip;
  // populate(id, ip);
  res.status(200).json({ msg: "IP fetched", ip });
 } catch (error) {
  console.log(error);
  res.status(500).json({ msg: "Failed to fetch IP" });
 }
}

export async function checkTest(req, res) {
 try {
  const id = req.params.id;
  const vm = req.params.vm;
  const test = req.params.test;
  const args = req.query.args;
  const ip = pgdb.read(id)?.ip;
  if (!ip) {
   res.status(500).json({ msg: "Failed to check test" });
   return;
  }
  // const url = `http://${ip}:8080/examiner/test/${vm}/${test}?args=${args}`;
  // const result = await axios.post(url);
  const result = await axios.post(`${process.env.VITE_CONDUCTOR_URL}/examiner`, { ip, vm, test, args })
  if (result.data.success) {
   res.status(200).json({ msg: "Test complete", isPass: result.data.success });
   return;
  }
  res.status(200).json({ msg: "Test complete", isPass: false });
 } catch (error) {
  console.log(error);
  res.status(500).json({ msg: "Failed to check test", isPass: false });
 }
}

function pgMonitor(initialST, ST, id) {
 const startTime = ST ?? initialST;
 const timeElapsed = Date.now() - startTime;
 const timeRemaining = (60 * 60 * 1000) - timeElapsed;
 const exists = monitoringData.get(id);
 if (exists) {
  clearTimeout(exists.timeout);
  clearTimeout(exists.interractivityTimeout);
 }
 const timeout = setTimeout(() => removerService(id), timeRemaining);
 const interractivityTimeout = setTimeout(() => removerService(id), 5 * 60 * 1000);
 monitoringData.set(id, { timeout, interractivityTimeout });
}

function removerService(id) {
 const name = pgdb.read(id)?.post_name;
 if (name) {
  removeContainer(name);
 }
 pgdb.deleteOne(id);
 monitoringData.delete(id);
}

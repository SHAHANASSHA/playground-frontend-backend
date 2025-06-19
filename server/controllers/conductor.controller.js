import axios from "axios";
import JSONDB from "../utils/db.js";
import { pgdb } from "./bender.controller.js";

export const openports = new JSONDB("openports")

// When opening port ✅
export async function openPort(req, res) {
 try {
  const pg = pgdb.find({ userid: req.user.id, _id: req.params.id });
  const vm = req.params.vm;
  const port = req.params.port;
  const pg_ip = pg.ip;
  const pg_name = pg.post_name;
  const domain = process.env.PORT_DOMAIN;
  const short_id = simpleHash(vm, port);
  const subdomain = `${pg_name}-${short_id}.${domain}.`

  const payload = {
   domain: domain,
   subdomain: subdomain,
   pg_ip: pg_ip,
   vm: vm,
   port: port,
   short_id: short_id
  }

  const response = await axios.post(`${process.env.VITE_CONDUCTOR_URL}/open-port`, payload);
  if (response.status !== 200) {
   return res.status(500).json({ msg: "Failed to open port" });
  }
  const exists = openports.find({ subdomain });
  if (exists) {
   openports.update(exists._id, { pg_id: pg._id, subdomain: subdomain, vm, ip: pg_ip, port, short_id });
  } else {
   openports.write({ pg_id: pg._id, subdomain: subdomain, vm, ip: pg_ip, port, short_id });
  }
  res.json({ msg: "Port opened" });
 } catch (error) {
  console.log(error);
  res.status(500).json({ msg: "error" });
 }
}

// When closing port ✅
export async function closePort(req, res) {
 try {
  const openport = openports.find({ _id: req.params.id });
  const domain = process.env.PORT_DOMAIN;
  const payload = {
   id: openport.pg_id,
   domain: domain,
   openport: [{ subdomain: openport.subdomain }]
  };

  const DNSresponse = await axios.patch(`${process.env.VITE_CONDUCTOR_URL}/close-port/${openport.short_id}`, payload);
  if (DNSresponse.status !== 200) {
   return res.status(500).json({ msg: "Failed to close port" });
  }
  openports.deleteOne(req.params.id);
  res.json({ msg: "Port closed" });
 } catch (error) {
  console.log(error);
  res.status(500).json({ msg: "error" });
 }
}

// When listing ports ✅
export async function listPort(req, res) {
 try {
  const id = req.params.id;
  const portList = openports.findMany({ pg_id: id });
  res.json({ msg: "Port list", list: portList });
 } catch (error) {
  console.log(error);
  res.json({ msg: "error" });
 }
}

// When deleting container ✅
export async function pgPortClose(pg_id) {
 try {
  const openport = openports.findMany({ pg_id });
  const domain = process.env.PORT_DOMAIN;
  const portList = openport.map(e => ({ subdomain: e.subdomain }));
  const payload = {
   id: pg_id,
   domain: domain,
   openport: portList
  };
  const DNSresponse = await axios.patch(`${process.env.VITE_CONDUCTOR_URL}/remove-container`, payload);
  if (DNSresponse.status !== 200) throw new Error("DNS Update failed");
  openports.deleteByField("pg_id", pg_id);
 } catch (error) {
  console.log(error);
 }
}

// Simple hash ✅
function simpleHash(value1, value2) {
 const str = `${value1}::${value2}`
 let hash = 0;
 for (let i = 0; i < str.length; i++) {
  hash = (hash << 5) - hash + str.charCodeAt(i);
  hash |= 0;
 }
 return Math.abs(hash).toString(36);
}
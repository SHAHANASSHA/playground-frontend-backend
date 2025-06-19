import jwt from "jsonwebtoken";
import JSONDB from "../utils/db.js";

const { sign, verify } = jwt;
const tokendb = new JSONDB("tokendb");

export async function login(req, res) {
 try {
  const { username, password } = req.body;
  if (!(username === "admin" && password === "password")) {
   return res.status(401).json({ msg: "Invalid username or password" });
  }
  const token = sign({
   uid: "adm123",
   username,
  }, process.env.ADMIN_JWT_SECRET, {
   expiresIn: "24h"
  });
  res.status(200).json({ msg: "Login successful", token });
 } catch (error) {
  console.log(error);
  res.status(401).json({ msg: "Login failed" });
 }
}

export async function check(req, res) {
 try {
  const token = req.headers?.authorization?.split(" ")?.[1];
  const admin = verify(token, process.env.ADMIN_JWT_SECRET);
  if (admin) {
   return res.status(200).json({ msg: "Verified" });
  }
  res.status(401).json({ msg: "Session expired" });
 } catch (error) {
  console.log(error);
  res.status(401).json({ msg: "Session expired" });
 }
}

export async function createToken(req, res) {
 try {
  const id = tokendb.write({ status: "inactive" }).id;
  res.status(201).json({ msg: "token generated", id });
 } catch (error) {
  console.log(error);
  res.status(500).json({ msg: "Error occured" });
 }
}

export async function getTokens(req, res) {
 try {
  const list = tokendb.readAll();
  res.status(200).json({ msg: "token fetched", list });
 } catch (error) {
  console.log(error);
  res.status(500).json({ msg: "Error occured" });
 }
}

export async function deleteTokens(req, res) {
 try {
  const id = req.params.id;
  tokendb.deleteOne(id);
  res.status(200).json({ msg: "token deleted" });
 } catch (error) {
  console.log(error);
  res.status(500).json({ msg: "Error occured" });
 }
}

export async function verifyToken(req, res) {
 try {
  const userid = req.user.id;
  const id = req.params.id;
  console.log(userid, id);
  const token = tokendb.find({ _id: id });
  if (token && token.status !== "active") {
   tokendb.update(id, { userid, status: "active" });
   return res.status(200).json({ msg: "token verified" });
  }
  res.status(401).json({ msg: "Invalid token" });
 } catch (error) {
  console.log(error);
  res.status(500).json({ msg: "Error occured" });
 }
}

export async function checkToken(uid) {
 const x = tokendb.find({ userid: uid });
 return x;
}
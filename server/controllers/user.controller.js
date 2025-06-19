import axios from "axios";
import jwt from "jsonwebtoken";
import JSONDB from "../utils/db.js";
import { checkToken } from "./admin.controller.js";

const { sign } = jwt;

const userdb = new JSONDB("userdb");

export async function getUser(req, res) {
 try {
  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.verify(token, process.env.JWT_SECRET);
  const details = userdb.read(user.id);
  const isVerified = Boolean(await checkToken(details._id));
  res.status(200).json({ msg: "Verified", user: { ...details, isVerified } })
 } catch (error) {
  console.log(error);
  res.status(403).json({ msg: "Authorization failed" });
 }
}

export async function githubLogin(req, res) {
 try {
  const { code } = req.body;
  const clientId = process.env.VITE_GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  const tokenResponse = await axios.post(
   'https://github.com/login/oauth/access_token',
   {
    client_id: clientId,
    client_secret: clientSecret,
    code,
   },
   {
    headers: { accept: 'application/json' },
   }
  );

  const accessToken = tokenResponse.data.access_token;

  const userResponse = await axios.get('https://api.github.com/user', {
   headers: { Authorization: `token ${accessToken}` },
  });

  const gid = userResponse.data.id;
  const username = userResponse.data.login;
  const avatar_url = userResponse.data.avatar_url;
  const name = userResponse.data.name;
  const userExists = userdb.find({ gid, username });
  let id;
  if (userExists) {
   id = userdb.update(userExists._id, { gid, username, avatar_url, name }).id;
  } else {
   id = userdb.write({ gid, username, avatar_url, name }).id;
  }
  const token = sign({ id, gid, username }, process.env.JWT_SECRET, { expiresIn: "48h" });
  res.status(200).json({ msg: "Login success", user: userResponse.data, token });
 } catch (error) {
  console.log(error);
  res.status(500).json({ msg: "Authentication failed" });
 }
}

export async function logout(req, res) {
 try {

  res.status(200).json({ msg: "Logout success" });
 } catch (error) {
  console.log(error);
  res.status(500).json({ msg: "Logout failed" });
 }
}
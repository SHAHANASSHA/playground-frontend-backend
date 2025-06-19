import jwt from "jsonwebtoken";

function auth(req, res, next) {
 try {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.sendStatus(403);
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.user = user;
  next();
 } catch (err) {
  console.log(err);
  return res.sendStatus(403);
 }
};

export default auth;
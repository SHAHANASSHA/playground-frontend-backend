import jwt from "jsonwebtoken";

function adminAuth(req, res, next) {
 const token = req.headers.authorization.split(" ")[1];
 if (!token) return res.sendStatus(403);
 try {
  const user = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
  req.user = user;
  next();
 } catch (err) {
  console.log(err);
  return res.sendStatus(403);
 }
};

export default adminAuth;
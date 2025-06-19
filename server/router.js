import { Router } from "express";
import auth from "./middleware/auth.js";
import * as bender from "./controllers/bender.controller.js";
import * as user from "./controllers/user.controller.js";
import * as admin from "./controllers/admin.controller.js";
import * as conductor from "./controllers/conductor.controller.js";
import adminAuth from "./middleware/admin-auth.js";

const router = Router();

router.route("/test").get((_, res) => res.send("Test OK"));

// Admin controller
router.route("/adm-login").post(admin.login);
router.route("/check-sesstion").get(admin.check);
router.route("/generate-token").post(adminAuth, admin.createToken);
router.route("/list-tokens").get(adminAuth, admin.getTokens);
router.route("/delete-token/:id").delete(adminAuth, admin.deleteTokens);

// User controller
router.route("/user").get(user.getUser);
router.route("/auth/github").post(user.githubLogin);
router.route("/logout").post(user.logout);
router.route("/verify-token/:id").post(auth, admin.verifyToken);

// Bender controller
router.route("/generate-id/:type/:pgname").get(auth, bender.generateID);
router.route("/pg-poll/:id").get(auth, bender.poll);
router.route("/playground/:id").post(auth, bender.create);
router.route("/playground").get(auth, bender.read);
router.route("/playground/:id").delete(auth, bender.remove);
router.route("/pg-check").get(auth, bender.checkPG);
router.route("/get-ip/:id").get(auth, bender.getIP);
router.route("/check-test/:id/:vm/:test").get(auth, bender.checkTest);

// Conductor controller
router.route("/port/:id").get(auth, conductor.listPort);
router.route("/port/:id/:vm/:port").post(auth, conductor.openPort);
router.route("/port/:id").delete(auth, conductor.closePort);


export default router;

// let d = {
//  "id": "abcfdrsef",
//  "domain": "abcd.com",
//  "openport": [
//   {
//    "subdomain": "80,abcd.com"
//   },
//   {
//    "subdomain": "60.abcd.com"
//   },
//  ]
// }
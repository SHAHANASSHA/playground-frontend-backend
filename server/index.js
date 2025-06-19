import http from "http";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
// import morgan from "morgan";
import dotenv from "dotenv";
import router from "./router.js";

dotenv.config();
// import handleProxyConnection from "./ws-controller.js";
// import getDestination from "./utils/get-destination.js";

const app = express();
const server = http.createServer(app);

// app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static("./dist"));
app.use("/api/v1", router);

app.get('*path', (_, res) => res.sendFile(path.resolve('./dist/index.html')));

server.listen(process.env.PORT, err => {
 if (err) return console.log("Error starting server", err);
 console.log(`Server started on port: ${process.env.PORT}`);
});
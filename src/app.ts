import express from "express";
import path from "path"
import router from "./router";
import routerAdmin from "./router-admin";
import morgan from "morgan";
import { MORGAN_FORMAT } from "./libs/config";

/** 1-Entrance **/
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(morgan(MORGAN_FORMAT))
/** 2-Sessions **/

/** 3-Views **/
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs");
/** 4-Router **/
app.use("/admin", routerAdmin); // BSSR: EJS
app.use("/", router); // SPA: React

export default app; // same as module exports in common js
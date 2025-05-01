import express from "express";
import path from "path"
import router from "./router";
import routerAdmin from "./router-admin";
import morgan from "morgan";
import { MORGAN_FORMAT } from "./libs/config";



import session from "express-session";
import ConnectMongoDB from "connect-mongodb-session";

const MongoDBStore = ConnectMongoDB(session);
const app = express();
const store = new MongoDBStore({
  uri: String(process.env.MONGODB_URL),
  collection:"sessions",
});


app.use(
  session({
    secret: String(process.env.SESSION_SECRET),
    cookie: {
      maxAge: 1000 * 60 * 60 * 3 // 3 soat  - bu cookie ning muddati yani datalar saqlash turib muddati 
    },
    store: store,
    resave: true,
    saveUninitialized: true,  // false - birinchi tashrifda datalarni saqlash vaqti , agar true bo'lsa har safar saqlaydi 
    })    
);
/** 1-Entrance **/

app.use(express.static(path.join(__dirname,"public")));
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
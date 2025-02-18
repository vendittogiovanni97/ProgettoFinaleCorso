import express from "express";
import dotenv from "dotenv";
import expressSession from "express-session";
import cors from "cors";
import addRoutes from "./routes";

dotenv.config();

const port = process.env.PORT;

if (process.env.SESSION_SECRET === undefined) {
  throw new Error("Define SESSION_SECRET");
}

const app = express();

app.use(cors({
  origin: process.env.ORIGIN,
  credentials: true
}))

app.use(express.json());
app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  resave: true,
  rolling: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 86400000,
    sameSite: 'strict',
    secure: false
  }
}))

addRoutes(app);

app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`)
})
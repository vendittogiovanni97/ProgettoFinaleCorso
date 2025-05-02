import express from "express";
import dotenv from "dotenv";
import expressSession from "express-session";
import cors from "cors";
import expressWs from "express-ws";
import { addWsRoutes } from "./routes-websocket/index-websocket";
import http from "http";  // Cambiato da https a http
import fs from "fs";
import addRoutes from "./routes";
import { WebSocketManager } from "./websocket-server";
import { oggi } from "./configuration/time.config";
import { errorHandler } from "./middleware/errorMiddleware";
import path from "path";
import accountRouter from "./routes/accountRouter";

dotenv.config();

const port = process.env.PORT;

if (process.env.SESSION_SECRET === undefined) {
  throw new Error("Define SESSION_SECRET");
}

const app = express();
const appws = expressWs(app);

const server = http.createServer(appws.app);

// Aggiungiamo il middleware keep-alive come primo middleware
app.use((request, response, next) => {
  response.setHeader('Connection', 'keep-alive');
  response.setTimeout(30000);
  next();
});

// Prima configuriamo il parsing del body
app.use(express.json());

// Poi configuriamo CORS
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

// Infine il logging
app.use((request, response, next) => {
  console.log('Richiesta ricevuta:', {
    method: request.method,
    url: request.url,
    body: request.body,
    headers: request.headers
  });
  next();
});

// Il resto dei middleware
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 86400000,
      sameSite: "strict",
    },
  })
);

app.use("/api/account", accountRouter);

new WebSocketManager(server);

addRoutes(app);
addWsRoutes(app);

app.use(errorHandler);

app.use((request, response, next) => {
  // Imposta l'header Connection su keep-alive
  response.setHeader('Connection', 'keep-alive');
  // Imposta il timeout della connessione a 30 secondi
  response.setTimeout(30000);
  next();
});

server.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port} ${oggi}`);
});

//per formattare data oggi alle ore eccc

//nmpi i express-fileupload / npm i n--save-dev @type/espress-fileupload

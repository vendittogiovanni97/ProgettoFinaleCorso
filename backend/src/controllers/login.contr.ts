import { LoginInfo } from "accountInfo";
import { Request, Response } from "express";
import dbClient from "../dbconfiguration/db-config";
import bcrypt from "bcrypt";
import { SessionManager } from "../sessionData";
import { Cookie, SessionData } from "express-session";

const login = async (
  request: Request<undefined, unknown, LoginInfo>,
  response: Response
) => {
  const {body} = request;
  console.log('dati', body)
  console.log('body')

  const user = await dbClient.userAccount.findUnique({
    where: {
      email: body.email,
    },
    include: {
      user: true, // Include i dati dell'utente associato
    },
  });

  if (user === null) {
    response.statusMessage = "Wrong credentials";
    response.status(400).json("Wrong credentials");
    return;
  }

  const hashedPassword = user.password;
  const isCorrect = await bcrypt.compare(body.password, hashedPassword);

  if (!isCorrect) {
    response.statusMessage = "Wrong credentials";
    response.status(400).json("Wrong credentials");
    return;
  }

  // Crea la sessione
  const sessionManager = SessionManager.getInstance();
  const sessionData: SessionData = {
    userId: user.userId,
    email: user.email,
    firstName: user.user.firstName,
    cookie: new Cookie(),
  };

  // Salva la sessione
  sessionManager.createSession(sessionData);

  // Salva i dati nella session di Express
  request.session.userId = user.userId;
  request.session.email = user.email;
  request.session.firstName = user.user.firstName;

  response.status(200).json("User logged in");
};

export default login;

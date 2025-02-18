import { Request, Response } from "express";
import { RegisterInfoSchema } from "../validation/accountSchema"
import { RegisterInfo } from "accountInfo";
import bcrypt from "bcrypt";
import dbClient from "../dbconfiguration/db-config";


export const register = async (
  request: Request<undefined, unknown, RegisterInfo>,
  response: Response
) => {
  const body = request.body;

  const verifiedBody = RegisterInfoSchema.safeParse(body);

  if (verifiedBody.success === false) {
    response.status(400).json(verifiedBody.error);
    return;
  }
  const passwordHash = await bcrypt.hash(verifiedBody.data.password, 12);

  try {
    await dbClient.user.create({
      data: {
        firstName: verifiedBody.data.firstName,
        lastName: verifiedBody.data.lastName,
        birthDate:
        verifiedBody.data.birthDate !== undefined
        ? new Date(verifiedBody.data.birthDate)
        : undefined!,
        accounts: {
          create: {
            email:verifiedBody.data.email,
            username: verifiedBody.data.username,
            password: passwordHash,
          },
        },
      },
    });
    response.status(200).json("User registered successfully");
  } catch (error) {
    console.error(error);
    if (error === 'P2002') {
      // Gestione del caso di email o username duplicati
      response.status(409).json("Email or username already exists");
    } else {
      response.status(409).json("Email or username already exists");
    }
  }
}
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import dbClient from "../../configuration/db.config";
import { RegisterInfoSchema } from "../../validation/schemaValidation";
import { RegisterInfo } from "../../types/infoSchema";
import { User } from "@prisma/client";

export const register = async (
  request: Request<undefined, unknown, RegisterInfo>,
  response: Response
): Promise<void> => {
  try {
    const body = request.body;
    
    const verifiedBody = RegisterInfoSchema.safeParse(body);
    if (!verifiedBody.success) {
      response.status(400).json({
        success: false,
        message: "Dati di registrazione non validi",
        errors: verifiedBody.error.errors
      });
      return;
    }

    const [existingUser, passwordHash] = await Promise.all([
      dbClient.user.findFirst({
        where: {
          OR: [
            { email: verifiedBody.data.email },
            { username: verifiedBody.data.username }
          ]
        }
      }),
      bcrypt.hash(verifiedBody.data.password, 12)
    ]);

    if (existingUser) {
      response.status(409).json({
        success: false,
        message: "Email o username già esistenti"
      });
      return;
    }

    const newUser = await Promise.race([
      dbClient.user.create({
        data: {
          email: verifiedBody.data.email,
          username: verifiedBody.data.username,
          password: passwordHash,
        },
      }),
      new Promise<User>((_, reject) => 
        setTimeout(() => reject(new Error('Timeout durante la creazione utente')), 5000)
      )
    ]);

    response.status(200).json({
      success: true,
      message: "Utente registrato con successo",
      userId: newUser.id,
    });
  } catch (error: any) {
    console.error('Errore dettagliato:', error);

    if (error?.code === 'P2002') {
      response.status(409).json({
        success: false,
        message: "Email o username già esistenti"
      });
      return;
    }

    if (error.message === 'Timeout durante la creazione utente') {
      response.status(504).json({
        success: false,
        message: "Timeout durante la registrazione"
      });
      return;
    }

    response.status(500).json({
      success: false,
      message: "Errore durante la registrazione",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

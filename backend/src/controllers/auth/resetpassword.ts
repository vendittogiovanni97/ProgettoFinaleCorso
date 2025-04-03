import { Request, Response } from "express";
import bcrypt from "bcrypt";
import dbClient from "../../configuration/db.config";
import { responseStatus } from "../../constants/status";
import { AppSuccess } from "../../types/succesType";
import { AppError } from "../../types/errorType";
import { ErrorCodes } from "../../constants/errorCodes";

const resetPassword = async (request: Request, response: Response) => {
  if (!request.session.id) {
    throw new AppError(
      responseStatus.UNAUTHORIZED,
      ErrorCodes.PERMISSION_DENIED,
      "Devi essere loggato per cambiare la password"
    );
  }

  const { newPassword } = request.body;
  if (!newPassword || newPassword.length < 6) {
    throw new AppError(
      responseStatus.BAD_REQUEST,
      ErrorCodes.INVALID_CREDENTIALS,
      "La password deve avere almeno 6 caratteri"
    );
  }

  // Hash della nuova password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Aggiornamento nel database
  await dbClient.user.update({
    where: { id: request.session.id },
    data: { password: hashedPassword },
  });
  AppSuccess.getInstance().successResponse(
    response,
    "Password aggiornata con successo!",
    responseStatus.OK,
    { password: hashedPassword }
  );

  return;
};

export default resetPassword;

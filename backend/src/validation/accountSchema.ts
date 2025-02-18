import { z } from "zod";

export const RegisterInfoSchema = z.object({
  firstName: z.string().max(49),
  lastName: z.string().max(49),
  username: z.string().max(49).min(5),
  email: z.string().email({message: "Invalid email address"}).max(49),
  password: z.string().min(6, { message: "Must be 6 or more characters long" }).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/).regex(/[!@#$%^&*(),.?":{}|<>]/),
  birthDate: z.string().date(),
});

export const LoginInfoSchema = z.object({
  email:z.string().email(),
  password: z.string().min(6, { message: "Must be 6 or more characters long" }).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/).regex(/[!@#$%^&*(),.?":{}|<>]/)
})

export const PasswordInfoSchema = z.object({
  password: z.string().min(6, { message: "Must be 6 or more characters long" }).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/).regex(/[!@#$%^&*(),.?":{}|<>]/)
})
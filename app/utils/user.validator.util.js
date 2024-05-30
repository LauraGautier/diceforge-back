import { z } from "zod";

export const userSchema = z.object({
  firstname: z.string().min(2, "Le prénon doit contenir au moins 2 caractères"),
  lastname: z.string().min(2, "Le prénon doit contenir au moins 2 caractères"),
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{2,}$/, "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre")
});


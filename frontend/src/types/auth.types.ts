import { z } from "zod";

export const registerSchema = z
  .object({
    username: z.string().min(4, "El nombre de usuario es requerido"),
    email: z
      .string()
      .min(4, "El correo es requerido")
      .email("El correo es inválido")
      .trim(),
    password: z.string().min(8, "La contraseña debe tener mínimo 8 caracteres"),
    repeat_password: z
      .string()
      .min(8, "La contraseña debe tener mínimo 8 caracteres"),
    roles: z.array(z.string()),
  })
  .refine((data) => data.password === data.repeat_password, {
    message: "Las contraseñas no coinciden",
    path: ["repeat_password"],
  });

export const loginSchema = z.object({
  email: z
    .string()
    .min(4, "El correo es requerido")
    .email("El correo es inválido")
    .trim(),
  password: z.string().min(8, "La contraseña debe tener mínimo 8 caracteres"),
});

export const updateProfileSchema = z.object({
  username: z.string().min(1, "El nombre de usuario es requerido").trim(),
  email: z
    .string()
    .min(4, "El correo es requerido")
    .email("El correo es inválido")
    .trim(),
});

export const changePasswordSchema = z
  .object({
    old_password: z
      .string()
      .min(8, "La contraseña debe tener mínimo 8 caracteres"),
    new_password: z
      .string()
      .min(8, "La contraseña debe tener mínimo 8 caracteres"),
    repeat_password: z
      .string()
      .min(8, "La contraseña debe tener mínimo 8 caracteres"),
  })
  .refine((data) => data.new_password === data.repeat_password, {
    message: "Las contraseñas no coinciden",
    path: ["repeat_password"],
  });

export type Register = z.infer<typeof registerSchema>;
export type Login = z.infer<typeof loginSchema>;
export type UpdateProfile = z.infer<typeof updateProfileSchema>;
export type ChangePassword = z.infer<typeof changePasswordSchema>;

"use server";

import api from "@/lib/fetch";
import {
  AuthUser,
  ChangePassword,
  Login,
  LoginResponse,
  Register,
  UpdateProfile,
} from "@/types/auth.types";

export const register = async (data: Register): Promise<LoginResponse> =>
  await api({ method: "POST", endpoint: "/auth/register", body: data });

export const login = async (data: Login): Promise<LoginResponse> =>
  await api({ method: "POST", endpoint: "/auth/login", body: data });

export const profile = async (): Promise<AuthUser> =>
  await api({ endpoint: "/auth/profile" });

export const updateProfile = async (data: UpdateProfile) =>
  await api({ method: "PATCH", endpoint: "/auth/update-profile", body: data });

export const changePassword = async (data: ChangePassword) =>
  await api({ method: "PATCH", endpoint: "/auth/change-password", body: data });

// export const register = async (formData: Register) => {
//   const response: ResponseTokens = await api({
//     method: "POST",
//     endpoint: "/auth/register",
//     body: formData,
//   });

//   const accessToken = response.access_token;
//   const refreshToken = response.refresh_token;

//   await setSession({ accessToken, refreshToken });

//   return { message: response.message };
// };

// export const login = async (formData: Login) => {
//   const response: ResponseTokens = await api({
//     method: "POST",
//     endpoint: "/auth/login",
//     body: formData,
//   });

//   const accessToken = response.access_token;
//   const refreshToken = response.refresh_token;

//   await setSession({ accessToken, refreshToken });

//   return { message: response.message };
// };

// export const verifyToken = async () =>
//   await api({ endpoint: "/auth/verify-token" });

// export const refreshToken = async (
//   refreshToken: string
// ): Promise<{ message: string; accessToken: string; status: boolean }> => {
//   const response = await fetch(
//     `${process.env.API_BASE_URL}/auth/refresh-token`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${refreshToken}`,
//       },
//     }
//   );
//   const data = await response.json();

//   return {
//     message: data.message,
//     accessToken: data.access_token,
//     status: true,
//   };
// };

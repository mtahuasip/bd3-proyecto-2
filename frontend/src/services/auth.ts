import {
  ChangePassword,
  Login,
  Register,
  UpdateProfile,
} from "@/types/auth.types";
import { SessionUser } from "@/types/session";
import apiRequest from "./api-request";

export const register = (body: Register) =>
  apiRequest({ method: "POST", endpoint: "/auth/register", body });

export const login = (body: Login) =>
  apiRequest({ method: "POST", endpoint: "/auth/login", body });

export const getMe = (headers?: Record<string, string>): Promise<SessionUser> =>
  apiRequest({ method: "GET", endpoint: "/auth/me", headers });

export const updateProfile = (body: UpdateProfile) =>
  apiRequest({ method: "PATCH", endpoint: "/auth/update-profile", body });

export const changePassword = (body: ChangePassword) =>
  apiRequest({ method: "PATCH", endpoint: "/auth/change-password", body });

export const logout = () =>
  apiRequest({ method: "POST", endpoint: "/auth/logout" });

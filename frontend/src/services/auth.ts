import { SessionUser } from "@/types/session";
import apiRequest from "./api-request";

export const registerRequest = (body: any) =>
  apiRequest({ method: "POST", endpoint: "/auth/register", body });

export const loginRequest = (body: any) =>
  apiRequest({ method: "POST", endpoint: "/auth/login", body });

export const getMe = (headers?: Record<string, string>): Promise<SessionUser> =>
  apiRequest({ method: "GET", endpoint: "/auth/me", headers });

export const updateProfileRequest = (body: any) =>
  apiRequest({ method: "PATCH", endpoint: "/auth/update-profile", body });

export const changePasswordRequest = (body: any) =>
  apiRequest({ method: "PATCH", endpoint: "/auth/change-password", body });

export const logoutRequest = () =>
  apiRequest({ method: "POST", endpoint: "/auth/logout" });

import apiRequest from "./api-request";

export const registerRequest = (formData: any) =>
  apiRequest({ method: "POST", endpoint: "/auth/register", body: formData });

export const loginRequest = (formData: any) =>
  apiRequest({ method: "POST", endpoint: "/auth/login", body: formData });

export const meRequest = (headers?: any) =>
  apiRequest({ method: "GET", endpoint: "/auth/me", headers });

export const logoutRequest = () =>
  apiRequest({ method: "POST", endpoint: "/auth/logout" });

import api from "@/lib/fetch";
import { setSession } from "@/lib/session";
import {
  ChangePassword,
  Login,
  Register,
  UpdateProfile,
} from "@/types/auth.types";
import { SessionUser } from "@/types/session.types";

interface ResponseTokens {
  message: string;
  access_token: string;
  refresh_token: string;
}

export const register = async (formData: Register) => {
  const response: ResponseTokens = await api({
    method: "POST",
    endpoint: "/auth/register",
    body: formData,
  });

  const accessToken = response.access_token;
  const refreshToken = response.refresh_token;

  await setSession({ accessToken, refreshToken });

  return { message: response.message };
};

export const login = async (formData: Login) => {
  const response: ResponseTokens = await api({
    method: "POST",
    endpoint: "/auth/login",
    body: formData,
  });

  const accessToken = response.access_token;
  const refreshToken = response.refresh_token;

  await setSession({ accessToken, refreshToken });

  return { message: response.message };
};

export const profile = async (): Promise<SessionUser> =>
  await api({ endpoint: "/auth/profile" });

export const updateProfile = async (formData: UpdateProfile) =>
  await api({
    method: "PATCH",
    endpoint: "/auth/update-profile",
    body: formData,
  });

export const changePassword = async (formData: ChangePassword) =>
  await api({
    method: "PATCH",
    endpoint: "/auth/change-password",
    body: formData,
  });

export const verifyToken = async () =>
  await api({ endpoint: "/auth/verify-token" });

export const refreshToken = async (
  refreshToken: string
): Promise<{ message: string; accessToken: string; status: boolean }> => {
  const response = await fetch(
    `${process.env.API_BASE_URL}/auth/refresh-token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );
  const data = await response.json();

  return {
    message: data.message,
    accessToken: data.access_token,
    status: true,
  };
};

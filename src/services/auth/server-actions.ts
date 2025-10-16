"use server";

import { cookies } from "next/headers";
import { AuthLoginResponse, AuthRegisterResponse } from "@/types";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const TOKEN_COOKIE_NAME = "access_token";

export async function loginAction(
  formData: FormData
): Promise<AuthLoginResponse | { error: string; status: "error" }> {
  try {
    const res = await axios.post(`${API_BASE_URL}user/login`, formData, {
      headers: {},
    });

    const data = res.data as AuthLoginResponse;

    const token = data?.data?.token;
    const userRole = data?.data?.user?.role;
    
    if (token) {
      (await cookies()).set(TOKEN_COOKIE_NAME, token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    // Store user role in cookie for middleware access
    if (userRole && Array.isArray(userRole)) {
      (await cookies()).set('user_role', JSON.stringify(userRole), {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("AXIOS XƏTASI:", error.response?.data);
      const errorMessage =
        error.response?.data?.message || "Giriş zamanı xəta baş verdi";
      return { error: errorMessage, status: "error" as const };
    }

    console.error("NAMƏLUM XƏTA:", error);
    return { error: "Giriş zamanı gözlənilməz xəta baş verdi", status: "error" as const };
  }
}

export async function logoutAction() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("access_token");
    cookieStore.delete("user_role");

    return { success: true };
  } catch {
    return { error: "Logout failed" };
  }
}

export async function registerAction(
  formData: FormData
): Promise<AuthRegisterResponse | { error: string; status: "error" }> {
  try {
    const res = await axios.post(`${API_BASE_URL}user/register`, formData, {});

    const data = res.data as AuthRegisterResponse;

    const token = data?.data?.access_token;
    const userRole = data?.data?.role;
    
    if (token) {
      (await cookies()).set(TOKEN_COOKIE_NAME, token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    // Store user role in cookie for middleware access
    if (userRole && Array.isArray(userRole)) {
      (await cookies()).set('user_role', JSON.stringify(userRole), {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("AXIOS XƏTASI:", error.response?.data);
      const errorMessage =
        error.response?.data?.message || "Qeydiyyat zamanı xəta baş verdi";
      return { error: errorMessage, status: "error" as const };
    }

    console.error("NAMƏLUM XƏTA:", error);
    return { error: "Qeydiyyat zamanı gözlənilməz xəta baş verdi", status: "error" as const };
  }
}



"use server";

import { cookies } from "next/headers";
import { AuthLoginResponse, AuthRegisterResponse, UserData } from "@/types";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const TOKEN_COOKIE_NAME = "access_token";

export async function loginAction(
  email: string,
  password: string,
  marketSlug: string
): Promise<AuthLoginResponse> {
  const res = await fetch(`${API_BASE_URL}user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, marketSlug }),
    cache: "no-store",
  });

  if (!res.ok) {
    const message = await safeReadError(res);
    throw new Error(message || "Login failed");
  }

  const data = (await res.json()) as AuthLoginResponse;

  const token = data?.data?.token;
  if (token) {
    (await cookies()).set(TOKEN_COOKIE_NAME, token, {
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  }

  return data;
}

export async function safeReadError(
  res: Response
): Promise<string | undefined> {
  try {
    const json = (await res.json()) as Partial<AuthLoginResponse> & {
      message?: string;
    };
    return json?.message;
  } catch {
    return undefined;
  }
}

export async function logoutAction() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("access_token");

    return { success: true };
  } catch {
    return { error: "Logout failed" };
  }
}


export async function registerAction(formData: FormData): Promise<AuthRegisterResponse> {
  
  
  try {
    const res = await axios.post(`${API_BASE_URL}user/register`, formData, {
      headers: {
      },
    });

    console.log("Serverdən gələn cavab:", res.data);

    const data = res.data as AuthRegisterResponse;

    const token = data?.data?.token;
    if (token) {
      (await cookies()).set(TOKEN_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("AXIOS XƏTASI:", error.response?.data);
      const errorMessage = error.response?.data?.message || 'Qeydiyyat zamanı xəta baş verdi';
      throw new Error(errorMessage);
    }
    
    console.error("NAMƏLUM XƏTA:", error);
    throw new Error('Qeydiyyat zamanı gözlənilməz xəta baş verdi');
  }
}

export async function getUserAction(): Promise<UserData | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(TOKEN_COOKIE_NAME)?.value;

    if (!token) {
      return null;
    }

    const res = await fetch(`${API_BASE_URL}user/get-user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data?.data || null;
  } catch {
    return null;
  }
}

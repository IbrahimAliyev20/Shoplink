import { post } from "@/lib/api";
import { AuthForgetpasswordResponse } from "@/types";

export const ForgetPassword = async (email: string) => {
  const response = await post<AuthForgetpasswordResponse>(
    `user/forgot-password`,
    { value: email }
  );
  return response;
};

export const VerifyCode = async (email: string, code: string) => {
  const response = await post<AuthForgetpasswordResponse>(`user/verify-code`, {
    email,
    code,
  });
  return response;
};

export const ResetPassword = async (token: string, password: string) => {
  const response = await post<AuthForgetpasswordResponse>(
    `user/password/reset`,
    { token, password }
  );
  return response;
};

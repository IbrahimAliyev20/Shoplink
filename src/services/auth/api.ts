import { get, post } from "@/lib/api";
import {
  ApiResponse,
  UserData,
  AuthLoginResponse,
  AuthRegisterResponse,
  RegisterFormData,
} from "@/types";

const login = async (email: string, password: string) => {
  const response = await post<AuthLoginResponse>(`user/login`, {
    email,
    password,
  });
  return response;
};

const register = async (data: RegisterFormData) => {
  const response = await post<AuthRegisterResponse>(`user/register`, data);
  return response;
};

const logout = async () => {
  const response = await get<{
    remark: string;
    status: string;
    message: string;
  }>(`logout`);
  return response;
};

const getUser = async (token: string) => {
  const response = await get<ApiResponse<UserData>>(`user/get-user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },

  });
  
  return response;

};



const updatePassword = async (data: {
  old_password: string;
  password: string;
  password_confirmation: string;
}) => {
  const response = await post<ApiResponse<void>>(`user/password/change`, data);
  return response;
};

export { login, register, logout, getUser,  updatePassword };

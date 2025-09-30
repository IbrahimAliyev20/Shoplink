import { useMutation } from "@tanstack/react-query";
import { ForgetPassword, ResetPassword, VerifyCode } from "./api";

export const useForgetPasswordMutation = () => {   
    return useMutation({
        mutationFn: (email: string) => ForgetPassword(email),
    });
};

export const useVerifyCodeMutation = () => {
    return useMutation({
        mutationFn: ({ email, code }: { email: string, code: string }) => VerifyCode(email, code),
    });
};

export const useResetPasswordMutation = () => {
    return useMutation({
        mutationFn: ({ token, password }: { token: string, password: string }) => ResetPassword(token, password),
    });
};


import { mutationOptions } from "@tanstack/react-query";
import { postUpdateUser } from "./api";
import { ApiErrorResponse, ApiResponse, UserData } from "@/types";

export const updateUserMutation = () =>
    mutationOptions<
        ApiResponse<UserData>,
        ApiErrorResponse,
        Partial<UserData> | FormData
    >({
        mutationFn: postUpdateUser,
    });
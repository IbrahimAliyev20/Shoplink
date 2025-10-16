import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { extractErrorMessage } from "@/lib/api/errors";
import { loginAction, logoutAction, registerAction } from "./server-actions";
import { logout, updatePassword } from "./api";
import { AuthLoginResponse, AuthRegisterResponse } from "@/types";

interface LoginVariables {
  email: string;
  password: string;
}

interface UpdatePasswordVariables {
  old_password: string;
  password_confirmation: string;
  password: string;
}

interface RegisterVariables {
  name: string;
  email: string;
  password: string;
  phone: string;
  store_name_or_id: string;
  isMarketRegistration: boolean;
}

export const useLoginMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const marketSlug = useParams().market;

  return useMutation<AuthLoginResponse, Error, LoginVariables>({
    mutationFn: async ({ email, password }) => {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      if (marketSlug) {
        formData.append("marketSlug", marketSlug as string);
      }
      return loginAction(formData);
    },
    onSuccess: async (data) => {
      if (data.message === "successful login" && data.data.user) {
        toast.success("Uğurla daxil oldunuz! Yönləndirilir...");

        await queryClient.invalidateQueries({ queryKey: ["user"] });

        const user = data.data.user;
        if (user.role.includes("seller")) {
          if (user.complete === 1) {
            router.push("/dashboard");
          } else {
            router.push("/dashboard/shopsetup");
          }
        } else if (user.role.includes("user")) {
          router.push(`/${data.data.user.store_slug}/account`);
        }
      } else {
        toast.error(data.message || "Naməlum xəta baş verdi.");
      }
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error) || "Giriş zamanı xəta baş verdi.");
    },
  });
};

export const useRegisterMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const marketSlug = useParams().market;

  return useMutation<AuthRegisterResponse, Error, RegisterVariables>({
    mutationFn: async (variables) => {
      const formData = new FormData();
      formData.append("name", variables.name);
      formData.append("email", variables.email);
      formData.append("password", variables.password);
      formData.append("phone", variables.phone);
      formData.append(
        variables.isMarketRegistration ? "store_id" : "store_name",
        variables.store_name_or_id
      );
      if (marketSlug) {
        formData.append("marketSlug", marketSlug as string);
      }
      return registerAction(formData);
    },
    onSuccess: async (data) => {
      if (data.status === "success" && data.data?.role) {
        toast.success("Qeydiyyat uğurludur!");

        await queryClient.invalidateQueries({ queryKey: ["user"] });

        const userRole = data.data.role;
        const complete = data.data.complete;

        if (userRole.includes("seller")) {
          if (complete === 1) {
            router.push("/dashboard");
          } else {
            router.push("/dashboard/shopsetup");
          }
        } else if (userRole.includes("user")) {
          router.push(marketSlug ? `/${marketSlug}/account` : "/account");
        }
      } else {
        toast.error(data.message || "Qeydiyyat uğursuz oldu.");
      }
    },
    onError: (error) => { 
        toast.error(extractErrorMessage(error) || "Bu email artıq istifadə olunub.");
    },
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      if (data.status === "success") {
        logoutAction();
        queryClient.invalidateQueries({ queryKey: ["user"] });
        router.push("/");
        toast.success("Hesabdan çıxış oldu");
      }
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error));
    },
  });
};

export const useUpdatePasswordMutation = () => {
  return useMutation({
    mutationFn: (data: UpdatePasswordVariables) => updatePassword(data),
    onSuccess: () => {
      toast.success("Şifrəniz uğurla yeniləndi!");
    },
    onError: (error: unknown) => {
      toast.error(extractErrorMessage(error) || "Şifrəni yeniləyərkən xəta baş verdi");
    },
  });
};
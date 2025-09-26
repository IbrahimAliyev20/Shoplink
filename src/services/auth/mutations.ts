import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  loginAction,
  logoutAction,
  registerAction,
} from "./server-actions";
import { logout, updatePassword } from "./api";
import { AuthLoginResponse } from "@/types";

interface LoginVariables {
  email: string;
  password: string;
}

interface UpdatePasswordVariables {
  old_password: string;
  password_confirmation: string;
  password: string;
}

export const useLoginMutation = () => {
  const router = useRouter();
  const marketSlug = useParams().market;

  return useMutation<AuthLoginResponse, Error, LoginVariables>({
    mutationFn: ({ email, password }) => loginAction(email, password, marketSlug as string),
    onSuccess: (data) => {
      if (data.message === "successful login" && data.data.user) {
        toast.success("Uğurla daxil oldunuz! Yönləndirilir...");

        const userRole = data.data.user.role;
        
        if (userRole.includes('seller')) {
          router.push('/dashboard');
        } else if (userRole.includes('user') ) {
          router.push(`/${marketSlug}/account`);
        } 
        
        router.refresh();

      } else {
        toast.error(data.message || "Naməlum xəta baş verdi.");
      }
    },
    onError: (error) => {
      toast.error(error.message || "Giriş zamanı xəta baş verdi.");
    },
  });
};

export const RegisterMutation = (
  name: string,
  email: string,
  password: string,
  phone: string,
  store_name_or_id: string,
  isMarketRegistration: boolean
) => {
  return useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phone", phone);
      formData.append(
        isMarketRegistration ? "store_id" : "store_name",
        store_name_or_id
      );
      const result = await registerAction(formData);
      return result;
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
        router.refresh();
        toast.success("Hesabdan çıxış oldu");
      }
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "Naməlum bir xəta baş verdi.";
      toast.error(errorMessage);
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
      const message =
        error instanceof Error
          ? error.message
          : "Şifrəni yeniləyərkən xəta baş verdi";
      toast.error(message);
    },
  });
};
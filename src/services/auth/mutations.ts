import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  loginAction,
  logoutAction,
  registerAction,
  getUserAction,
} from "./server-actions";
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

export const useLoginMutation = () => {
  const router = useRouter();
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

        const userRole = data.data.user.role;
        
        if (userRole.includes('seller')) {
          // For sellers, check if profile is complete
          try {
            const userData = await getUserAction();
            if (userData && userData.complete === 1) {
              router.push('/dashboard');
            } else {
              router.push('/dashboard/shopsetup');
            }
          } catch {
            toast.error("Profil məlumatları yüklənərkən xəta baş verdi.");
            router.push('/dashboard/shopsetup');
          }
        } else if (userRole.includes('user')) {
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
interface RegisterVariables {
  name: string;
  email: string;
  password: string;
  phone: string;
  store_name_or_id: string;
  isMarketRegistration: boolean;
}
export const useRegisterMutation = () => {
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
      return registerAction(formData);
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
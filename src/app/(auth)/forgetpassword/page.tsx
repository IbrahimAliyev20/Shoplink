"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  useForgetPasswordMutation,
  useVerifyCodeMutation,
  useResetPasswordMutation,
} from "@/services/auth/forgetpassword/mutations";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, Check } from "lucide-react";

// Helper component for floating label effect
interface FloatingFieldProps {
  id: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}

function FloatingField({ id, label, children, className }: FloatingFieldProps) {
  return (
    <div className={`relative ${className ?? ""}`}>
      {children}
      <Label
        htmlFor={id}
        className={
          "pointer-events-none bg-white absolute left-3 -top-2 px-1 text-xs text-foreground"
        }
      >
        {label}
      </Label>
    </div>
  );
}

// OTP Input Component
interface OTPInputProps {
  length: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

function OTPInput({ length, value, onChange, disabled }: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));

  useEffect(() => {
    if (value && value.length <= length) {
      const newOtp = new Array(length).fill("");
      value.split("").forEach((char, index) => {
        if (index < length) {
          newOtp[index] = char;
        }
      });
      setOtp(newOtp);
    } else if (!value) {
      setOtp(new Array(length).fill(""));
    }
  }, [value, length]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    const inputValue = element.value;

    if (inputValue && isNaN(Number(inputValue))) return;

    const newOtp = [...otp];
    newOtp[index] = inputValue;
    setOtp(newOtp);
    onChange(newOtp.join(""));

    if (inputValue && index < length - 1) {
      const nextInput = element.parentElement?.children[
        index + 1
      ] as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        const previousInput = e.currentTarget.parentElement?.children[
          index - 1
        ] as HTMLInputElement;
        if (previousInput) {
          previousInput.focus();
        }
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
        onChange(newOtp.join(""));
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text");
    const pasteNumbers = pasteData.replace(/\D/g, "").slice(0, length);

    if (pasteNumbers) {
      const newOtp = new Array(length).fill("");
      pasteNumbers.split("").forEach((char, index) => {
        if (index < length) {
          newOtp[index] = char;
        }
      });
      setOtp(newOtp);
      onChange(newOtp.join(""));

      const nextEmptyIndex = Math.min(pasteNumbers.length, length - 1);
      const targetInput = e.currentTarget.parentElement?.children[
        nextEmptyIndex
      ] as HTMLInputElement;
      if (targetInput) {
        targetInput.focus();
      }
    }
  };

  return (
    <div className="flex gap-3 justify-center">
      {otp.map((data, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={data}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          disabled={disabled}
          className="w-12 h-12 text-center text-lg font-semibold border border-[#AEAEB2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF13F0] focus:border-transparent disabled:opacity-50"
        />
      ))}
    </div>
  );
}

// Timer Component
interface TimerProps {
  initialTime: number;
  onComplete: () => void;
}

function Timer({ initialTime, onComplete }: TimerProps) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      onComplete();
    }
  }, [time, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="text-center text-lg font-semibold text-gray-600">
      {formatTime(time)}
    </div>
  );
}

type Step = "email" | "otp" | "password" | "success";

function ForgetPassword() {
  const [currentStep, setCurrentStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [token, setToken] = useState('') // <-- BU SƏTR LƏĞV EDİLDİ, ARTIQ EHTİYAC YOXDUR

  const router = useRouter();

  const forgetPasswordMutation = useForgetPasswordMutation();
  const verifyCodeMutation = useVerifyCodeMutation();
  const resetPasswordMutation = useResetPasswordMutation();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    forgetPasswordMutation.mutate(email, {
      onSuccess: (data) => {
        if (data.status === "success") {
          toast.success("Kod göndərildi");
          setCurrentStep("otp");
        } else {
          toast.error(data.message || "Xəta baş verdi");
        }
      },
      onError: () => {
        toast.error("Xəta baş verdi");
      },
    });
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length !== 6) return;

    verifyCodeMutation.mutate(
      { email, code: otpCode },
      {
        onSuccess: (data) => {
          if (data.status === "success") {
            toast.success("Kod təsdiqləndi");
            setCurrentStep("password");
          } else {
            toast.error(data.message || "Kod yanlışdır");
          }
        },
        onError: () => {
          toast.error("Kod yanlışdır");
        },
      }
    );
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword.trim() || newPassword !== confirmPassword) {
      toast.error("Şifrələr uyğun gəlmir");
      return;
    }

    resetPasswordMutation.mutate(
      { token: otpCode, password: newPassword },
      {
        onSuccess: (data) => {
          if (data.status === "success") {
            setCurrentStep("success");
          } else {
            // Məsələn, "Invalid verification code" xətasını burada göstərəcək
            toast.error(data.message || "Xəta baş verdi");
          }
        },
        onError: () => {
          toast.error("Xəta baş verdi");
        },
      }
    );
  };

  const handleResendCode = () => {
    forgetPasswordMutation.mutate(email, {
      onSuccess: (data) => {
        if (data.status === "success") {
          toast.success("Kod yenidən göndərildi");
        } else {
          toast.error(data.message || "Xəta baş verdi");
        }
      },
    });
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case "email":
        return "Şifrənin bərpası";
      case "otp":
        return "OTP kodu";
      case "password":
        return "Yeni şifrə";
      case "success":
        return "";
    }
  };

  const canGoBack = currentStep !== "email" && currentStep !== "success";

  return (
    <section className="bg-[#FBFDFF] h-screen flex items-center justify-center">
      <div
        className="w-[408px] mx-auto"
        style={{
          borderRadius: "16px",
          border: "1px solid #FBFDFF",
          background: "#FFF",
          boxShadow: "1px 1px 4px 0 rgba(0, 0, 0, 0.06)",
        }}
      >
        <div className="p-6 md:p-10">
          {currentStep !== "success" && (
            <>
              <Image
                src={"/images/Logo.svg"}
                alt={"Logo"}
                width={199}
                height={45}
              />

              <div className="flex items-center mt-8 mb-10">
                {canGoBack && (
                  <button
                    onClick={() => {
                      if (currentStep === "otp") setCurrentStep("email");
                      else if (currentStep === "password")
                        setCurrentStep("otp");
                    }}
                    className="mr-4 p-1 hover:bg-gray-100 rounded"
                  >
                    <ArrowLeft size={20} />
                  </button>
                )}
                <h1 className="text-2xl font-semibold">{getStepTitle()}</h1>
              </div>
            </>
          )}

          {/* Email Step */}
          {currentStep === "email" && (
            <form
              onSubmit={handleEmailSubmit}
              className="grid grid-cols-1 gap-4 md:gap-5"
            >
              <FloatingField id="email" label="Email">
                <Input
                  id="email"
                  type="email"
                  placeholder="Email adresinizi daxil edin"
                  className="peer h-12 rounded-lg border-[#AEAEB2] focus:outline-none focus-visible:ring-0"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={forgetPasswordMutation.isPending}
                />
              </FloatingField>

              <Button
                type="submit"
                disabled={forgetPasswordMutation.isPending}
                className="mt-2 h-12 rounded-full bg-[#FF13F0] hover:bg-[#FF13F0]/90"
              >
                {forgetPasswordMutation.isPending
                  ? "Göndərilir..."
                  : "Kodu göndər"}
              </Button>
            </form>
          )}

          {/* OTP Step */}
          {currentStep === "otp" && (
            <div className="space-y-6">
              <p className="text-gray-600 text-sm">
                Sizin mailinizə təsdiq kodu göndərilmişdir. Zəhmət olmasa həmin
                kodu daxil edin.
              </p>

              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <OTPInput
                  length={6}
                  value={otpCode}
                  onChange={setOtpCode}
                  disabled={verifyCodeMutation.isPending}
                />

                <Timer initialTime={59} onComplete={() => {}} />

                <div className="text-center text-sm text-gray-600">
                  Kodu almadınız?{" "}
                  <button
                    type="button"
                    onClick={handleResendCode}
                    className="text-[#FF13F0] hover:underline"
                    disabled={forgetPasswordMutation.isPending}
                  >
                    Yenidən göndər
                  </button>
                </div>

                <Button
                  type="submit"
                  disabled={
                    verifyCodeMutation.isPending || otpCode.length !== 6
                  }
                  className="w-full h-12 rounded-full bg-[#FF13F0] hover:bg-[#FF13F0]/90"
                >
                  {verifyCodeMutation.isPending ? "Yoxlanılır..." : "Təsdiq et"}
                </Button>
              </form>
            </div>
          )}

          {/* Password Step */}
          {currentStep === "password" && (
            <form
              onSubmit={handlePasswordSubmit}
              className="grid grid-cols-1 gap-4 md:gap-5"
            >
              <FloatingField id="newPassword" label="Yeni şifrə">
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Yeni şifrənizi daxil edin"
                    className="peer h-12 rounded-lg pr-10 border-[#AEAEB2] focus:outline-none focus-visible:ring-0"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    disabled={resetPasswordMutation.isPending}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </FloatingField>

              <FloatingField id="confirmPassword" label="Şifrənin təkrarı">
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Şifrənizi təkrar edin"
                    className="peer h-12 rounded-lg pr-10 border-[#AEAEB2] focus:outline-none focus-visible:ring-0"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={resetPasswordMutation.isPending}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </FloatingField>

              <Button
                type="submit"
                disabled={resetPasswordMutation.isPending}
                className="mt-2 h-12 rounded-full bg-[#FF13F0] hover:bg-[#FF13F0]/90"
              >
                {resetPasswordMutation.isPending
                  ? "Yadda saxlanılır..."
                  : "Yadda saxla"}
              </Button>
            </form>
          )}

          {currentStep === "success" && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" />
                </div>
              </div>

              <h1 className="text-2xl font-semibold mb-4">
                Şifrə uğurla dəyişdirildi!
              </h1>
              <p className="text-gray-600 mb-8">
                Keçid edərək öz hesabınıza daxil ola bilərsiniz
              </p>

              <Button
                onClick={() => router.push("/login")}
                className="w-full h-12 rounded-full bg-[#FF13F0] hover:bg-[#FF13F0]/90"
              >
                Daxil ol
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ForgetPassword;

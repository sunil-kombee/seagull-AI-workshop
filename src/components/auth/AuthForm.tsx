"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";

const formSchema = z.object({
  contact: z
    .string()
    .min(1, "Required")
    .refine(
      (value) => {
        const isPhone = /^[0-9]{10}$/.test(value);
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        return isPhone || isEmail;
      },
      { message: "Enter a valid email or 10-digit mobile number" }
    ),
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .optional(),
  otp: z.string().length(6, "OTP must be 6 digits").optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface Props {
  mode: "login" | "register";
}

export default function AuthForm({ mode }: Props) {
  const router = useRouter();
  const [step, setStep] = useState<"input" | "otp">("input");
  const [timer, setTimer] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const isRegister = mode === "register";

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const contactValue = watch("contact");

  const startTimer = () => {
    setTimer(60);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Clear the interval when component unmounts
    return () => clearInterval(interval);
  };

  const handleSendOTP = async (data: FormValues) => {
    try {
      setIsLoading(true);
      const payload = {
        contact: data.contact,
        ...(isRegister && {
          name: data.name,
          address: data.address,
        }),
      };

      const response = await axios.post("/api/auth/send-otp", payload);

      if (response.status === 200) {
        const isPhone = /^[0-9]{10}$/.test(data.contact);
        toast.success(`OTP sent to ${isPhone ? "mobile" : "email"}!`);
        setStep("otp");
        startTimer();
      } else {
        throw new Error("Failed to send OTP");
      }
    } catch (err: any) {
      console.error("Send OTP error:", err);
      toast.error(
        err.response?.data?.message || "Failed to send OTP. Please try again."
      );
      setError("contact", {
        message: err.response?.data?.message || "Failed to send OTP",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (data: FormValues) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/auth/verify-otp", {
        contact: data.contact,
        otp: data.otp,
      });

      if (response.status === 200) {
        const user = response.data.user;
        // Set the auth state directly from the response
        useAuthStore.getState().setUser({
          ...user,
          isAuthenticated: true,
        });
        toast.success(
          mode === "login"
            ? "Logged in successfully!"
            : "Registered successfully!"
        );

        // Wait for the auth store update before navigating
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Clear the form and reset the timer
        setStep("input");
        setTimer(0);

        // Navigate to dashboard
        router.push("/dashboard");
      } else {
        throw new Error("Invalid or expired OTP");
      }
    } catch (err: any) {
      console.error("Verify OTP error:", err);
      toast.error(
        err.response?.data?.message ||
          "Invalid or expired OTP. Please try again."
      );
      setError("otp", {
        message: err.response?.data?.message || "Invalid or expired OTP",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full space-y-6">
      <h1 className="text-2xl font-bold text-center">
        {mode === "login" ? "Login" : "Register"}
      </h1>

      <form
        onSubmit={handleSubmit(
          step === "input" ? handleSendOTP : handleVerifyOTP
        )}
        className="space-y-6"
      >
        <div className="space-y-4">
          {step === "input" && (
            <>
              {isRegister && (
                <div>
                  <label className="block font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    {...register("name")}
                    className={cn(
                      "w-full px-4 py-2 border rounded-md outline-none",
                      errors.name ? "border-red-500" : "border-gray-300"
                    )}
                    placeholder="Enter your full name"
                    disabled={isLoading}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              )}

              <div>
                <label className="block font-medium mb-1">
                  Email or Mobile
                </label>
                <input
                  type="text"
                  {...register("contact")}
                  className={cn(
                    "w-full px-4 py-2 border rounded-md outline-none",
                    errors.contact ? "border-red-500" : "border-gray-300"
                  )}
                  placeholder="Enter email or mobile"
                  disabled={isLoading}
                />
                {errors.contact && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.contact.message}
                  </p>
                )}
              </div>

              {isRegister && (
                <div>
                  <label className="block font-medium mb-1">Address</label>
                  <textarea
                    {...register("address")}
                    className={cn(
                      "w-full px-4 py-2 border rounded-md outline-none min-h-[100px]",
                      errors.address ? "border-red-500" : "border-gray-300"
                    )}
                    placeholder="Enter your address"
                    disabled={isLoading}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address.message}
                    </p>
                  )}
                </div>
              )}
            </>
          )}

          {step === "otp" && (
            <>
              <div>
                <label className="block font-medium mb-1">Enter OTP</label>
                <input
                  type="number"
                  {...register("otp")}
                  className={cn(
                    "w-full px-4 py-2 border rounded-md outline-none",
                    errors.otp ? "border-red-500" : "border-gray-300"
                  )}
                  placeholder="6-digit OTP"
                  disabled={isLoading}
                />
                {errors.otp && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.otp.message}
                  </p>
                )}
              </div>

              <div className="mt-4">
                {timer > 0 ? (
                  <button
                    type="button"
                    disabled={true}
                    className="w-full bg-muted text-muted-foreground py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Resend OTP in {timer}s
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSendOTP({ contact: contactValue })}
                    className="w-full bg-primary/10 text-primary hover:bg-primary/20 py-2 rounded-md transition"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        {step === "input" ? (
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Please wait..." : "Send OTP"}
          </button>
        ) : (
          <>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed mb-2"
              disabled={isLoading}
            >
              {isLoading ? "Please wait..." : "Verify OTP"}
            </button>
            {timer > 0 ? (
              <p className="text-center text-gray-500">
                Resend OTP in {timer}s
              </p>
            ) : (
              <button
                type="button"
                onClick={() => handleSendOTP({ contact: contactValue })}
                className="w-full text-blue-600 hover:text-blue-800 py-2 rounded-md transition"
              >
                Resend OTP
              </button>
            )}
          </>
        )}
      </form>
      {mode === "login" && (
        <div className="text-center mt-4">
          <Link
            href="/admin/login"
            className="text-sm text-blue-600 hover:underline font-medium"
          >
            Admin Login
          </Link>
        </div>
      )}

      <p className="text-center text-sm text-muted-foreground">
        {mode === "login" ? (
          <>
            Don't have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Log in
            </Link>
          </>
        )}
      </p>
    </div>
  );
}

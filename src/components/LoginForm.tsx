/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useLoginUserMutation } from "@/lib/services/auth";
import {
  defaultValues,
  LoginInfo,
  loginSchema,
} from "@/lib/validator/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ButtonLoader from "./button-loader";
import { PasswordInput } from "./password-input";

export default function LoginForm() {
  const [loginUser] = useLoginUserMutation();
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInfo>({
    mode: "all",
    resolver: zodResolver(loginSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: LoginInfo) => {
    try {
      const response = await loginUser(data);
      if ("data" in response && response.data?.status) {
        toast.success(response.data.message);
        // Handle successful login, e.g., redirect to a dashboard or home page
        push("/profile");
      }

      if ("error" in response) {
        const err = response.error;
        if (
          typeof err === "object" &&
          err !== null &&
          "status" in err &&
          typeof err.status === "number"
        ) {
          toast.error((err.data as any)?.message);
        } else if (
          err &&
          "originalStatus" in err &&
          err.originalStatus === 429
        ) {
          toast.error("Too many requests. Please try again later.");
        } else {
          toast.error("An unexpected error occurred.");
        }
      }
    } catch {
      toast.error("Login failed. Please try again!");
    }
  };
  return (
    <div className="p-4 lg:p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="mb-6">
          <input
            type="text"
            {...register("email")}
            placeholder="Email"
            className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <p className="text-red-500">{errors.email?.message}</p>
        </div>

        <div className="mb-6">
          <PasswordInput {...register("password")} placeholder="Password" />
          <p className="text-red-500">{errors.password?.message}</p>
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer"
          >
            {isSubmitting ? <ButtonLoader /> : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}

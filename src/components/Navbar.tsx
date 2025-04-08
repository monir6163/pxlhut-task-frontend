/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetUserQuery, useLogoutUserMutation } from "@/lib/services/auth";
import { useCookies } from "next-client-cookies";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import LoadingIndicator from "./LoadingIndicator";
import ThemeChanger from "./Theme";
interface User {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  username?: string;
  role?: string;
  createdAt?: string;
}

export default function Navbar() {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [user, setUser] = useState<User>({});
  const { data, isSuccess, isLoading } = useGetUserQuery({});
  const cookies = useCookies();
  useEffect(() => {
    if (data && isSuccess) {
      setUser(data?.data);
    }
  }, [isSuccess, data]);

  const [logoutUser] = useLogoutUserMutation();
  const { push } = useRouter();
  useEffect(() => {
    const checkAuth = () => {
      const authCookie = cookies.get("is_auth");
      console.log("Auth cookie:", authCookie);
      setIsAuth(authCookie ? JSON.parse(authCookie) : false);
    };

    checkAuth();
    const interval = setInterval(checkAuth, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await logoutUser({});
      if ("data" in response && response.data?.status) {
        toast.success(response.data.message);
        push("/auth/login");
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
        } else {
          toast.error("An unexpected error occurred.");
        }
      }
    } catch {
      toast.error("LogOut failed. Please try again!");
    }
  };

  if (isAuth === null || isLoading) return <LoadingIndicator />;

  return (
    <nav className="bg-purple-800 p-4">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/" className="text-white font-bold">
            Home
          </Link>

          {isAuth ? (
            <>
              {user?.role === "admin" ? (
                <Link
                  href="/all-payments"
                  className="text-white font-bold ml-4"
                >
                  See All Donation Payments (Admin)
                </Link>
              ) : (
                <>
                  <Link href="/profile" className="text-white font-bold ml-4">
                    Profile
                  </Link>
                  <Link href="/payments" className="text-white font-bold ml-4">
                    Donations
                  </Link>
                </>
              )}
              <button
                className="text-white font-bold ml-4 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="text-white font-bold ml-4">
                Login
              </Link>
              <Link href="/auth/register" className="text-white font-bold ml-4">
                Register
              </Link>
            </>
          )}
          <ThemeChanger />
        </div>
      </div>
    </nav>
  );
}

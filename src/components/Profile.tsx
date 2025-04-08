"use client";

import { useGetUserQuery } from "@/lib/services/auth";
import { useEffect, useState } from "react";

export default function ProfileData() {
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

  const [user, setUser] = useState<User>({});
  const { data, isSuccess, isLoading } = useGetUserQuery({});
  useEffect(() => {
    if (data && isSuccess) {
      setUser(data?.data);
    }
  }, [isSuccess, data]);
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold">User Information</h2>
        <p className="mt-2">
          <strong>Full Name:</strong> {user?.fullName}
        </p>
      </div>
      <div className="bg-white p-4 rounded shadow mt-4">
        <h2 className="text-xl font-semibold">User Details</h2>
        <p className="mt-2">
          <strong>Email:</strong> {user?.email}
        </p>
        <p className="mt-2">
          <strong>Phone:</strong> {user?.phone}
        </p>
        <p className="mt-2">
          <strong>Address:</strong> {user?.address}
        </p>
        <p className="mt-2">
          <strong>City:</strong> {user?.city}
        </p>
        <p className="mt-2">
          <strong>Zip Code:</strong> {user?.zipCode}
        </p>
        <p className="mt-2">
          <strong>Username:</strong> {user?.username}
        </p>
        <p className="mt-2">
          <strong>Role:</strong> {user?.role}
        </p>
        <p className="mt-2">
          <strong>Created At: </strong>
          {new Date(user?.createdAt || "").toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}

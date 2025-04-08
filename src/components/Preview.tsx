/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { resetForm } from "@/lib/formSlice";
import { useCreateUserMutation } from "@/lib/services/auth";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "sonner";
import ButtonLoader from "./button-loader";

export default function Preview({ onBack }: { onBack: () => void }) {
  const { personalInfo, addressInfo, accountInfo } = useAppSelector(
    (s) => s.form
  );
  const dispatch = useAppDispatch();
  const [createUser] = useCreateUserMutation();
  const { push } = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    const payload = {
      ...personalInfo,
      ...addressInfo,
      ...accountInfo,
    };
    try {
      setLoading(true);
      const response = await createUser(payload);

      if ("data" in response && response.data?.status) {
        toast.success(response.data.message);
        dispatch(resetForm());
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
      toast.error("Failed to create user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-black">Preview</h2>

        <div className="text-black">
          <h3 className="font-semibold">Personal Info</h3>
          <p>Name: {personalInfo.fullName}</p>
          <p>Email: {personalInfo.email}</p>
          <p>Phone: {personalInfo.phone}</p>
        </div>

        <div className="text-black">
          <h3 className="font-semibold">Address Info</h3>
          <p>Address: {addressInfo.address}</p>
          <p>City: {addressInfo.city}</p>
          <p>Zip: {addressInfo.zipCode}</p>
        </div>

        <div className="text-black">
          <h3 className="font-semibold">Account Info</h3>
          <p>Username: {accountInfo.username}</p>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            disabled={loading}
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer"
          >
            <FaArrowLeft className="inline-block me-1" />
            Back
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer"
          >
            {loading ? <ButtonLoader /> : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
}

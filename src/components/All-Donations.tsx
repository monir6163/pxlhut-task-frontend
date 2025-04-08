"use client";

import { useGetAllPaymentsQuery } from "@/lib/services/auth";
import { useEffect, useState } from "react";
interface Donation {
  id: number;
  amount: number;
  createdAt: string;
  status: string;
  userId: {
    id: number;
    fullName: string;
    email: string;
  };
}

export default function AllDonations() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const { data, isSuccess, isLoading } = useGetAllPaymentsQuery({});
  useEffect(() => {
    if (data && isSuccess) {
      console.log("data", data);
      setDonations(data?.data);
    }
  }, [isSuccess, data]);

  if (isLoading) return <div className="text-center">Loading...</div>;
  return (
    <div className="text-black">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">User</th>
            <th className="py-2 px-4 border-b">Amount</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through your donations data here */}
          {donations?.map((donation, i) => (
            <tr key={i}>
              <td className="py-2 px-4 border-b">{i + 1}</td>
              <td className="py-2 px-4 border-b">{donation.userId.fullName}</td>
              <td className="py-2 px-4 border-b">{donation.amount}</td>
              <td className="py-2 px-4 border-b">
                {new Date(donation.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </td>
              <td className="py-2 px-4 border-b">{donation.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { usePaymentStripeMutation } from "@/lib/services/auth";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function DonationPayments() {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [selected, setSelected] = useState<number | "custom">(100);
  const [paymentStripe] = usePaymentStripeMutation();
  watch("amount");
  const donationOptions = [100, 150, 200];

  const handleSelect = (amount: number | "custom") => {
    setSelected(amount);
    if (amount !== "custom") {
      setValue("amount", amount);
    } else {
      setValue("amount", "");
    }
  };
  const onSubmit = async (data: any) => {
    try {
      toast.loading("Loading Stripe...");
      const stripePromise = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || ""
      );
      const response = await paymentStripe(data);
      if ("data" in response) {
        const { data } = response;
        if (data && data.url) {
          await stripePromise?.redirectToCheckout({ sessionId: data.id });
        }
      } else {
        console.error("Error:", response.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-xl p-6 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Make a Donation
        </h2>

        <div className="grid grid-cols-3 gap-3">
          {donationOptions.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => handleSelect(amount)}
              className={`border cursor-pointer rounded-lg py-2 font-semibold ${
                selected === amount
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              ${amount}
            </button>
          ))}

          <button
            type="button"
            onClick={() => handleSelect("custom")}
            className={`col-span-3 border cursor-pointer rounded-lg py-2 font-semibold text-gray-700${
              selected === "custom"
                ? "bg-blue-600 text-gray-700"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            Enter Custom Amount
          </button>
        </div>

        {selected === "custom" && (
          <input
            {...register("amount", { required: true })}
            type="number"
            placeholder="Enter custom amount"
            className="w-full border border-gray-300 text-gray-700 rounded-md px-4 py-2 mt-2"
            min={1}
          />
        )}

        {selected !== "custom" && (
          <input type="hidden" value={selected} {...register("amount")} />
        )}

        <button
          type="submit"
          className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Donate
        </button>
      </form>
    </div>
  );
}

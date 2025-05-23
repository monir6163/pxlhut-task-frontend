"use client";

import { setAddressInfo } from "@/lib/formSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { addressDetailsSchema, AddressInfo } from "@/lib/validator/shema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function AddressInfoForm({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const dispatch = useAppDispatch();
  const saved = useAppSelector((s) => s.form.addressInfo);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressInfo>({
    mode: "all",
    resolver: zodResolver(addressDetailsSchema),
    defaultValues: saved,
  });

  const onSubmit = (data: AddressInfo) => {
    dispatch(setAddressInfo(data));
    onNext();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-black">Address Details</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="mb-6">
          <input
            type="text"
            id="address"
            {...register("address")}
            placeholder="Address"
            className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-red-500">{errors.address?.message}</p>
        </div>

        <div className="mb-6">
          <input
            type="text"
            id="city"
            {...register("city")}
            placeholder="City"
            className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-red-500">{errors.city?.message}</p>
        </div>

        <div className="mb-6">
          <input
            type="text"
            id="zipCode"
            {...register("zipCode")}
            placeholder="Zip Code"
            className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-red-500">{errors.zipCode?.message}</p>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer"
          >
            <FaArrowLeft className="inline-block me-1" />
            Back
          </button>
          <button
            type="submit"
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer"
          >
            Next{" "}
            <FaArrowRight
              size={16}
              className="inline-block animation animate-pulse"
            />
          </button>
        </div>
      </form>
    </div>
  );
}

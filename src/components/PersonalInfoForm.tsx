"use client";

import { setPersonalInfo } from "@/lib/formSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { PersonalInfo, personalInfoSchema } from "@/lib/validator/shema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";

export default function PersonalInfoForm({ onNext }: { onNext: () => void }) {
  const dispatch = useAppDispatch();
  const saved = useAppSelector((s) => s.form.personalInfo);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfo>({
    mode: "all",
    resolver: zodResolver(personalInfoSchema),
    defaultValues: saved,
  });

  const onSubmit = (data: PersonalInfo) => {
    dispatch(setPersonalInfo(data));
    onNext();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-black">Personal Information</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="mb-6">
          <input
            type="text"
            id="fullName"
            {...register("fullName")}
            placeholder="Full Name"
            className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-red-500">{errors.fullName?.message}</p>
        </div>

        <div className="mb-6">
          <input
            type="email"
            id="email"
            {...register("email")}
            placeholder="Email"
            className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-red-500">{errors.email?.message}</p>
        </div>

        <div className="mb-6">
          <input
            type="tel"
            id="phone"
            {...register("phone")}
            placeholder="Phone Number"
            className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-red-500">{errors.phone?.message}</p>
        </div>

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
      </form>
    </div>
  );
}

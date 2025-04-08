/* eslint-disable @typescript-eslint/no-explicit-any */
import z from "zod";

export const personalInfoSchema = z.object({
  fullName: z.string().nonempty("Full name is required!"),
  email: z
    .string()
    .nonempty("Email is required!")
    .email("Invalid email format"),
  phone: z
    .string()
    .nonempty("Phone number is required!")
    .regex(/^[0-9\s\-()+]+$/, "Invalid phone number format")
    .refine(
      (val) => val.replace(/\D/g, "").length >= 10,
      "Phone must be 10+ digits"
    ),
});

export const addressDetailsSchema = z.object({
  address: z.string().nonempty("Address is required!"),
  city: z.string().nonempty("City is required!"),
  zipCode: z
    .string()
    .nonempty("Zip is required!")
    .regex(/^\d{5,}$/, "Zip must be 5+ numeric digits"),
});

export const accountSetupSchema = z
  .object({
    username: z.string().min(4, "Username must be 4+ characters"),
    password: z
      .string()
      .min(6, "Password must be 6+ characters")
      .regex(/[a-zA-Z]/, "At least one letter")
      .regex(/[0-9]/, "At least one number")
      .regex(/[@$!%*?&]/, "At least one special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const fullFormSchema = personalInfoSchema
  .merge(addressDetailsSchema)
  .merge(accountSetupSchema as any);

export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type AddressInfo = z.infer<typeof addressDetailsSchema>;
export type AccountInfo = z.infer<typeof accountSetupSchema>;
export type FullFormData = z.infer<typeof fullFormSchema>;

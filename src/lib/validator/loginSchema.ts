import z from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required!")
    .email("Invalid email format"),
  password: z.string().nonempty("Password is required!"),
});

type LoginInfo = z.infer<typeof loginSchema>;

const defaultValues: LoginInfo = {
  email: "",
  password: "",
};

export { defaultValues, loginSchema, type LoginInfo };

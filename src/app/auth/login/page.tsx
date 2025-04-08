import LoginForm from "@/components/LoginForm";

export default function page() {
  return (
    <div className="flex items-center h-screen justify-center">
      <div className="w-full max-w-md p-4 lg:p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-black">
          Login Form
        </h2>
        <LoginForm />
      </div>
    </div>
  );
}

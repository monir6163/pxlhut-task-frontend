import MultiStepRegisterForm from "@/components/multi-step-register-form";

export default function page() {
  return (
    <div className="flex items-center h-screen justify-center">
      <div className="w-full max-w-md p-4 lg:p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl text-black font-bold text-center">
          Register Form
        </h2>
        <MultiStepRegisterForm />
      </div>
    </div>
  );
}

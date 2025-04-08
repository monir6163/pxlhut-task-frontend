"use client";

import { useState } from "react";
import AccountInfoForm from "./AccountInfoForm";
import AddressInfoForm from "./AddressInfoForm";
import PersonalInfoForm from "./PersonalInfoForm";
import Preview from "./Preview";

export default function MultiStepRegisterForm() {
  const [step, setStep] = useState(1);

  const next = () => setStep((prev) => prev + 1);
  const prev = () => setStep((prev) => prev - 1);

  return (
    <div className="max-w-xl mx-auto p-4">
      {step === 1 && <PersonalInfoForm onNext={next} />}
      {step === 2 && <AddressInfoForm onNext={next} onBack={prev} />}
      {step === 3 && <AccountInfoForm onNext={next} onBack={prev} />}
      {step === 4 && <Preview onBack={prev} />}
    </div>
  );
}

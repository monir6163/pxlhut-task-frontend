import DonationPayments from "@/components/DonationPayments";

export default function page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-xl w-full">
        <h1 className="text-xl text-center font-bold mb-4 text-gray-700">
          Donation Payments for Palestine Muslim Fund!
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Your generous contribution will help us support those in need.
        </p>
        <DonationPayments />
      </div>
    </div>
  );
}

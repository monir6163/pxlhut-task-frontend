import AllDonations from "@/components/All-Donations";

export default function page() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-xl w-full">
        <h1 className="text-xl text-center font-bold mb-4 text-gray-700">
          All Donations List!
        </h1>
        <AllDonations />
      </div>
    </div>
  );
}

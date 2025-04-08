import ProfileData from "@/components/Profile";

export default function page() {
  return (
    <div className="flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md p-4 lg:p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Profile Data</h2>
        <ProfileData />
      </div>
    </div>
  );
}

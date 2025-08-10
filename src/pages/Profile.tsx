import { useEffect, useState } from "react";
import type { User } from "../types";
import { fetchUsers } from "../utils/api";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/loader";

export const ProfilePage: React.FC<{}> = ({}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const users = await fetchUsers();
        setUser(users[0]);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center">
          <Loader />
        </div>
        <p className="mt-4 text-gray-600">Loading comments...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error loading user profile</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-4 py-2 bg-[#A0F075] text-black border-2 border-black transition-colors shadow-[4px_4px_0_0_#000] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-black">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 flex-wrap gap-2">
            <button
              onClick={() => navigate("/")}
              className="cursor-pointer flex items-center space-x-2 px-3 py-2 sm:px-4 bg-[#A0F075] text-black border-2 border-black transition-colors shadow-[4px_4px_0_0_#000] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none text-sm sm:text-base"
            >
              <svg
                className="fill-black rotate-270 size-4"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11.9998 1.58579L3.58555 10L4.99976 11.4142L10.9998 5.41422L10.9998 22H12.9998L12.9998 5.41421L18.9998 11.4142L20.414 10L11.9998 1.58579Z" />
              </svg>
              <span className="font-space-mono">Dashboard</span>
            </button>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-space-mono font-bold text-gray-900">
              Welcome, {user.name.split(" ")[0]} {user.name.split(" ")[1] || ""}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-full mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white border-2 border-black rounded-lg shadow-[8px_8px_0_0_#000]">
          <div className="px-4 py-6 sm:px-6 sm:py-8">
            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6 sm:mb-8 pb-6 border-b border-black">
              <div className="h-16 w-16 sm:h-20 sm:w-20 bg-[#A0F075] border-2 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0_0_#000]">
                <span className="text-lg sm:text-2xl font-bold font-space-mono text-black">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-bold font-space-mono text-gray-900 mb-1">
                  {user.name}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 font-medium hover:underline">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              <div>
                <h3 className="text-base sm:text-lg font-bold font-space-mono text-gray-900 mb-4 flex items-center">
                  <span className="text-sm sm:text-base">/</span>
                  <span className="ml-1">Personal Information</span>
                </h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 border-2 border-black p-4 shadow-[4px_4px_0_0_#000]">
                    <label className="block text-xs sm:text-sm font-bold font-space-mono text-gray-500 uppercase tracking-wider">
                      / User ID
                    </label>
                    <p className="mt-1 text-sm sm:text-base text-gray-900 font-space-mono font-medium">
                      {user.id}
                    </p>
                  </div>
                  <div className="bg-gray-50 border-2 border-black p-4 shadow-[4px_4px_0_0_#000]">
                    <label className="block text-xs sm:text-sm font-bold font-space-mono text-gray-500 uppercase tracking-wider">
                      / Full Name
                    </label>
                    <p className="mt-1 text-sm sm:text-base text-gray-900 font-medium capitalize">
                      {user.name}
                    </p>
                  </div>
                  <div className="bg-gray-50 border-2 border-black p-4 shadow-[4px_4px_0_0_#000]">
                    <label className="block text-xs sm:text-sm font-bold font-space-mono text-gray-500 uppercase tracking-wider">
                      / Email Address
                    </label>
                    <p className="mt-1 text-sm sm:text-base text-gray-900 font-medium hover:underline">
                      {user.email}
                    </p>
                  </div>
                  <div className="bg-gray-50 border-2 border-black p-4 shadow-[4px_4px_0_0_#000]">
                    <label className="block text-xs sm:text-sm font-bold font-space-mono text-gray-500 uppercase tracking-wider">
                      / Phone Number
                    </label>
                    <p className="mt-1 text-sm sm:text-base text-gray-900 font-medium">
                      {user.phone}
                    </p>
                  </div>
                  <div className="bg-gray-50 border-2 border-black p-4 shadow-[4px_4px_0_0_#000]">
                    <label className="block text-xs sm:text-sm font-bold font-space-mono text-gray-500 uppercase tracking-wider">
                      / Website
                    </label>
                    <p className="mt-1 text-sm sm:text-base text-gray-900 font-medium hover:underline">
                      {user.website}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 lg:space-y-8">
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-space-mono text-gray-900 mb-4 flex items-center">
                    <span className="text-sm sm:text-base">/</span>
                    <span className="ml-1">Address</span>
                  </h3>
                  <div className="bg-gray-50 border-2 border-black p-4 shadow-[4px_4px_0_0_#000]">
                    <div className="space-y-1">
                      <p className="text-sm sm:text-base text-gray-900 font-medium">
                        {user.address.street}, {user.address.suite}
                      </p>
                      <p className="text-sm sm:text-base text-gray-900 font-medium">
                        {user.address.city}
                      </p>
                      <p className="text-sm sm:text-base text-gray-900 font-medium">
                        {user.address.zipcode}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold font-space-mono text-gray-900 mb-4 flex items-center">
                    <span className="text-sm sm:text-base">/</span>
                    <span className="ml-1">Company</span>
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 border-2 border-black p-4 shadow-[4px_4px_0_0_#000]">
                      <label className="block text-xs sm:text-sm font-bold font-space-mono text-gray-500 uppercase tracking-wider">
                        / Company Name
                      </label>
                      <p className="mt-1 text-sm sm:text-base text-gray-900 font-medium">
                        {user.company.name}
                      </p>
                    </div>
                    <div className="bg-gray-50 border-2 border-black p-4 shadow-[4px_4px_0_0_#000]">
                      <label className="block text-xs sm:text-sm font-bold font-space-mono text-gray-500 uppercase tracking-wider">
                        / Catch Phrase
                      </label>
                      <p className="mt-1 text-sm sm:text-base text-gray-900 font-medium italic">
                        "{user.company.catchPhrase}"
                      </p>
                    </div>
                    <div className="bg-gray-50 border-2 border-black p-4 shadow-[4px_4px_0_0_#000]">
                      <label className="block text-xs sm:text-sm font-bold font-space-mono text-gray-500 uppercase tracking-wider">
                        / Business
                      </label>
                      <p className="mt-1 text-sm sm:text-base text-gray-900 font-medium">
                        {user.company.bs}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

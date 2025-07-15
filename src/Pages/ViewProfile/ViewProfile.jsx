import Loading from "../../components/ui/Loading";
import { useGetUserProfileQuery } from "../../store/services/api";
import userlogo from "../../assets/Images/logo.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  User,
  Mail,
  Phone,
  Calendar,
  UserPlus,
  Edit3,
  Shield,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";


const ViewProfile = () => {
  const token = localStorage.getItem("authToken");
const { data, isLoading } = useGetUserProfileQuery(token, {
  skip: !token,
  refetchOnMountOrArgChange: true, // <- force re-fetch when component remounts
});
const userProfile = data?.data || {};
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  const profileStats = [
    {
      label: "Total Events",
      value: userProfile?.totalEvent || "0",
      icon: Calendar,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Profile Status",
      value: "Active",
      icon: Shield,
      color: "from-green-500 to-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            My Profile
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your personal information and preferences
          </p>
        </div>

        {/* Main Profile Card */}
        <Card className="mb-8 overflow-hidden shadow-2xl border-0 bg-white/80 backdrop-blur-sm py-0">
          <div className="bg-gradient-to-r from-[#2596be] to-[#2a3e97] h-32 relative">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <img
                  src={userlogo}
                  alt="User Avatar"
                  className="w-32 h-32 rounded-full bg-white border-4 border-white shadow-lg object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
              </div>
            </div>
          </div>

          <CardContent className="pt-20 pb-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                {userProfile?.name || "User Name"}
              </h2>

            </div>

            {/* Profile Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                  <div className="bg-blue-500 p-2 rounded-full mr-4">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Full Name
                    </p>
                    <p className="text-gray-800 font-semibold">
                      {userProfile?.name || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                  <div className="bg-green-500 p-2 rounded-full mr-4">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Email Address
                    </p>
                    <p className="text-gray-800 font-semibold">
                      {userProfile?.email || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                  <div className="bg-purple-500 p-2 rounded-full mr-4">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Phone Number
                    </p>
                    <p className="text-gray-800 font-semibold">
                      {userProfile?.phone || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-100">
                  <div className="bg-orange-500 p-2 rounded-full mr-4">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Date of Birth
                    </p>
                    <p className="text-gray-800 font-semibold">
                      {userProfile?.dob
                        ? userProfile.dob.split("T")[0].split("-").reverse().join("-")
                        : "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg border border-teal-100">
                  <div className="bg-teal-500 p-2 rounded-full mr-4">
                    <UserPlus className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Member Since
                    </p>
                    <p className="text-gray-800 font-semibold">
                      {userProfile?.joinDate || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-100">
                  <div className="bg-indigo-500 p-2 rounded-full mr-4">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Total Events
                    </p>
                    <p className="text-gray-800 font-semibold">
                      {userProfile?.totalEvent || "0"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/edit-profile">
                <Button
                  className="h-12 bg-gradient-to-r from-[#2596be] to-[#2a3e97] hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg px-8"
                  disabled={isLoading}
                >
                  <Edit3 className="w-5 h-5 " />
                  {isLoading ? "Editing..." : "Edit Profile"}
                </Button>
              </Link>

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ViewProfile;

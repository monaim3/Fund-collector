// import React from "react";
// import { useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { useGetUserProfileQuery, useUserProfileEditMutation } from "../../store/services/api";
// import { toast } from "react-toastify";

// const EditProfile = () => {
//   const token = localStorage.getItem("authToken");

//   const [userProfileEdit, { error }] = useUserProfileEditMutation();
//   const { data, isLoading: loadingProfile } = useGetUserProfileQuery(token, { skip: !token });
//   const userProfile = data?.data || {};

//   const [formData, setFormData] = useState({
//     dob: "",
//     email: "",
//     phone: "",
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Populate formData after profile is fetched
//   useEffect(() => {
//     if (userProfile) {
//       setFormData({
//         dob: userProfile.dob ? userProfile.dob.split("T")[0] : "",
//         email: userProfile.email || "",
//         phone: userProfile.phone || "",
//       });
//     }
//   }, [userProfile]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       await userProfileEdit(formData).unwrap();
//       toast.success("Profile updated successfully");
//     } catch (err) {
//       console.error("Update failed:", err);
//       toast.error("Failed to update profile.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <div className="rounded-2xl shadow-2xl p-8 backdrop-blur-sm bg-white/95">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="phone">Phone</Label>
//               <Input
//                 id="phone"
//                 name="phone"
//                 type="text"
//                 value={formData.phone}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="dob">Date of Birth</Label>
//               <Input
//                 id="dob"
//                 name="dob"
//                 type="date"
//                 value={formData.dob}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>

//             <Button
//               type="submit"
//               className="w-full h-12 bg-gradient-to-r from-[#2596be] to-[#2a3e97] text-white font-semibold rounded-lg"
//               disabled={loadingProfile || isSubmitting}
//             >
//               {isSubmitting ? "Updating..." : "Update Profile"}
//             </Button>
//           </form>

//           {error && (
//             <div className="text-red-600 mt-4 text-sm text-center">
//               Failed to update profile.
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditProfile;



import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Phone, Calendar, Edit3, Save, Loader2 } from "lucide-react";
import { useGetUserProfileQuery, useUserProfileEditMutation } from "../../store/services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const token = localStorage.getItem("authToken");
  const navigate=useNavigate();
  const [userProfileEdit, { error }] = useUserProfileEditMutation();
  const { data, isLoading: loadingProfile } = useGetUserProfileQuery(token, { skip: !token });
  const userProfile = data?.data || {};

  const [formData, setFormData] = useState({
    dob: "",
    email: "",
    phone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate formData after profile is fetched
  useEffect(() => {
    if (userProfile) {
      setFormData({
        dob: userProfile.dob ? userProfile.dob.split("T")[0] : "",
        email: userProfile.email || "",
        phone: userProfile.phone || "",
      });
    }
  }, [userProfile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
   
    try {
      await userProfileEdit(formData).unwrap();
      toast.success("Profile updated successfully",{
        position: "top-right",
        autoClose: 3000,
      
      });
     navigate("/view-profile");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#2596be]/10 via-white to-[#2a3e97]/10">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 text-[#2596be] animate-spin" />
          <p className="text-gray-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#2596be]/10 via-white to-[#2a3e97]/10">
      <div className="w-full max-w-lg">
        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-xl">
          <CardHeader className="text-center pb-8 bg-gradient-to-r from-[#2596be] to-[#2a3e97] text-white rounded-t-lg">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-white/20 rounded-full">
                <Edit3 className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Edit Profile</CardTitle>
            <CardDescription className="text-blue-100">
              Update your personal information
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  Email Address
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-12 h-12 border-2 border-gray-200 focus:border-[#2596be] focus:ring-[#2596be] rounded-lg transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="your.email@example.com"
                    required
                  />
                  <Mail className="absolute left-4 top-4 h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  Phone Number
                </Label>
                <div className="relative">
                  <Input
                    id="phone"
                    name="phone"
                    type="text"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="pl-12 h-12 border-2 border-gray-200 focus:border-[#2596be] focus:ring-[#2596be] rounded-lg transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                  <Phone className="absolute left-4 top-4 h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* Date of Birth Field */}
              <div className="space-y-2">
                <Label htmlFor="dob" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                
                  Date of Birth
                </Label>
                <div className="relative">
                  <Input
                    id="dob"
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="pl-12 h-12 border-2 border-gray-200 focus:border-[#2596be] focus:ring-[#2596be] rounded-lg transition-all duration-200 bg-gray-50 focus:bg-white"
                    required
                  />
                  <Calendar className="absolute left-4 top-4 h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 bg-gradient-to-r from-[#2596be] to-[#2a3e97] hover:from-[#2596be]/90 hover:to-[#2a3e97]/90 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Updating Profile...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-5 w-5" />
                    Update Profile
                  </>
                )}
              </Button>
            </form>

            {/* Error Message */}
            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm text-center font-medium">
                  Failed to update profile. Please try again.
                </p>
              </div>
            )}

            {/* Success Indicator */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Your information is secure and encrypted
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditProfile;
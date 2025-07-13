// import Loading from "../../components/ui/Loading";
// import { useGetUserProfileQuery } from "../../store/services/api";
// import userlogo from '../../assets/Images/logo.png';
// import { Button } from '@/components/ui/button';
// const ViewProfile = () => {
//     const token = localStorage.getItem("authToken");
//     const { data, isLoading } = useGetUserProfileQuery(token, { skip: !token });
//     const userProfile = data?.data || [];

//     if (isLoading) {
//         return <div><Loading></Loading></div>
//     }
//     return (
//         <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
//             <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12  ">
//                 <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
//                     <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">User Profile</h1>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div className="flex items-center">
//                             <img src={userlogo} alt="User" className="w-12 h-12 rounded-full mr-4" />
//                             <p className="text-gray-600"><strong>Name:</strong> {userProfile?.name}</p>
//                         </div>
//                         <div>

//                             <p className="text-gray-600"><strong>Email:</strong> {userProfile?.email}</p>
//                             <p className="text-gray-600"><strong>Phone:</strong> {userProfile?.totalEvent || 'N/A'} </p>
//                             <p className="text-gray-600"><strong>Date of Birth:</strong> {userProfile?.dob || 'N/A'}</p>

//                             <p className="text-gray-600"><strong>Join Date:</strong> {userProfile?.joinDate || 'N/A'}</p>
//                         </div>
//                         <div>
//                             <Button
//                                 type="submit"
//                                 className="w-full h-12 bg-gradient-to-r from-[#2596be] to-[#2a3e97] text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
//                                 disabled={isLoading}
//                             >
//                                 {isLoading ? 'Editing...' : 'Edit Profile'}
//                             </Button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
// export default ViewProfile



import Loading from "../../components/ui/Loading";
import { useGetUserProfileQuery } from "../../store/services/api";
import userlogo from '../../assets/Images/logo.png';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { User, Mail, Phone, Calendar, UserPlus, Edit3, Shield } from 'lucide-react';

const ViewProfile = () => {
    const token = localStorage.getItem("authToken");
    const { data, isLoading } = useGetUserProfileQuery(token, { skip: !token });
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
            value: userProfile?.totalEvent || '0',
            icon: Calendar,
            color: "from-blue-500 to-blue-600"
        },
        {
            label: "Profile Status",
            value: "Active",
            icon: Shield,
            color: "from-green-500 to-green-600"
        }
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
                <Card className="mb-8 overflow-hidden shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                    <div className="bg-gradient-to-r from-[#2596be] to-[#2a3e97] h-32 relative">
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                            <div className="relative">
                                <img 
                                    src={userlogo} 
                                    alt="User Avatar" 
                                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                                />
                                <div className="absolute bottom-2 right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
                            </div>
                        </div>
                    </div>
                    
                    <CardContent className="pt-20 pb-8">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                                {userProfile?.name || 'User Name'}
                            </h2>
                            <p className="text-gray-600 mb-4">
                                {userProfile?.email || 'user@example.com'}
                            </p>
                        </div>

                        {/* Profile Information Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="space-y-4">
                                <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                                    <div className="bg-blue-500 p-2 rounded-full mr-4">
                                        <User className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Full Name</p>
                                        <p className="text-gray-800 font-semibold">
                                            {userProfile?.name || 'Not provided'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                                    <div className="bg-green-500 p-2 rounded-full mr-4">
                                        <Mail className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Email Address</p>
                                        <p className="text-gray-800 font-semibold">
                                            {userProfile?.email || 'Not provided'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                                    <div className="bg-purple-500 p-2 rounded-full mr-4">
                                        <Phone className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Phone Number</p>
                                        <p className="text-gray-800 font-semibold">
                                            {userProfile?.totalEvent || 'Not provided'}
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
                                        <p className="text-sm text-gray-500 font-medium">Date of Birth</p>
                                        <p className="text-gray-800 font-semibold">
                                            {userProfile?.dob || 'Not provided'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg border border-teal-100">
                                    <div className="bg-teal-500 p-2 rounded-full mr-4">
                                        <UserPlus className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Member Since</p>
                                        <p className="text-gray-800 font-semibold">
                                            {userProfile?.joinDate || 'Not provided'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-100">
                                    <div className="bg-indigo-500 p-2 rounded-full mr-4">
                                        <Calendar className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Total Events</p>
                                        <p className="text-gray-800 font-semibold">
                                            {userProfile?.totalEvent || '0'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            {profileStats.map((stat, index) => (
                                <div key={index} className="bg-gradient-to-r p-6 rounded-xl text-white shadow-lg transform hover:scale-105 transition-all duration-300" style={{backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`}}>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-white/80 text-sm font-medium">{stat.label}</p>
                                            <p className="text-2xl font-bold">{stat.value}</p>
                                        </div>
                                        <stat.icon className="w-8 h-8 text-white/80" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                className="h-12 bg-gradient-to-r from-[#2596be] to-[#2a3e97] hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg px-8"
                                disabled={isLoading}
                            >
                                <Edit3 className="w-5 h-5 mr-2" />
                                {isLoading ? 'Editing...' : 'Edit Profile'}
                            </Button>
                            
                            <Button
                                variant="outline"
                                className="h-12 border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 px-8"
                            >
                                <Shield className="w-5 h-5 mr-2" />
                                Privacy Settings
                            </Button>
                        </div>
                    </CardContent>
                </Card>

               
            </div>
        </div>
    );
};

export default ViewProfile;
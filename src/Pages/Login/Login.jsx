import { useEffect, useState } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaBolt } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../store/services/api';

const Login = () => {
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();
    const [formData, setFormData] = useState({
        rollNumber: '',
        password: '',
        rememberMe: false
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRememberMeChange = (checked) => {
        setFormData(prev => ({
            ...prev,
            rememberMe: checked
        }));
    };

    // const handleSubmit = async (e) => {
    //   e.preventDefault();

    //   try {
    //     const response = await fetch('https://apex.oracle.com/pls/apex/beesoft/auth/login', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({
    //         roll: formData.rollNumber,
    //         password: formData.password,
    //       }),
    //     });

    //     const data = await response.json();

    //     if (data.status_code === 200 && data.token) {
    //       localStorage.setItem('authToken', data.token);
    //       localStorage.setItem('userName', data.name);
    //       localStorage.setItem('userRoll', formData.rollNumber);
    //       window.location.href = '/'; // Redirect to homepage
    //     } else {
    //       alert('Login failed! Please check your credentials.');
    //     }
    //   } catch (err) {
    //     console.error('Login error:', err);
    //     alert('Something went wrong. Try again later.');
    //   }
    // };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await login({
                roll: formData.rollNumber,
                password: formData.password,
            }).unwrap(); // throws on error
            console.log("data",data)
            // Success
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userName', data.name);
            localStorage.setItem('userRoll', formData.rollNumber);
            window.location.href = '/';
        } catch (error) {
            console.error('Login error:', error);
            const message = error?.data?.message || 'Login failed!';
            alert(message);
        }

    };



    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div className="min-h-screen  flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="rounded-2xl shadow-2xl p-8 backdrop-blur-sm bg-white/95">
                        {/* Logo Section */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#2596be] to-[#2a3e97] rounded-full mb-4">
                                <FaBolt className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2596be] to-[#2a3e97]">
                                    CSE-112 Batch Fund
                                </span>
                            </h1>
                            <p className="text-gray-600">Please sign in to your account</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div className="space-y-2">
                                <Label htmlFor="rollNumber" className="text-sm font-medium text-gray-700">
                                    Roll Number
                                </Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaUser className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="rollNumber"
                                        name="rollNumber"
                                        type="text"
                                        value={formData.rollNumber}
                                        onChange={handleInputChange}
                                        placeholder="Enter your roll number"
                                        className="pl-10 h-12 border-gray-300 focus:border-[#2596be] focus:ring-[#2596be] transition-colors duration-300"
                                        required
                                    />
                                </div>
                            </div>


                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                    Password
                                </Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Enter your password"
                                        className="pl-10 pr-12 h-12 border-gray-300 focus:border-[#2596be] focus:ring-[#2596be] transition-colors duration-300"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-[#d03e27] transition-colors duration-300"
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-[#d03e27]" />
                                        ) : (
                                            <FaEye className="h-5 w-5 text-gray-400 hover:text-[#d03e27]" />
                                        )}
                                    </button>
                                </div>
                            </div>


                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="rememberMe"
                                    checked={formData.rememberMe}
                                    onCheckedChange={handleRememberMeChange}
                                    className="data-[state=checked]:bg-[#d03e27] data-[state=checked]:border-[#d03e27]"
                                />
                                <Label
                                    htmlFor="rememberMe"
                                    className="text-sm text-gray-600 cursor-pointer select-none"
                                >
                                    Remember username
                                </Label>
                            </div>


                            <Button
                                type="submit"
                                className="w-full h-12 bg-gradient-to-r from-[#2596be] to-[#2a3e97]  text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                            >
                                Sign In
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <a
                                href="#forgot-password"
                                className="text-sm text-[#2a3e97] hover:text-[#2596be] transition-colors duration-300 font-medium"
                            >
                                Forgot your password?
                            </a>
                        </div>

                        {/* Footer */}
                        {/* <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              Don't have an account?{' '}
              <a
                href="#signup"
                className="text-[#2a3e97] hover:text-[#d03e27] transition-colors duration-300 font-medium"
              >
                Sign up here
              </a>
            </p>
          </div> */}
                    </div>
                </div>
            </div>

            {/* test api */}

        </>
    );
};

export default Login;
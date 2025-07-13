import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useChangePasswordMutation } from '../../store/services/api';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ChangePass = () => {
    const [changePassword, { isLoading }] = useChangePasswordMutation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        password: '',
        new_password: '',
        confirmpassword: '',
    });

    const [showPasswordFields, setShowPasswordFields] = useState({
        old: false,
        new: false,
        confirm: false,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswordFields(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.new_password !== formData.confirmpassword) {
            toast.error('New and confirm password do not match.', {
                position: 'top-right',
                autoClose: 4000,
            });
            return;
        }
        try {
            const res = await changePassword({
                password: formData.password,
                new_password: formData.new_password,
                roll: localStorage.getItem('userRoll'),
            }).unwrap();

            if (res?.status_code === 200) {
                toast.success('Password changed successfully!', {
                    position: 'top-right',
                    autoClose: 3000,
                });
                setTimeout(() => navigate('/'), 1000);
            } else {
                toast.error('Password change failed!', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            }
        } catch (error) {
            const message = error?.data?.message || 'Old Password is incorrect.';
            toast.error(message, {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <h4 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">Change Password</h4>
                <div className="rounded-2xl shadow-2xl p-8 backdrop-blur-sm bg-white/95">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Old Password */}
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                Old Password
                            </Label>
                            <div className="relative">
                                <FaLock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPasswordFields.old ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Enter old password"
                                    className="pl-10 pr-12 h-12 border-gray-300"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('old')}
                                    className="absolute right-3 top-3.5"
                                >
                                    {showPasswordFields.old ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        {/* New Password */}
                        <div className="space-y-2">
                            <Label htmlFor="new_password" className="text-sm font-medium text-gray-700">
                                New Password
                            </Label>
                            <div className="relative">
                                <FaLock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                <Input
                                    id="new_password"
                                    name="new_password"
                                    type={showPasswordFields.new ? 'text' : 'password'}
                                    value={formData.new_password}
                                    onChange={handleInputChange}
                                    placeholder="Enter new password"
                                    className="pl-10 pr-12 h-12 border-gray-300"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('new')}
                                    className="absolute right-3 top-3.5"
                                >
                                    {showPasswordFields.new ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <Label htmlFor="confirmpassword" className="text-sm font-medium text-gray-700">
                                Confirm Password
                            </Label>
                            <div className="relative">
                                <FaLock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                <Input
                                    id="confirmpassword"
                                    name="confirmpassword"
                                    type={showPasswordFields.confirm ? 'text' : 'password'}
                                    value={formData.confirmpassword}
                                    onChange={handleInputChange}
                                    placeholder="Confirm new password"
                                    className="pl-10 pr-12 h-12 border-gray-300"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('confirm')}
                                    className="absolute right-3 top-3.5"
                                >
                                    {showPasswordFields.confirm ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <Button
                            type="submit"
                            className="w-full h-12 bg-gradient-to-r from-[#2596be] to-[#2a3e97] text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Changing...' : 'Change Password'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePass;

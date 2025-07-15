
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Copy, QrCode, CreditCard, Smartphone, CheckCircle, AlertCircle } from 'lucide-react';
import qrcode from '../../assets/Images/frame.png';
import { useGetTotalQuery, usePaymentSentMutation } from '../../store/services/api';
import { toast } from 'react-toastify';

const PaymentDetails = () => {
  const [formData, setFormData] = useState({
    amount: '',
    number: '',
    transactionId: '',
  });
  const [paymentSent, { data, error, isLoading }] = usePaymentSentMutation();
  const params = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    paymentSent({
      amount: formData.amount.trim(),
      paymentMethod: params.method,  
      number: formData.number.trim(),
      transactionId: formData.transactionId.trim(),
    })
    .unwrap()                        
    .then(() => toast.success('Payment details submitted successfully!'))
    .catch((err) => toast.error('Payment error:', err));
    setFormData({
      amount: '',
      number: '',
      transactionId: '',
    });
  };

  const user = {
    email: localStorage.getItem('userEmail'),
    displayName: localStorage.getItem('userName'),
  };

  const copyNumber = () => {
    const number = '01615208833';
    navigator.clipboard.writeText(number).then(() => {
      toast.success('Number copied!', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: true,
      });
    });
  };

  const handleBack = () => {
    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8 z-0">
      <div className="container  mx-auto  px-4 sm:px-6 lg:px-8">
        <div className="mb-8 absolute top-36 hidden lg:block">
          <Link to="/payment"
            className="group flex items-center space-x-2 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-xl shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="font-medium">Back</span>
          </Link>
        </div>

        {/* Header Section */}
        <div className="text-center mb-12 relative z-10">
          
          <h1 className="text-3xl text-center md:text-4xl font-semibold text-gray-800 mb-2">
            Payment{' '}
            <span className="bg-gradient-to-br from-[#2596be] to-[#1d4ed8] text-transparent bg-clip-text">
              Instructions
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Follow the simple steps below to complete your secure payment transaction
          </p>
         
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* QR Code Section */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="text-center">
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Scan QR Code</h2>
              
              {/* QR Code Container */}
              <div className="relative inline-block">
                <div className="w-64 h-64 bg-gradient-to-br from-[#2596be] to-[#1d4ed8]  rounded-3xl p-4 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
                    <img src={qrcode} alt="QR Code" className="w-56 h-56 object-contain" />
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Personal Number</h3>
                    <p className="text-xl font-bold text-gray-900">01615208833</p>
                  </div>
                </div>
                <button
                  onClick={copyNumber}
                  className="group flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-indigo-100 rounded-xl transition-all duration-200"
                  aria-label="Copy number"
                >
                  <Copy className="w-5 h-5 text-gray-600 group-hover:text-indigo-600" />
                </button>
              </div>
            </div>

            {/* Reference Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Reference</h3>
                  <p className="text-lg font-semibold text-gray-900">
                    Use <span className="text-indigo-600">{user.displayName}</span> as reference
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Method Badge */}
            <div className="bg-gradient-to-br from-[#2596be] to-[#1d4ed8]  rounded-2xl p-6 text-white">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-indigo-100 text-sm">Payment Method</p>
                  <p className="text-xl font-bold capitalize">{params.method || 'Mobile Banking'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Submit Payment Details</h2>
              <p className="text-gray-600">Enter your transaction information below</p>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Amount Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Amount <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="Enter amount"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 text-lg font-medium"
                    required
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">
                    BDT
                  </div>
                </div>
              </div>

              {/* Phone Number Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Your Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  placeholder="01XXXXXXXXX"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 text-lg font-medium"
                  required
                />
              </div>
            </div>

            {/* Transaction ID Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Transaction ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="transactionId"
                value={formData.transactionId}
                onChange={handleChange}
                placeholder="Enter your transaction ID from mobile banking"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 text-lg font-medium"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="group relative bg-gradient-to-br from-[#2596be] to-[#1d4ed8] hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                    <span>Submit Payment</span>
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Secure Payment</h3>
              <p className="text-blue-700 text-sm leading-relaxed">
                Your payment information is encrypted and secure. We never store your sensitive financial data. 
                Please double-check all details before submitting your payment information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
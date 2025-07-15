

import React from 'react';
import { CreditCard, Smartphone, Building2, CheckCircle, Clock, XCircle, Calendar, DollarSign } from 'lucide-react';
import { useGetPaymentHistoryQuery } from '../../store/services/api';
import Loading from '../../components/ui/Loading';



const History = () => {
    const token = localStorage.getItem('authToken');

     const { data, error, isLoading } = useGetPaymentHistoryQuery(token, {
        skip: !token,
    });
   const paymentHistory = data?.data || [];
  const getPaymentIcon = (method) => {
    const methodLower = method.toLowerCase();
    if (methodLower.includes('card') || methodLower.includes('credit') || methodLower.includes('debit')) {
      return <CreditCard className="w-5 h-5" />;
    } else if (methodLower.includes('mobile') || methodLower.includes('phone')) {
      return <Smartphone className="w-5 h-5" />;
    } else if (methodLower.includes('bank')) {
      return <Building2 className="w-5 h-5" />;
    }
    return <DollarSign className="w-5 h-5" />;
  };

  const getStatusConfig = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return {
          icon: <CheckCircle className="w-5 h-5" />,
          color: 'text-emerald-600',
          bg: 'bg-emerald-50',
          border: 'border-emerald-200',
          dot: 'bg-emerald-500'
        };
      case 'pending':
        return {
          icon: <Clock className="w-5 h-5" />,
          color: 'text-amber-600',
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          dot: 'bg-amber-500'
        };
      case 'failed':
        return {
          icon: <XCircle className="w-5 h-5" />,
          color: 'text-red-600',
          bg: 'bg-red-50',
          border: 'border-red-200',
          dot: 'bg-red-500'
        };
      default:
        return {
          icon: <Clock className="w-5 h-5" />,
          color: 'text-gray-600',
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          dot: 'bg-gray-500'
        };
    }
  };

  const formatDate = (dateString) => {
    // Handle the format from your API: "2024-01-15T10:30:00Z" -> "15-01-2024"
    return dateString.split("T")[0].split("-").reverse().join("-");
  };
  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-6 lg:p-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-3xl mb-6">
              <XCircle className="w-12 h-12 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Payment History</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Unable to load your payment history. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-6 lg:p-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          
          <h1 className="text-3xl text-center md:text-4xl font-semibold text-gray-800 mb-4">
            Payment <span className='bg-gradient-to-br from-[#2596be] to-[#1d4ed8] text-transparent bg-clip-text'>History</span > 
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track all your transactions and payment activities in one place
          </p>
        
        </div>

        {paymentHistory.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paymentHistory.map((item, index) => {
              const statusConfig = getStatusConfig(item.status);
              return (
                <div
                  key={item.id}
                  className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200 hover:-translate-y-1"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-[#2596be] to-[#2a3e97] p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-white/20 p-2 rounded-lg">
                          {getPaymentIcon(item.paymentMethod)}
                        </div>
                        <div>
                          <p className="font-semibold text-lg">#{item.id}</p>
                          <p className="text-indigo-100 text-sm">{item.paymentMethod}</p>
                        </div>
                      </div>
                      <div className={`flex items-center space-x-1 ${statusConfig.bg} ${statusConfig.border} border rounded-full px-3 py-1`}>
                        <div className={`w-2 h-2 ${statusConfig.dot} rounded-full`}></div>
                        <span className={`text-xs font-medium ${statusConfig.color}`}>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    {/* Amount */}
                    <div className="mb-6">
                      <p className="text-sm text-gray-500 mb-1">Amount</p>
                      <p className="text-3xl font-bold text-gray-900">
                        ৳{item.amount.toLocaleString()}
                        <span className="text-sm font-normal text-gray-500 ml-1">BDT</span>
                      </p>
                    </div>

                    {/* Date */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {formatDate(item.depositDate)}
                        </span>
                      </div>
                      <div className={`flex items-center space-x-1 ${statusConfig.color}`}>
                        {statusConfig.icon}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 pb-6">
                    <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          item.status === 'completed' ? 'bg-emerald-500' :
                          item.status === 'pending' ? 'bg-amber-500' : 'bg-red-500'
                        } rounded-full transition-all duration-500 group-hover:w-full`}
                        style={{ width: item.status === 'completed' ? '100%' : '60%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-3xl mb-6">
              <CreditCard className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Payment History</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              You haven't made any payments yet. Your transaction history will appear here once you make your first payment.
            </p>
          </div>
        )}

        {/* Summary Cards */}
        {paymentHistory.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Transactions</p>
                  <p className="text-2xl font-bold text-gray-900">{paymentHistory.length}</p>
                </div>
                <div className="bg-indigo-100 p-3 rounded-xl">
                  <CreditCard className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ৳{paymentHistory.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                  </p>
                </div>
                <div className="bg-emerald-100 p-3 rounded-xl">
                  <DollarSign className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Successful Payments</p>
                  <p className="text-2xl font-bold text-gray-900">
                   {paymentHistory.length}
                  </p>
                </div>
                <div className="bg-emerald-100 p-3 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;

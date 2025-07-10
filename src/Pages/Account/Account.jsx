
import React from 'react';
import { useSingleuserDataQuery } from '../../store/services/api';
import { 
  Wallet, 
  Calendar, 
  DollarSign, 
  Users, 
  TrendingUp, 
  CreditCard,
  Clock,
  AlertCircle,
  CheckCircle,
  Minus
} from 'lucide-react';
import Loading from '../../components/ui/Loading';

export default function App() {
  const token = localStorage.getItem('authToken');
  const { data, error, isLoading } = useSingleuserDataQuery(undefined, {
    skip: !token,
  });
  const apiData = data?.data;
  const singleUserAmount = [
    {
      id: 1,
      icon: DollarSign,
      title: 'Expected Amount',
      value: apiData ? `৳ ${apiData.totalExpectedAmount.toLocaleString()}` : '--',
      subtitle: 'Total Expected Amount',
      gradient: 'from-rose-400 via-red-500 to-red-600',
      bgGradient: 'from-rose-50 to-red-50',
      iconColor: 'text-red-600',
      textColor: 'text-red-700',
      borderColor: 'border-red-200',
      shadowColor: 'shadow-red-100'
    },
    {
      id: 2,
      icon: CheckCircle,
      title: 'Paid Amount',
      value: apiData ? `৳ ${apiData.totalPaid.toLocaleString()}` : '--',
      subtitle: 'Total Paid Amount',
      gradient: 'from-emerald-400 via-green-500 to-green-600',
      bgGradient: 'from-emerald-50 to-green-50',
      iconColor: 'text-emerald-600',
      textColor: 'text-emerald-700',
      borderColor: 'border-emerald-200',
      shadowColor: 'shadow-emerald-100'
    },
    {
      id: 3,
      icon: Minus,
      title: 'Event Deduction',
      value: apiData ? `৳ ${apiData.totalDeduction.toLocaleString()}` : '--',
      subtitle: 'Total Deductions Made',
      gradient: 'from-blue-400 via-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-indigo-50',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-200',
      shadowColor: 'shadow-blue-100'
    },
    {
      id: 4,
      icon: AlertCircle,
      title: 'Due Amount',
      value: apiData ? `৳ ${apiData.totalDue.toLocaleString()}` : '--',
      subtitle: 'Total Due Amount',
      gradient: 'from-amber-400 via-orange-500 to-orange-600',
      bgGradient: 'from-amber-50 to-orange-50',
      iconColor: 'text-orange-600',
      textColor: 'text-orange-700',
      borderColor: 'border-orange-200',
      shadowColor: 'shadow-orange-100'
    },
    {
      id: 5,
      icon: CreditCard,
      title: 'Credit Balance',
      value: apiData ? `৳ ${apiData.totalBalance.toLocaleString()}` : '--',
      subtitle: 'Total Credit Balance',
      gradient: 'from-purple-400 via-violet-500 to-purple-600',
      bgGradient: 'from-purple-50 to-violet-50',
      iconColor: 'text-purple-600',
      textColor: 'text-purple-700',
      borderColor: 'border-purple-200',
      shadowColor: 'shadow-purple-100'
    },
    {
      id: 6,
      icon: Clock,
      title: 'Last Paid On',
      value: apiData ? apiData.lastPaidAt.split('T')[0].split('-').reverse().join('-') : '--',
      subtitle: 'Last Paid Date',
      gradient: 'from-teal-400 via-cyan-500 to-teal-600',
      bgGradient: 'from-teal-50 to-cyan-50',
      iconColor: 'text-teal-600',
      textColor: 'text-teal-700',
      borderColor: 'border-teal-200',
      shadowColor: 'shadow-teal-100'
    },
  ];

  if (isLoading) {
    return (
     <Loading></Loading>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-lg font-medium text-red-600">Error loading account data</p>
          <p className="text-sm text-gray-500 mt-2">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-6 lg:p-8 relative overflow-hidden'>

      <div className="container mx-auto  px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg shadow-blue-500/25 mb-6">
            <Wallet className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl text-center md:text-4xl font-semibold text-gray-800  mb-3">
            <span>Account </span>
            <span className='bg-gradient-to-br from-[#2596be] to-[#2a3e97] bg-clip-text text-transparent'>Summary</span>
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            Overview of your financial details and transactions
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8">
          {singleUserAmount.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.id}
                className={`group relative bg-white/80 backdrop-blur-sm rounded-3xl border ${card.borderColor} shadow-md ${card.shadowColor} hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 overflow-hidden`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient}`}></div>

                <div className="relative p-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${card.bgGradient} rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                    <IconComponent className={`w-8 h-8 ${card.iconColor}`} />
                  </div>
                  <h3 className={`text-xl font-bold ${card.textColor} mb-3 group-hover:text-gray-900 transition-colors duration-300`}>
                    {card.title}
                  </h3>
                  <div className="mb-4">
                    <span className="text-3xl md:text-4xl font-bold text-gray-900 group-hover:bg-gradient-to-r group-hover:from-gray-800 group-hover:to-gray-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {card.value}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">
                    {card.subtitle}
                  </p>
                </div>
                <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${card.gradient} blur-xl`}></div>
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </div>
  );
}
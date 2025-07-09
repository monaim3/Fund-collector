import React from 'react'
import { useGetTotalQuery } from '../../store/services/api';

export default function Account() {
     const apiData = data?.data;
     const { data, error, isLoading } = useGetTotalQuery(undefined, {
       skip: !token,
     })
      const singleUserAmount = [
        {
          id: 1,
          icon: FaWallet,
          title: 'Balance',
          value: apiData ? `৳ ${apiData.totalBalance}` : '--',
          subtitle: 'Fund Balance',
          color: 'from-emerald-500 to-emerald-600',
          bgColor: 'bg-emerald-50',
          iconColor: 'text-emerald-600'
        },
        {
          id: 2,
          icon: FaCalendarAlt,
          title: 'Total Event',
          value: apiData ? `৳ ${apiData.totalEvent}` : '--',
          subtitle: 'Total Event occurs',
          color: 'from-blue-500 to-blue-600',
          bgColor: 'bg-blue-50',
          iconColor: 'text-blue-600'
        },
        {
          id: 3,
          icon: FaMoneyBillWave,
          title: 'Total Expense',
          value: apiData ? `৳ ${apiData.totalExpense}` : '--',
          subtitle: 'Total Expenses',
          color: 'from-red-500 to-red-600',
          bgColor: 'bg-red-50',
          iconColor: 'text-red-600'
        },
        {
          id: 4,
          icon: FaWallet,
          title: 'Total Fund',
          value: apiData ? `৳ ${apiData.totalFund}` : '--',
          subtitle: 'Total Funds Raised',
          color: 'from-purple-500 to-purple-600',
          bgColor: 'bg-purple-50',
          iconColor: 'text-purple-600'
        },
      ];
    
  return (
    <div>
    <h1 className="text-3xl text-center md:text-4xl font-semibold text-gray-800 mb-2">
            <span className='font-light'>Your Account Summary </span>
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {singleUserAmount.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.id}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                {/* Card Content */}
                <div className="relative p-6">
                  {/* Icon Section */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 ${card.bgColor} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-7 h-7 ${card.iconColor}`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors duration-300">
                    {card.title}
                  </h3>

                  {/* Value */}
                  <div className="mb-3">
                    <span className="text-3xl md:text-4xl font-bold text-gray-900 group-hover:bg-gradient-to-r group-hover:from-[#d03e27] group-hover:to-[#2a3e97] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {card.value}
                    </span>
                  </div>

                  {/* Subtitle */}
                  <p className="text-sm text-gray-500 font-medium">
                    {card.subtitle}
                  </p>

                  {/* Decorative Element */}
                  <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${card.color} group-hover:w-full transition-all duration-500`}></div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gray-200 transition-colors duration-300"></div>
              </div>
            );
          })}
        </div>
    </div>
  )
}


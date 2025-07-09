import {
  FaWallet,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaUsers,
  FaChartLine
} from 'react-icons/fa';
import { useGetTotalQuery } from '../../store/services/api';
import Loading from './Loading';

const Card = () => {
    const token = localStorage.getItem('authToken');
   const { data, error, isLoading } = useGetTotalQuery(undefined, {
    skip: !token,
  });
   const apiData = data?.data;

  const cardData = [
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
  const user = {
    email: localStorage.getItem('userEmail'),
    displayName: localStorage.getItem('userName'),
  };
  if (isLoading) {
    return (
     <Loading></Loading>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8 z-0">
      <div className="container  mx-auto  px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl text-center md:text-4xl font-semibold text-gray-800 mb-2">
            <span className='font-light'>Welcome </span>
            {user?.displayName}
          </h1>
          <p className="text-gray-600 text-center text-lg">
            A quick glance at your current fund status and activities.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {cardData.map((card) => {
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

        {/* Additional Stats Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Quick Stats</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">This Month</span>
                <span className="font-semibold text-green-600">+15.3%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Last Month</span>
                <span className="font-semibold text-blue-600">+8.7%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Year to Date</span>
                <span className="font-semibold text-purple-600">+42.1%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Recent Activity</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600 text-sm">New transaction completed</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600 text-sm">Event scheduled</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-600 text-sm">User registered</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg md:col-span-2 lg:col-span-1">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Performance</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-600 text-sm">Revenue</span>
                  <span className="text-sm font-semibold">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-[#d03e27] to-[#2a3e97] h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-600 text-sm">Expenses</span>
                  <span className="text-sm font-semibold">62%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full" style={{ width: '62%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
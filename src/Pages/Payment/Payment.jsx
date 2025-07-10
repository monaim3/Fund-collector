
import React from 'react';
import bkash from '../../assets/Images/bkash.png';
import nagad from '../../assets/Images/nagad.png';
import rocket from '../../assets/Images/rocket.png';
import bank from '../../assets/Images/bank.png';
import { FaCreditCard } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Payment = () => {
  const paymentMethods = [
    { id: 1, name: 'Bkash', icon: bkash },
    { id: 2, name: 'Nagad', icon: nagad },
    { id: 3, name: 'Rocket', icon: rocket },
    { id: 4, name: 'Bank', icon: bank },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] p-6 lg:p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Select <span className="bg-gradient-to-br from-[#2596be] to-[#1d4ed8] text-transparent bg-clip-text">Payment Method</span>
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {paymentMethods.map((method) => {
            const cardContent = (
              <div
                className={`group bg-white rounded-xl shadow-lg ${
                  method.name !== 'Bank'
                    ? 'hover:shadow-2xl hover:-translate-y-1 hover:border-blue-500'
                    : 'cursor-not-allowed opacity-70'
                } transform transition-all duration-300 border-2 border-transparent p-6 flex flex-col items-center text-center`}
              >
                <img
                  src={method.icon}
                  alt={method.name}
                  className="h-14 w-14 object-contain mb-4 transition-transform duration-300 group-hover:scale-110"
                />
                <h2 className="text-lg font-semibold text-gray-700 mb-1">
                  {method.name}
                </h2>
                <p className="text-sm text-gray-500">Pay securely with {method.name}</p>
              </div>
            );

            return method.name !== 'Bank' ? (
              <Link key={method.id} to={`/payment/${method.name.toLowerCase()}`}>
                {cardContent}
              </Link>
            ) : (
              <div key={method.id}>{cardContent}</div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Payment;

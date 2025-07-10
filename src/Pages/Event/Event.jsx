
import React from 'react';
import { MdEvent, MdDateRange, MdStickyNote2, MdAttachMoney } from 'react-icons/md';
import Loading from '../../components/ui/Loading';
import { useEventDataQuery } from '../../store/services/api';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Event = () => {
    const token = localStorage.getItem('authToken') || 'mock-token';
    const { data, error, isLoading } = useEventDataQuery(undefined, {
        skip: !token,
    });
    const apiData = data?.data;
    const EventList =useSelector((state)=> state.common.eventList)
    if (isLoading) {
        return <Loading />;
    }
    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-6 lg:p-8 relative overflow-hidden'>
            <div className="container mx-auto  px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-2'>Events</h1>
                    <p className="text-gray-600 text-lg">All Events are listed here</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {apiData?.map((card, index) => (
                        <div key={index} className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100">
                            <div className="p-6">
                                {/* Event Name */}
                                <div className="flex items-start mb-4">
                                    <div className="flex-shrink-0 mr-3">
                                        <div className="w-8 h-8 bg-gradient-to-r from-[#2596be] to-[#2a3e97] rounded-lg flex items-center justify-center">
                                            <MdEvent className="w-4 h-4 text-white" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-[#2a3e97] transition-colors duration-200 mt-[-px]">
                                            {card.eventName}
                                        </h3>
                                    </div>
                                </div>

                                {/* Event Date */}
                                <div className="flex items-center mb-4">
                                    <div className="flex-shrink-0 mr-3">
                                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                            <MdDateRange className="w-4 h-4 text-green-600" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-600 font-medium">
                                            {card.eventDate.split('T')[0]}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start mb-4">
                                    <div className="flex-shrink-0 mr-3">
                                        <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                                            <MdStickyNote2 className="w-4 h-4 text-amber-600" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {card.note}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center pt-4 border-t border-gray-100">
                                    <div className="flex-shrink-0 mr-3">
                                        <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                            <MdAttachMoney className="w-4 h-4 text-emerald-600" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500 mb-1"> Expense</p>
                                        <p className="text-lg font-semibold text-gray-800">
                                             {EventList[0]?.amount}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                               <Link
                                to={`/event/${card.id}`} className="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center">
                                    <button className="w-full bg-gradient-to-r from-[#2596be] to-[#2a3e97] text-white font-medium py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                    View Details
                                </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Event;
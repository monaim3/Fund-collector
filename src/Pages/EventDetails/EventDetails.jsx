
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  MdReceipt,
  MdPerson,
  MdDateRange,
  MdStickyNote2,
  MdAttachMoney,
  MdTrendingUp,
} from "react-icons/md";
import { FiDollarSign } from "react-icons/fi";
import { useGetEventByIdQuery } from "../../store/services/api";
import Loading from "../../components/ui/Loading";
import { Link } from "react-router-dom"; 
import { FaArrowCircleLeft, FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setEventList } from "../../store/Slice/commonSlice";

const EventDetails = () => {
 const { id } = useParams();
  const token = localStorage.getItem("authToken");
  const dispatch = useDispatch();
  const { data, isLoading } = useGetEventByIdQuery(id, { skip: !token });
  const eventList = Array.isArray(data?.data) ? data.data : [];
  const totalAmount = eventList.reduce(
    (sum, item) => sum + (Number(item.amount) || 0), 0
  );
  useEffect(() => {
    if (eventList.length) {
      dispatch(setEventList(eventList));
    }
  }, [eventList, dispatch]);
  if (isLoading) return <Loading />;
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-6 lg:p-8">
      <div className="container mx-auto  px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link to="/event" className="mr-4">
            <button className="mr-4 p-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
              <FaArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            </Link>
            <h1 className="text-xl md:text-3xl font-semibold text-gray-800">
              Event Expense Details
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[#2596be] to-[#1d4ed8]  rounded-lg flex items-center justify-center mr-4">
                  <MdReceipt className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Expenses</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {eventList.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center mr-4">
                  <MdAttachMoney className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {totalAmount}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mr-4">
                  <MdTrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Average Expense</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {totalAmount / eventList.length || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
         

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs lg:text-lg font-semibold text-gray-600 uppercase tracking-wider">
                    <div className="flex items-center ">
                      <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2 text-lg">
                        #
                      </span>
                      ID
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs lg:text-lg font-semibold text-gray-600 uppercase tracking-wider">
                    <div className="flex items-center">
                      <MdReceipt className="w-4 h-4 text-purple-600 mr-2" />
                      Purpose
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs lg:text-lg font-semibold text-gray-600 uppercase tracking-wider">
                    <div className="flex items-center">
                      <FiDollarSign className="w-4 h-4 text-green-600 mr-2" />
                      Amount
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs lg:text-lg  font-semibold text-gray-600 uppercase tracking-wider">
                    <div className="flex items-center">
                      <MdPerson className="w-4 h-4 text-blue-600 mr-2" />
                      Spent By
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs lg:text-lg font-semibold text-gray-600 uppercase tracking-wider">
                    <div className="flex items-center">
                      <MdDateRange className="w-4 h-4 text-orange-600 mr-2" />
                      Date
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs lg:text-lg font-semibold text-gray-600 uppercase tracking-wider">
                    <div className="flex items-center">
                      <MdStickyNote2 className="w-4 h-4 text-amber-600 mr-2" />
                      Note
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {eventList.map((item, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="w-8 h-8 bg-gradient-to-br from-[#2596be] to-[#1d4ed8] rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {item.id}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {item.purpose}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          {item.amount}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        
                        <div className="text-sm font-medium text-gray-900">
                          {item.spentBy}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {item.expenseDate.split("T")[0].split("-").reverse().join("-")}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className="text-sm text-gray-600 max-w-xs truncate"
                        title={item.note || "N/A"}
                      >
                        {item.note || "N/A"}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Showing {eventList.length} expense
                {eventList.length !== 1 ? "s" : ""}
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">
                  Total Amount:
                </span>
                <span className="inline-flex items-center px-4 py-2 rounded-lg text-lg font-bold bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md">
                  {totalAmount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;

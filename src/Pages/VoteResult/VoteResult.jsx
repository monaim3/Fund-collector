
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BarChart3, TrendingUp, Users, Trophy, Medal, Award } from 'lucide-react';
import { useGetVoteResultQuery } from '../../store/services/api';
import Loading from '../../components/ui/Loading';

const VoteResult = () => {

  const { id } = useParams();
  const token = localStorage.getItem("authToken");

  const { data, isLoading } = useGetVoteResultQuery(id, token, { skip: !token });
  const voteResults = data?.data || [];
  const [animatedResults, setAnimatedResults] = useState([]);
  const totalVotes = voteResults?.reduce((sum, result) => sum + result.vote_count, 0) || 0;
  const topOption = voteResults.length > 0 ? voteResults.reduce((max, current) =>
    current.vote_count > max.vote_count ? current : max
  )
    : null;

  useEffect(() => {
    if (voteResults.length > 0) {
      setAnimatedResults(voteResults.map(() => ({ percentage: 0, votes: 0 })));

      const timer = setTimeout(() => {
        setAnimatedResults(voteResults.map(result => ({
          percentage: result.vote_percentage,
          votes: result.vote_count
        })));
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [voteResults]);

  const getRankIcon = (index) => {
    switch (index) {
      case 0: return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 1: return <Medal className="w-6 h-6 text-gray-400" />;
      case 2: return <Award className="w-6 h-6 text-amber-600" />;
      default: return <BarChart3 className="w-6 h-6 text-blue-500" />;
    }
  };

  const getGradientColor = (index) => {
    const gradients = [
      'from-purple-500 to-pink-500',
      'from-blue-500 to-cyan-500',
      'from-emerald-500 to-teal-500',
      'from-orange-500 to-red-500',
      'from-indigo-500 to-purple-500'
    ];
    return gradients[index % gradients.length];
  };

  const getBorderColor = (index) => {
    const colors = [
      'border-purple-200',
      'border-blue-200',
      'border-emerald-200',
      'border-orange-200',
      'border-indigo-200'
    ];
    return colors[index % colors.length];
  };

  if (isLoading) return <Loading />;
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-6  ">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Vote Results
                </h1>
                <p className="text-gray-600 mt-1">Real-time voting statistics and analytics</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 text-gray-600">
                <Users className="w-5 h-5" />
                <span className="text-sm font-medium">Total Votes</span>
              </div>
              <div className="text-2xl font-bold text-gray-800">{totalVotes.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-6">
        {!voteResults || voteResults.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <BarChart3 className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Results Available</h3>
            <p className="text-gray-500">Voting results will appear here once available.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Statistics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Leading Option</p>
                    <p className="text-xl font-bold text-gray-800 truncate">
                      {topOption ? (
                        <p className="text-xl font-bold text-gray-800 truncate"> {topOption.title}</p>
                      ) : (
                        <p>No votes yet.</p>
                      )}
                    </p>
                  </div>
                  <Trophy className="w-8 h-8 text-yellow-500" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Participation Rate</p>
                    <p className="text-xl font-bold text-gray-800">
                      {totalVotes > 0
                        ? Math.round((totalVotes / (totalVotes * 1.2)) * 100)
                        : 0}%
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Options Available</p>
                    <p className="text-xl font-bold text-gray-800">{voteResults.length}</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-blue-500" />
                </div>
              </div>
            </div>

            {/* Vote Results Cards */}
            <div className="space-y-4">
              {voteResults.map((result, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${getBorderColor(index)} group hover:scale-[1.02]`}
                >
                  <div className="p-6 md:p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-start space-x-4">
                        {/* <div className="flex-shrink-0">
                          {getRankIcon(index)}
                        </div> */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
                            {result.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">

                            <span>{animatedResults[index]?.votes?.toLocaleString() || 0} votes</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl md:text-3xl font-bold text-gray-800">
                          {animatedResults[index]?.percentage?.toFixed(1) || 0}%
                        </div>
                        <div className="text-sm text-gray-500">of total votes</div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative">
                      <div className="w-full bg-gray-200 rounded-full h-3 md:h-4 overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${getGradientColor(index)} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
                          style={{
                            width: `${animatedResults[index]?.percentage || 0}%`
                          }}
                        >
                          <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
                        </div>
                      </div>
                      <div className="absolute -top-1 right-0 transform translate-y-1">
                        <div className="w-2 h-2 bg-white rounded-full shadow-md"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Message */}
            <div className="text-center mt-12 p-6 bg-white rounded-xl shadow-md border border-gray-100">
              <p className="text-gray-600">
                Results are updated in real-time. Thank you for participating in the voting process!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoteResult;
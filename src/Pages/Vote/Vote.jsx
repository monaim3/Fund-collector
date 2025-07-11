import React from 'react';
import { useGetVoteQuery } from '../../store/services/api';
import Loading from '../../components/ui/Loading';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MdAccessTime,   
  MdGroups,      
  MdHowToVote,   
  MdCalendarToday 
} from 'react-icons/md';
import { Link } from 'react-router-dom';

const Vote = () => {
  const token = localStorage.getItem('authToken');
  const { data, isLoading } = useGetVoteQuery(null, { skip: !token });
  const voteList = data?.data || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  const formatExpiryDate = (date) => {
    const expiryDate = new Date(date);
    const now = new Date();
    const diffDays = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'Expired';
    if (diffDays === 0) return 'Expires today';
    if (diffDays === 1) return 'Expires tomorrow';
    return `${diffDays} days left`;
  };

  const getExpiryColor = (date) => {
    const expiryDate = new Date(date);
    const now = new Date();
    const diffDays = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'bg-red-100 text-red-800 border-red-200';
    if (diffDays <= 3) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-green-100 text-green-800 border-green-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <MdHowToVote className="w-8 h-8 text-indigo-600 mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Active Votes
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Participate in ongoing polls and make your voice heard
          </p>
        </div>

        {/* Empty state */}
        {voteList.length === 0 ? (
          <div className="text-center py-16">
            <MdHowToVote className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No active votes</h3>
            <p className="text-gray-600">Check back later for new voting opportunities</p>
          </div>
        ) : (
          /* Cards grid */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {voteList.map((vote) => (
              <Card
                key={vote.id}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-indigo-500/10"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <CardTitle className="text-xl font-bold text-gray-900 text-hover:[#2596be] transition-colors duration-200 line-clamp-2">
                      {vote.title}
                    </CardTitle>
                    
                    <Badge
                      variant="outline"
                      className={`ml-2 flex-shrink-0 ${getExpiryColor(vote.expiresAt)}`}
                    >
                      <MdAccessTime className="w-3 h-3 mr-1" />
                      {formatExpiryDate(vote.expiresAt)}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {vote.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center text-sm text-gray-500">
                      <MdGroups className="w-4 h-4 mr-1.5" />
                      <span className="font-medium text-gray-900">{vote.votes}</span>
                      <span className="ml-1">votes</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MdCalendarToday className="w-4 h-4 mr-1.5" />
                      <span>{new Date(vote.expiresAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* CTA */}
                 <Link to={`/vote/${vote.id}`}>
                   <Button
                    className="w-full bg-gradient-to-br from-[#2596be] to-[#1d4ed8] hover:from-indigo-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                    size="lg"
                  >
                    <MdHowToVote className="w-4 h-4 mr-2" />
                    Vote Now
                  </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Vote;

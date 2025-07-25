import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/ui/Loading';
import { useGetSingleVoteQuery, useSendVoteMutation } from '../../store/services/api';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setSaveVote } from '../../store/Slice/commonSlice';


const VoteDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch()
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate()
  const { data, error, isLoading } = useGetSingleVoteQuery(id, {
    skip: !token,
  });

  const [selectedId, setSelectedId] = useState(null);
  console.log("Selected ID:", selectedId);
  const [sendVote, { data: voteData, error: voteError, isLoading: voteLoading }] = useSendVoteMutation();
  const handleSubmit = e => {
    e.preventDefault();
    sendVote({ pollID: id, optionID: selectedId }).unwrap()
      .then((res) => {
        if (res?.data) {
          dispatch(setSaveVote(res.data));
        }
        toast.success('Vote submitted successfully!', {
          position: "top-right",
          autoClose: 2000,
        });
        setSelectedId(null);
        navigate(`/vote/${id}/result`, { replace: true });
      })
      .catch((err) => {
        toast.error("Vote error");
      });
  };
  if (isLoading) return <Loading />;
  if (error) return <p className="text-red-600">Something went wrong.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {data?.data?.length ? (
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto bg-white rounded-xl shadow p-6 space-y-6"
          >
            <fieldset className="space-y-4">
              <legend className="text-lg font-semibold text-gray-800 mb-2">
                Choose one
              </legend>

              {data.data.map(({ id, title }) => (
                <label
                  key={id}
                  className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-slate-50"
                >
                  <input
                    type="radio"
                    name="vote-option"
                    value={id}
                    checked={selectedId === id}
                    onChange={() => setSelectedId(id)}
                    className="h-4 w-4 text-indigo-600"
                  />
                  <span className="text-gray-700">{title}</span>
                </label>
              ))}
            </fieldset>

            <button
              type="submit"
              disabled={selectedId === null}
              className="w-full py-2 px-4 rounded-md text-white font-medium bg-gradient-to-br from-[#2596be] to-[#1d4ed8]  disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Submit Vote
            </button>
          </form>
        ) : (
          <p className="text-gray-600">Vote not found.</p>
        )}
      </div>
    </div>
  );
};

export default VoteDetails;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SendToBack } from "lucide-react";

const customBaseQuery = async (args, api, extraOptions) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: "https://apex.oracle.com/pls/apex/beesoft/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  const result = await rawBaseQuery(args, api, extraOptions);

  if (result?.error?.status === "PARSING_ERROR") {
    try {
      const fixedJSON = JSON.parse(
        result.error.data.replace(/,(\s*[}\]])/g, "$1"),
      );
      return { data: fixedJSON };
    } catch (err) {
      return result;
    }
  }

  return result;
};
export const api = createApi({
  reducerPath: "api",
  baseQuery: customBaseQuery,
   tagTypes: ["UserProfile"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ roll, password }) => ({
        url: "auth/login",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { roll, password },
      }),
    }),
    getTotal: builder.query({
      query: () => ({
        url: "fund/get-total",
        method: "GET",
      }),
    }),
    SingleuserData: builder.query({
      query: () => ({
        url: "fund/user-fund",
        method: "GET",
      }),
    }),
    eventData: builder.query({
      query: () => ({
        url: "event/list",
        method: "GET",
      }),
    }),
    getEventById: builder.query({
      query: (id) => ({
        url: `event/expense/${id}`,
        method: "GET",
      }),
    }),
    getPaymentHistory: builder.query({
      query: () => ({
        url: "payment/payment-history",
        method: "GET",
      }),
    }),
    paymentSent: builder.mutation({
      query: ({ amount, paymentMethod, number, transactionId }) => ({
        url: "payment/request",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { amount, paymentMethod, number, transactionId },
      }),
    }),
    getVote: builder.query({
      query: () => ({
        url: "poll/poll-list",
        method: "GET",
      }),
    }),
    getSingleVote: builder.query({
      query: (id) => ({
        url: `poll/poll-options/${id}`,
        method: "GET",
      }),
    }),
    getOptionId: builder.query({
      query: (id) => ({
        url: `poll/user-vote/${id}`,
        method: "GET",
      }), 
    }),
    sendVote: builder.mutation({
      query: ({ pollID, optionID }) => ({
        url: `poll/poll-vote`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { pollID, optionID },
      }),
    }),
    getVoteResult: builder.query({
      query: (id) => ({
        url: `poll/result/${id}`,
        method: "GET",
      }),
    }),
    changePassword: builder.mutation({
      query: ({ new_password, password, roll }) => ({
        url: "auth/reset-password",
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: { new_password, password, roll },
      }),
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: "auth/profile",
        method: "GET",
      }),
      providesTags: ["UserProfile"],

    }),
    userProfileEdit: builder.mutation({
      query: (profile) => ({
        url: "auth/update-profile",
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: profile,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    getNotification: builder.query({
      query: () => ({
        url: "notification/all",
        method: "GET",
      }),
        providesTags: ["Notification"],
    }),
    notificationRead: builder.mutation({
      query: ({ id }) => ({
        url: `notification/read/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Notification"],
    })
  }),
});
export const {
  useLoginMutation,
  useGetTotalQuery,
  useSingleuserDataQuery,
  useEventDataQuery,
  useGetEventByIdQuery,
  useGetPaymentHistoryQuery,
  usePaymentSentMutation,
  useGetVoteQuery,
  useGetSingleVoteQuery,
  useSendVoteMutation,
  useChangePasswordMutation,
  useGetUserProfileQuery,
  useGetVoteResultQuery,
  useUserProfileEditMutation,
  useGetNotificationQuery,
  useNotificationReadMutation,
  useGetOptionIdQuery
} = api;

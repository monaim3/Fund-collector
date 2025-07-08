// services/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://apex.oracle.com/pls/apex/beesoft/auth/',
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => 'https://jsonplaceholder.typicode.com/posts',
    }),

    login: builder.mutation({
      query: ({ roll, password }) => ({
        url: 'login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { roll, password },
      }),
    }),
  }),
});

export const { useGetPostsQuery, useLoginMutation } = api;

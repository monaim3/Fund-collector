import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const customBaseQuery = async (args, api, extraOptions) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: 'https://apex.oracle.com/pls/apex/beesoft/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });

  const result = await rawBaseQuery(args, api, extraOptions);

  if (result?.error?.status === 'PARSING_ERROR') {
    try {
      const fixedJSON = JSON.parse(
        result.error.data.replace(/,(\s*[}\]])/g, '$1') // 🔧 Remove trailing commas
      );
      return { data: fixedJSON };
    } catch (err) {
      return result;
    }
  }

  return result;
};
export const api = createApi({
  reducerPath: 'api',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ roll, password }) => ({
        url: 'auth/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: { roll, password },
      }),
    }),
    getTotal: builder.query({
      query: () => ({
        url: 'fund/get-total',
        method: 'GET',
      }),
    }),
  }),
});

export const { useLoginMutation, useGetTotalQuery } = api;

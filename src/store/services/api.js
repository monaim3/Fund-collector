import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Custom baseQuery with manual JSON fix
const customBaseQuery = async (args, api, extraOptions) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: 'https://apex.oracle.com/pls/apex/beesoft/auth/',
  });

  const result = await rawBaseQuery(args, api, extraOptions);

  // If there's a parsing error, try to parse the response manually
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
        url: 'login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: { roll, password },
      }),
    }),
  }),
});

export const { useLoginMutation } = api;

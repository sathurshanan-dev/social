import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

const base_query = fetchBaseQuery({
  baseUrl: BASE_URL,
});

const base_query_with_auth = async (args, api, extra) => {
  const result = await base_query(args, api, extra);
  if (result.error && result.error.status === 401) {
    api.dispatch(logout());
  }
  return result;
};

export const api_slice = createApi({
  baseQuery: base_query_with_auth,
  tagTypes: ['User'],
  endpoints: (builder) => ({}),
});

import { api_slice } from './api';
import { USERS_URL } from '../constants';

export const user_api_slice = api_slice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (params) => ({
        url: `${USERS_URL}/register`,
        method: 'POST',
        body: params,
      }),
    }),
    login: builder.mutation({
      query: (params) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: params,
      }),
    }),
    profile: builder.mutation({
      query: ({ token, data }) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useProfileMutation } =
  user_api_slice;

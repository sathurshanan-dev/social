import { api_slice } from './api';
import { POSTS_URL } from '../constants';

export const post_api_slice = api_slice.injectEndpoints({
  endpoints: (builder) => ({
    posts: builder.query({
      query: () => ({
        url: POSTS_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Posts'],
    }),
    createPost: builder.mutation({
      query: (params) => ({
        url: `${POSTS_URL}/new`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${params.token}`,
        },
        body: params.data,
      }),
    }),
  }),
});

export const { usePostsQuery, useCreatePostMutation } = post_api_slice;

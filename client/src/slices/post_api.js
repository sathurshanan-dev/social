import { api_slice } from './api';
import { POSTS_URL } from '../constants';

export const post_api_slice = api_slice.injectEndpoints({
  endpoints: (builder) => ({
    posts: builder.query({
      query: (params) => ({
        url: POSTS_URL,
        headers: {
          Authorization: `Bearer ${params.token}`,
        },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Posts'],
    }),
    post: builder.query({
      query: ({ token, id }) => ({
        url: `${POSTS_URL}/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      keepUnusedDataFor: 5,
    }),
    createPost: builder.mutation({
      query: ({ token, text }) => ({
        url: `${POSTS_URL}/new`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { text },
      }),
    }),
    like: builder.mutation({
      query: ({ token, id }) => ({
        url: `${POSTS_URL}/${id}/like`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Posts'],
    }),
  }),
});

export const {
  usePostsQuery,
  usePostQuery,
  useCreatePostMutation,
  useLikeMutation,
} = post_api_slice;

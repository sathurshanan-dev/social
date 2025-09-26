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
  }),
});

export const { usePostsQuery } = post_api_slice;

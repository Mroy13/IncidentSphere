import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  CreateStreamRequest,
  CreateStreamResponse,
  EndStreamRequest,
  JoinRoomRequest,
  JoinRoomResponse,
} from '@/features/stream-ops/types/stream.types';
import type { ApiResponse } from '@/shared/types/api.types';
import { getApiBaseUrl } from '@/shared/config/env';

export const streamApi = createApi({
  reducerPath: 'streamApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getApiBaseUrl()}/api/stream`,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Stream'],
  endpoints: (builder) => ({
    createStream: builder.mutation<CreateStreamResponse, CreateStreamRequest>({
      query: (body) => ({
        url: '/create',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ApiResponse<CreateStreamResponse>) => {
        if (!response.data) {
          throw new Error(response.message || 'Empty response from server');
        }
        return response.data;
      },
    }),
    joinRoom: builder.mutation<JoinRoomResponse, JoinRoomRequest>({
      query: (body) => ({
        url: '/join',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ApiResponse<JoinRoomResponse>) => {
        if (!response.data) {
          throw new Error(response.message || 'Empty response from server');
        }
        return response.data;
      },
    }),
    endStream: builder.mutation<string, EndStreamRequest>({
      query: (body) => ({
        url: '/end',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ApiResponse<string>) => response.message,
    }),
  }),
});

export const {
  useCreateStreamMutation,
  useJoinRoomMutation,
  useEndStreamMutation,
} = streamApi;

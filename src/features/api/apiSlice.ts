import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

const getURL = () => {
  const restoredURLString = localStorage.getItem("api");
  if (restoredURLString) {
    return restoredURLString
  } else return ""
}

const dynamicBaseQuery: BaseQueryFn<string | FetchArgs,
  unknown,
  FetchBaseQueryError> = async (args, WebApi, extraOptions) => {
  const baseUrl = getURL();
  const rawBaseQuery = fetchBaseQuery({ baseUrl });
  return rawBaseQuery(args, WebApi, extraOptions);
};

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: dynamicBaseQuery,
    refetchOnMountOrArgChange: 30,
    keepUnusedDataFor: 5,
    tagTypes: ['Rooms', 'Categories', 'Sources', 'RoomsAssignments', 'ChannelsFolders'],
    endpoints(builder){
        return {}
    }
});
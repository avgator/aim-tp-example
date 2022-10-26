import { apiSlice } from "./apiSlice";

export interface channel {
  id: number,
  referenceName: string,
  icon: string,
  position: number,
  channel: number,
  pin: boolean,
  category: string[],
}
export interface channelFolder {
  id: number,
  icon: string | null,
  iconURL:  string | null,
  mediaURL: string,
  referenceName: string,
  joinType: string | null,
  joinNumber: number | null,
  includedChannels: channel[] | null,
}
  export const channelsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
      getFolderTags: builder.query<string[], string>({
        query: (folder) => ({
            url: `/external/channels/folders/tags/${folder}`,
            method: 'GET',
        }),
      }),
      getChannelsFolders: builder.query<channelFolder[], void>({
        query: () => ({
            url: '/external/channels/folders/',
            method: 'GET',
        }),
        providesTags: ['ChannelsFolders'],
      }),
    })
})

export const { useGetFolderTagsQuery, useGetChannelsFoldersQuery } = channelsApiSlice
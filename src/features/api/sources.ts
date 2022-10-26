import { apiSlice } from "./apiSlice";

export interface category {
    label: string,
    id: number,
  }

export interface source {
  id: number,
  referenceName: string,
  crosspointEquipmentID: number,
  globalVideoInput: number,
  localVideoInput: number,
  globalAudioInput: number,
  localAudioInput: number,
  ipAddress: string | null,
  controlMethod: string | null,
  location: string | null,
  locationID: string | null,
  position: number | null,
  drawingDeviceID: string | null,
  model: string | null,
  folder: string | null | undefined,
  pdu: string | null,
  pduOutlet: number | null,
  category: string[],
  controlPage: string | null,
  icon: string | null,
  iconURL: string | null,
  sourceType: string,
}

export interface controlPage {
  id: number,
  label: string,
  channels: string,
}
  export const sourcesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
      getSourcesCategories: builder.query<category[], void>({
        query: () => ({
            url: '/external/sources/categories/list/',
            method: 'GET',
        }),
        providesTags: ['Categories'],
      }),
      getSources: builder.query<source[], void>({
        query: () => ({
            url: '/external/sources/',
            method: 'GET',
        }),
        providesTags: ['Sources'],
      }),
      getSourcesControlPages: builder.query<controlPage[], void>({
        query: () => ({
            url: '/external/sources/controlpages/',
            method: 'GET',
        }),
        providesTags: ['Sources'],
      }),
    })
  })

  export const { useGetSourcesCategoriesQuery, useGetSourcesQuery, useGetSourcesControlPagesQuery} = sourcesApiSlice
import { apiSlice } from "./apiSlice";

export interface room {
    id: number,
    referenceName: string,
    crosspointEquipmentID: number,
    crosspointControlID: number,
    roomType: string | null,
    supportGroup: string | null,
    processor: string | null,
    processorRoomNumber: string,
    globalVideoOutput: number | null,
    localVideoOutput: number | null,
    globalAudioOutput: number | null,
    localAudioOutput: number | null,
    useLightMap: boolean,
    mirroredViewVideoOutput: number | null,
    screens: number,
    subzones: number,
    globalRoomNumber: number,
    zonesButton: boolean,
    lightsButton: boolean, 
    languageButton: boolean,
    avButton: boolean,
    dspControlInstance: string | null,
    dspControlInstanceOne: string | null,
    dspControlInstanceTwo: string | null,
    dspControlInstanceThree: string | null,
    dspControlInstanceFour: string | null,
    dspControlInstanceFive: string | null,
    dspControlInstanceSix: string | null,
    systemOffPopup: number,
    volumeLowLimit: number | null,
    volumeHighLimit: number | null,
    volumeTurnOn: number | null,
    volumeLowLimitInstanceOne: number | null,
    volumeHighLimitInstanceOne: number | null,
    volumeTurnOnInstanceOne: number | null,
    volumeLowLimitInstanceTwo: number | null,
    volumeHighLimitInstanceTwo: number | null,
    volumeTurnOnInstanceTwo: number | null,
    volumeLowLimitInstanceThree: number | null,
    volumeHighLimitInstanceThree: number | null,
    volumeTurnOnInstanceThree: number | null,
    volumeLowLimitInstanceFour: number | null,
    volumeHighLimitInstanceFour: number | null,
    volumeTurnOnInstanceFour: number | null,
    volumeLowLimitInstanceFive: number | null,
    volumeHighLimitInstanceFive: number | null,
    volumeTurnOnInstanceFive: number | null,
    volumeLowLimitInstanceSix: number | null,
    volumeHighLimitInstanceSix: number | null,
    volumeTurnOnInstanceSix: number | null,
  }

  
export type assignmentsStatus = {
    referenceName: string,
    status: string | null,
 }

 export type assignments = {
  referenceName: string,
  id: number, 
  assignments: assignmentsStatus[],
}

  export const roomsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
      getRooms: builder.query<room[], void>({
        query: () => ({
            url: '/external/rooms/',
            method: 'GET',
        }),
        providesTags: ['Rooms'],
      }),
      getRoomsAssignments: builder.query<assignments[], void>({
        query: () => ({
            url: '/external/assignments/rooms/',
            method: 'GET',
        }),
        providesTags: ['RoomsAssignments'],
      }),
    })
})

export const { useGetRoomsQuery, useGetRoomsAssignmentsQuery } = roomsApiSlice
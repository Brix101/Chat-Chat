import { api, socket } from "./api";

export interface Room {
  name: string;
  _id: string;
}

export interface CreateRoom {
  name: string;
}

export const roomApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllRoom: build.query<Room[], string>({
      query: () => "/room/",
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;

          socket.on("createdRoom", (room) => {
            updateCachedData((draft) => {
              draft.push(room);
            });
          });
        } catch (error) {}

        await cacheEntryRemoved;

        socket.close();
      },
    }),
    getRoom: build.query<Room, string>({
      query: (roomId) => `/room/${roomId}`,
    }),
    createRoom: build.mutation<Room, CreateRoom>({
      query: (body) => ({
        url: "/room/",
        method: "POST",
        body: body,
      }),
    }),
    updateRoom: build.mutation<Room, Room>({
      query: (body) => ({
        url: "/room/",
        method: "PUT",
        body: body,
      }),
    }),
    deleteRoom: build.mutation<Room, string>({
      query: (roomId) => ({
        url: `/room/${roomId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateRoomMutation,
  useDeleteRoomMutation,
  useGetAllRoomQuery,
  useGetRoomQuery,
  useUpdateRoomMutation,
} = roomApi;

export const {
  endpoints: { createRoom, deleteRoom, getAllRoom, getRoom, updateRoom },
} = roomApi;

import { api } from "./api";

export interface Message {
  createdBy: string;
  message: string;
  _id: string;
}

export interface CreateMessage {
  message: string;
  roomId: string;
}

export const messageApi = api.injectEndpoints({
  endpoints: (build) => ({
    // getAllRoom: build.query<Room[], string>({
    //   query: () => "/room/",
    //   async onCacheEntryAdded(
    //     arg,
    //     { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
    //   ) {
    //     try {
    //       await cacheDataLoaded;

    //       socket.on("createdRoom", (room) => {
    //         updateCachedData((draft) => {
    //           draft.push(room);
    //         });
    //       });
    //     } catch (error) {}

    //     await cacheEntryRemoved;

    //     socket.close();
    //   },
    // }),
    // getRoom: build.query<Room, string>({
    //   query: (roomId) => `/room/${roomId}`,
    // }),
    createMessage: build.mutation<Message, CreateMessage>({
      query: (body) => ({
        url: "/message/",
        method: "POST",
        body: body,
      }),
    }),
    // updateRoom: build.mutation<Room, Room>({
    //   query: (body) => ({
    //     url: "/room/",
    //     method: "PUT",
    //     body: body,
    //   }),
    // }),
    // deleteRoom: build.mutation<Room, string>({
    //   query: (roomId) => ({
    //     url: `/room/${roomId}`,
    //     method: "DELETE",
    //   }),
    // }),
  }),
});

export const { useCreateMessageMutation } = messageApi;

export const {
  endpoints: {},
} = messageApi;

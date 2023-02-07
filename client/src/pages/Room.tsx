import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import { Box, FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../app/services/api";
import { useCreateMessageMutation } from "../app/services/messageServices";
import { useGetRoomQuery } from "../app/services/roomServices";
import MessageCard from "../components/MessageCard";

function Room() {
  const { roomId } = useParams();
  const { data } = useGetRoomQuery(roomId as string, {
    skip: roomId ? false : true,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const [message, setMessage] = useState<string>();

  const [createMessage, { isLoading }] = useCreateMessageMutation();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    socket.close();
    if (roomId) {
      socket.connect();
      socket.emit("join", roomId);
    }
    return function () {
      socket.close();
    };
  }, [roomId]);

  useEffect(() => {
    scrollToBottom();
  }, [data?.messages]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createMessage({
      message: message as string,
      roomId: roomId as string,
    }).then((res) => {
      setMessage("");
    });
  };

  return (
    <>
      <Box
        sx={{
          height: "100%",
          maxHeight: "90vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box
          sx={{
            height: "75vh",
            width: "100%",
            gap: 1,
            p: 2,
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              height: "auto",
              minHeight: "75vh",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 1,
              p: 2,
              overflowY: "auto",
            }}
          >
            {data?.messages.map(({ message, _id, createdBy }) => (
              <MessageCard key={_id} message={message} createdBy={createdBy} />
            ))}
            <div ref={messagesEndRef} />
          </Box>
        </Box>
        <FormControl
          component={"form"}
          sx={{ m: 2, width: "100%" }}
          onSubmit={handleSubmit}
        >
          <OutlinedInput
            type="text"
            name="message"
            id="message"
            multiline
            minRows={3}
            placeholder="Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ pr: 8 }}
            endAdornment={
              <InputAdornment position="end">
                <LoadingButton
                  type="submit"
                  color="primary"
                  variant="contained"
                  sx={{
                    position: "absolute",
                    right: 5,
                    bottom: 5,
                    width: 35,
                  }}
                  size="large"
                  loading={isLoading}
                >
                  <SendIcon />
                </LoadingButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
    </>
  );
}

export default Room;

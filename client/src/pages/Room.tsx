import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import { Box, FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Message from "../components/Message";

interface IMessage {
  message: string;
  user: boolean;
}
function Room() {
  const [messages, setMessages] = useState<IMessage[]>([
    {
      message: "hi",
      user: true,
    },
    {
      message: "hello",
      user: false,
    },
    {
      message: "hi",
      user: true,
    },
    {
      message: "hello",
      user: false,
    },
    {
      message: "hi",
      user: true,
    },
    {
      message: "hello",
      user: false,
    },
    {
      message: "hi",
      user: true,
    },
    {
      message: "hello",
      user: false,
    },
    {
      message: "hi",
      user: true,
    },
    {
      message: "hello",
      user: false,
    },
    {
      message: "hi",
      user: true,
    },
    {
      message: "hello",
      user: false,
    },
    {
      message: "hi",
      user: true,
    },
    {
      message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      user: false,
    },
    {
      message:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      user: true,
    },
    {
      message: "hello",
      user: false,
    },
    {
      message: "hi",
      user: true,
    },
    {
      message: "hello",
      user: false,
    },
    {
      message: "hi",
      user: true,
    },
    {
      message: "hello",
      user: false,
    },
    {
      message: "hi",
      user: true,
    },
    {
      message: "hello",
      user: false,
    },
    {
      message: "hi",
      user: true,
    },
    {
      message: "hello",
      user: false,
    },
    {
      message: "hi",
      user: true,
    },
    {
      message: "hello",
      user: false,
    },
    {
      message: "hi",
      user: true,
    },
    {
      message: "hello",
      user: false,
    },
    {
      message: "hi",
      user: true,
    },
    {
      message: "hello",
      user: false,
    },
    {
      message: "hi",
      user: true,
    },
    {
      message: "hello",
      user: false,
    },
    {
      message: "hi",
      user: true,
    },
    {
      message: "hello",
      user: false,
    },
    {
      message: "hi",
      user: true,
    },
    {
      message: "hello",
      user: false,
    },
    {
      message: "hi",
      user: true,
    },
    {
      message: "hello",
      user: false,
    },
    {
      message: "hi",
      user: true,
    },
    {
      message: "hello",
      user: false,
    },
    {
      message: "hi",
      user: true,
    },
    {
      message: "hello",
      user: false,
    },
    {
      message: "hi",
      user: true,
    },
    {
      message: "hello",
      user: false,
    },
    {
      message: "hi",
      user: true,
    },
    {
      message:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, , comes from a line in section 1.10.32.",
      user: false,
    },
    {
      message:
        "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
      user: false,
    },
    {
      message:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
      user: true,
    },
    {
      message: "hello",
      user: false,
    },
    {
      message: "hi",
      user: true,
    },
    {
      message: "hello",
      user: false,
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setMessages((prev) => [
      ...prev,
      {
        message: data.get("message") as string,
        user: true,
      },
    ]);
    event.currentTarget.reset();
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
            {messages.map(({ message, user }, index) => (
              <Message
                key={index}
                message={message + " " + index}
                user={user}
              />
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

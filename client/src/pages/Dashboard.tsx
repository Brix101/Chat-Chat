import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  CircularProgress,
  FormControl,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { useEffect, useRef } from "react";
import { socket } from "../app/services/api";
import { useLogoutMutation } from "../app/services/authServices";
import { useGetUserQuery } from "../app/services/userServices";
import Message from "../components/Message";
import CreateRoomButton from "../features/room/CreateRoomButton";

interface Message {
  message: string;
  user: boolean;
}

const messages: Message[] = [
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
];

export default function Dashboard() {
  const [logoutMutation, { isLoading: isLogoutLoading }] = useLogoutMutation();
  const { data, isLoading: isUserLoading } = useGetUserQuery("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // receive a message from the server
  socket.on("ping", (data) => {
    console.log({ data });
    socket.emit(data, "ping");
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    messages.push({
      message: data.get("message") as string,
      user: true,
    });
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Container maxWidth={"xl"} component="main" sx={{ flexWrap: "wrap" }}>
          <Toolbar>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Chat Chat
            </Typography>
            {isUserLoading ? (
              <CircularProgress size={25} />
            ) : (
              <>
                <Link
                  component={"div"}
                  color="text.primary"
                  sx={{ my: 1, mx: 1.5 }}
                >
                  {data?.email}
                </Link>
                <LoadingButton
                  loading={isLogoutLoading}
                  variant="outlined"
                  sx={{ my: 1, mx: 1.5 }}
                  onClick={() =>
                    logoutMutation("").then((res) => {
                      if (res) {
                        socket.disconnect();
                      }
                    })
                  }
                >
                  Logout
                </LoadingButton>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Container
        maxWidth={"xl"}
        component="main"
        sx={{ display: "flex", flex: 1 }}
      >
        <Box
          sx={{
            height: "100%",
            width: 240,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            borderRight: (theme) => `1px solid ${theme.palette.divider}`,
            p: 0.5,
          }}
        >
          <CreateRoomButton />
          <Button variant="outlined" size="large">
            Outlined 1
          </Button>
          <Button variant="outlined" size="large">
            Outlined 2
          </Button>
          <Button variant="outlined" size="large">
            Outlined 3
          </Button>
          <Button variant="outlined" size="large">
            Outlined 4
          </Button>
          <Button variant="outlined" size="large">
            Outlined 5
          </Button>
          <Button variant="outlined" size="large">
            Outlined 6
          </Button>
        </Box>
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
      </Container>
    </Box>
  );
}

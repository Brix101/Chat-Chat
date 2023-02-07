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
          <FormControl sx={{ m: 2, width: "100%" }} variant="outlined">
            <OutlinedInput
              type="text"
              multiline
              rows={3}
              placeholder="Message..."
              sx={{ pr: 8 }}
              endAdornment={
                <InputAdornment position="end">
                  <LoadingButton
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

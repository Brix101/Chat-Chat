import { LoadingButton } from "@mui/lab";
import { Button, CircularProgress } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { Outlet, useNavigate } from "react-router-dom";
import { socket } from "../app/services/api";
import { useLogoutMutation } from "../app/services/authServices";
import { useGetAllRoomQuery } from "../app/services/roomServices";
import { useGetUserQuery } from "../app/services/userServices";
import CreateRoomButton from "../features/room/CreateRoomButton";

export default function Dashboard() {
  const navigate = useNavigate();
  const [logoutMutation, { isLoading: isLogoutLoading }] = useLogoutMutation();
  const { data, isLoading: isUserLoading } = useGetUserQuery("");
  const { data: roomData, isLoading: isRoomLoading } = useGetAllRoomQuery("");

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
            alignItems: "center",
            gap: 1,
            borderRight: (theme) => `1px solid ${theme.palette.divider}`,
            p: 0.5,
          }}
        >
          {isRoomLoading ? (
            <CircularProgress />
          ) : (
            <>
              <CreateRoomButton />

              {roomData?.map(({ _id, name }) => (
                <Button
                  key={_id}
                  variant="outlined"
                  size="large"
                  onClick={() => navigate(`/${_id}`)}
                  fullWidth
                >
                  {name}
                </Button>
              ))}
            </>
          )}
        </Box>
        <Outlet />
      </Container>
    </Box>
  );
}

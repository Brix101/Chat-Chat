import { Box, Paper } from "@mui/material";
import { blue } from "@mui/material/colors";

interface Props {
  message: string;
  user: boolean;
}

function Message({ message, user }: Props) {
  return (
    <Box
      style={{
        width: "100%",
        position: "relative",
        display: "flex",
        justifyContent: user ? "end" : "start",
      }}
    >
      <Paper
        elevation={1}
        sx={{
          p: 2,
          maxWidth: 1 / 3,
          width: "auto",
          bgcolor: user ? blue[50] : "",
        }}
      >
        {message}
      </Paper>
    </Box>
  );
}

export default Message;

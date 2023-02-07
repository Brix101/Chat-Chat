import { Box, Paper } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useTypedSelector } from "../app/store";
import { userState } from "../features/user/userSlice";

interface Props {
  message: string;
  createdBy: string;
}

function MessageCard({ message, createdBy }: Props) {
  const { user } = useTypedSelector(userState);
  const isCreatedBy = user?._id === createdBy;

  return (
    <Box
      style={{
        width: "100%",
        position: "relative",
        display: "flex",
        justifyContent: isCreatedBy ? "end" : "start",
      }}
    >
      <Paper
        elevation={1}
        sx={{
          p: 2,
          maxWidth: 1 / 3,
          width: "auto",
          bgcolor: isCreatedBy ? blue[50] : "",
        }}
      >
        {message}
      </Paper>
    </Box>
  );
}

export default MessageCard;

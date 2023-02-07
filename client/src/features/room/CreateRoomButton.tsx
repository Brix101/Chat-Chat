import { Add as AddICon } from "@mui/icons-material";
import { Button } from "@mui/material";

function CreateRoomButton() {
  return (
    <>
      <Button variant="contained" size="large" startIcon={<AddICon />}>
        Create
      </Button>
    </>
  );
}

export default CreateRoomButton;

import { Add as AddICon } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useCreateRoomMutation } from "../../app/services/roomServices";

function CreateRoomButton() {
  const [name, setName] = React.useState<string>();
  const [open, setOpen] = React.useState(false);
  const [createRoom, { isLoading }] = useCreateRoomMutation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleCreateRoom() {
    createRoom({
      name: name as string,
    }).then(() => {
      handleClose();
      setName("");
    });
  }
  return (
    <>
      <Button
        variant="contained"
        size="large"
        startIcon={<AddICon />}
        onClick={handleClickOpen}
        fullWidth
      >
        Create
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Room</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="roomName"
            label="Room Name"
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <LoadingButton loading={isLoading} onClick={handleCreateRoom}>
            Create
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CreateRoomButton;

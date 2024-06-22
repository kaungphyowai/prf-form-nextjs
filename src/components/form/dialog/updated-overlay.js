"use clinent";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import ContainedButton from "../../custom/contained-button";
import { Typography } from "@mui/material";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

export default function UpdatedOverlayDialog({
  open,
  handleClose,
  handleConfirm,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "16px",
        },
      }}
    >
      <DialogContent
        sx={{
          paddingBottom: "5px",
          maxWidth: "280px",
        }}
      >
        <DialogContentText id="alert-dialog-description">
          <PlaylistAddCheckIcon
            sx={{
              width: "100%",
              fontSize: "28px",
              color: "black",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          <Typography
            variant="h6"
            fontWeight="600"
            fontSize="18px"
            color="#000000"
            textAlign="center"
          >
            Your information is updated.
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "20px",
        }}
      >
        <ContainedButton
          variant="contained"
          onClick={handleConfirm}
          autoFocus
          sx={{
            backgroundColor: "#94A3B8",
          }}
        >
          Ok
        </ContainedButton>
      </DialogActions>
    </Dialog>
  );
}

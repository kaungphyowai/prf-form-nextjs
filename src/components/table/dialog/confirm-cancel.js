"use clinent";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import ContainedButton from "../../custom/contained-button";
import OutlinedButton from "../../custom/outlined-button";
import { Typography } from "@mui/material";

export default function ConfirmCancelDialog({
  open, handleClose , handleConfirm}) {
  
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
            maxWidth: "240px",
          }}
        >
          <DialogContentText id="alert-dialog-description">
            <Typography
              variant="h6"
              fontWeight="600"
              fontSize="20px"
              color="#000000"
              textAlign="center"
            >
              Are you sure you want to cancel?
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
          <OutlinedButton variant="outlined" onClick={handleClose}>
            No
          </OutlinedButton>
          <ContainedButton variant="contained" onClick={handleConfirm} autoFocus>
            Yes
          </ContainedButton>
        </DialogActions>
      </Dialog>
  );
}

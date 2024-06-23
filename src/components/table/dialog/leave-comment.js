"use client";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import ContainedButton from "../../custom/contained-button";
import OutlinedButton from "../../custom/outlined-button";
import { Typography, Box } from "@mui/material";
import CustomInput from "../../custom/custom-input";
import { useState } from "react";

export default function LeaveCommentDialog({
  open,
  handleClose,
  handleSubmit,
}) {
  const [comment, setComment] = useState("");

  const handleValueChange = (event) => {
    setComment(event.target.value);
  };

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
          width: "260px",
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
            <Box>Leave a comment</Box>
            <Box>about your denial.</Box>
          </Typography>
          <CustomInput
            placeholder="Add a comment"
            value={comment}
            onChange={handleValueChange}
            sx={{
              "& .MuiInputBase-input": {
                textIndent: "20px",
              },
            }}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "20px",
          paddingX: "20px",
        }}
      >
        <OutlinedButton variant="outlined" onClick={handleClose}>
          Cancel
        </OutlinedButton>
        <ContainedButton
          variant="contained"
          onClick={() => handleSubmit(comment)}
          autoFocus
          sx={{
            backgroundColor: "#CBD5E1",
            color: "#94A3B8",
          }}
        >
          Submit Denial
        </ContainedButton>
      </DialogActions>
    </Dialog>
  );
}

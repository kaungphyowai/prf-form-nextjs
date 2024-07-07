"use client";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const CustomInput = styled(TextField)(() => ({
  color: "#000000",
  backgroundColor: "#F1F5F9",
  maxWidth: "445px",
  width: "100%",
  borderRadius: "32px",
  marginTop: "5px",
  "& .MuiInputBase-input": {
    border: "none !important",
    padding: "0px !important",
    height: "40px",
  },
  "& fieldset": {
    border: "none",
  },
}));

export default CustomInput;

"use client";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const OutlinedButton = styled(Button)(() => ({
  textTransform: "capitalize",
  borderRadius: "32px",
  height: "33px",
  borderColor: "#94A3B8",
  color: "#94A3B8",
  border: "1px solid",
  fontSize: "14px",
  fontWeight: "600",
  "&:hover": {
    backgroundColor: "#94A3B8",
    color: "#fff",
    borderColor: "#94A3B8",
  },
}));

export default OutlinedButton;

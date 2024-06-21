"use client";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const ContainedButton = styled(Button)(() => ({
  textTransform: "capitalize",
  borderRadius: "32px",
  height: "33px",
  backgroundColor: "#475569",
  boxShadow: "none !important",
  "&:hover": {
    backgroundColor: "#475569",
  },
}));

export default ContainedButton;

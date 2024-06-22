"use client";
import { useState } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Box, Typography } from "@mui/material";
import ContainedButton from "../custom/contained-button";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const FormId = () => {
  const [id, setId] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // message: "Can’t proceed. This ID is already in the review stage."

  const handleChange = (newValue) => {
    setId(newValue);
  };

  const handleVerifyId = () => {
    console.log(id);
  };

  return (
    <Box
      sx={{
        marginTop: "80px",
        width: "fit-content",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Typography
        textTransform="capitalize"
        fontSize={{
          xs: "19px",
          md: "23px",
        }}
        fontWeight="700"
        marginBottom="30px"
        textAlign="center"
        width="100%"
      >
        Enter prfhq PRFHQ ID
      </Typography>
      <MuiOtpInput
        sx={{
          gap: "10px",
          marginBottom: "10px",
          "& .Mui-focused fieldset": {
            border: "4px solid #475569 !important",
          },
          "& .MuiOtpInput-TextField": {
            "& fieldset": {
              borderRadius: {
                xs: "10px",
                md: "20px",
              },
              border: "2px solid #CBD5E1",
            },
            "& input": {
              width: {
                xs: "33px",
                md: "56px",
              },
              height: {
                xs: "33px",
                md: "56px",
              },
              fontWeight: "700",
              scale: {
                xs: "1.2",
                md: "1.6",
              },
              padding: "0px",
            },
          },
        }}
        value={id}
        onChange={handleChange}
        length={6}
      />
      {errorMessage && (
        <Box display="flex" alignItems="center" color="red" gap="5px">
          <InfoOutlinedIcon
            fontSize="10px"
            sx={{
              transform: "rotate(180deg)",
            }}
          />
          <Typography fontWeight="400" fontSize="10px">
            {errorMessage}
          </Typography>
        </Box>
      )}
      <ContainedButton
        onClick={handleVerifyId}
        variant="contained"
        sx={{
          marginTop: "10px",
          width: "100%",
          backgroundColor: "#94A3B8",
        }}
      >
        Verify
      </ContainedButton>
    </Box>
  );
};

export default FormId;

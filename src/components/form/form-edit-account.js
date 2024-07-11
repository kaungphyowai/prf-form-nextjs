"use client";
import { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import ContainedButton from "../custom/contained-button";
import OutlinedButton from "../custom/outlined-button";
import EditNoteIcon from "@mui/icons-material/EditNote";
import InputAdornment from "@mui/material/InputAdornment";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DoneIcon from "@mui/icons-material/Done";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import InformationOverlayDialog from "./dialog/information-overlay";

const FormEditAccountInfo = ({cardNo}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("addressgoeshere@domain.com");
  const [NameErrorMessage, setNameErrorMessage] = useState(
    "Name already exist."
  ); // message:
  const [EmailErrorMessage, setEmailErrorMessage] = useState(
    " This email is already connected to an account."
  ); // message:  This email is already connected to an account.

  // handle dialog
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    // verify if there is no error


    // submit to review stage
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "prfhqid": cardNo,
  "name": name,
  "email": email,
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("/api/submitForm", requestOptions)
  .then((response) => response.json())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

    setOpen(true);

  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    // add logic here
  };

  return (
    <Box
      sx={{
        marginTop: "80px",
        width: "fit-content",
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        textTransform="capitalize"
        fontSize="19px"
        fontWeight="700"
        marginBottom="30px"
      >
        edit account information
      </Typography>
      <Box>
        <Typography textTransform="capitalize" fontSize="10px" fontWeight="600">
          Name
        </Typography>
        <TextField
          sx={{
            color: "#000000",
            backgroundColor: "#fffff",
            width: "323px",
            marginTop: "5px",
            "& .MuiInputBase-input": {
              textIndent: "15px",
              border: "none !important",
              padding: "0px !important",
              height: "42px",
              "&::placeholder": {
                color: "black",
              },
            },
            "& fieldset": {
              borderRadius: "12px",
              border: "2px solid #CBD5E1",
            },
          }}
          placeholder="Name Goes Here"
          value={name}
          onChange={(e) => setName(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <EditNoteIcon sx={{ color: "#000000" }} />
              </InputAdornment>
            ),
          }}
        />
        {NameErrorMessage && (
          <Box
            display="flex"
            alignItems="center"
            color="red"
            gap="5px"
            marginTop="5px"
          >
            <InfoOutlinedIcon
              fontSize="10px"
              sx={{
                transform: "rotate(180deg)",
              }}
            />
            <Typography fontWeight="400" fontSize="10px">
              {NameErrorMessage}
            </Typography>
          </Box>
        )}
      </Box>
      <Box marginTop="15px">
        <Typography textTransform="capitalize" fontSize="10px" fontWeight="600">
          Email
        </Typography>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            color: "#000000",
            backgroundColor: "#fffff",
            width: "323px",
            marginTop: "5px",
            "& .MuiInputBase-input": {
              textIndent: "15px",
              border: "none !important",
              padding: "0px !important",
              height: "42px",
              "&::placeholder": {
                color: "black",
              },
            },
            "& fieldset": {
              borderRadius: "12px",
              border: "2px solid #CBD5E1",
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <EditNoteIcon sx={{ color: "#000000" }} />
              </InputAdornment>
            ),
          }}
        />
        {EmailErrorMessage && (
          <Box
            display="flex"
            alignItems="center"
            color="red"
            gap="5px"
            marginTop="5px"
          >
            <InfoOutlinedIcon
              fontSize="10px"
              sx={{
                transform: "rotate(180deg)",
              }}
            />
            <Typography fontWeight="400" fontSize="10px">
              {EmailErrorMessage}
            </Typography>
          </Box>
        )}
      </Box>
      <Box marginTop="20px" gap="10px" display="flex" alignItems="center">
        <Typography fontWeight="600" fontSize="14px">
          Card No:
        </Typography>
        <Box
          bgcolor="#F1F5F9"
          fontSize="14px"
          padding="10px 15px"
          borderRadius="14px"
        >
          {cardNo}
        </Box>
      </Box>
      <Box display="flex" alignItems="center" gap="10px" marginTop="20px">
        <OutlinedButton
          sx={{
            width: "50%",
          }}
          variant="outlined"
          startIcon={<RotateLeftIcon color="#94A3B8" />}
        >
          Reset
        </OutlinedButton>
        <ContainedButton
          variant="contained"
          sx={{
            width: "50%",
            backgroundColor: "#94A3B8",
          }}
          startIcon={<DoneIcon />}
          onClick={handleClickOpen}
        >
          Submit
        </ContainedButton>
      </Box>
      {/*  */}
      <InformationOverlayDialog
        open={open}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      />
    </Box>
  );
};

export default FormEditAccountInfo;

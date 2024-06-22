"use client";
import BasicTable from "../../components/table/table";
import Header from "../../components/table/header";
import { Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import Button from "@mui/material/Button";
import { useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import SearchIcon from "@mui/icons-material/Search";
import TabPanel from "@mui/lab/TabPanel";
import CustomInput from "../../components/custom/custom-input";
import ContainedButton from "../../components/custom/contained-button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ConfirmCancelDialog from "../../components/table/dialog/confirm-cancel";
import InputAdornment from "@mui/material/InputAdornment";

function Page() {
  const [value, setValue] = useState("pending"); // default tab

  // handle tab change (add logic here / you can call your api here)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // rows and headers
  const rows = [
    {
      newName: "name goes here",
      newEmail: "gmail@gmail.com",
      oldName: "name goes here",
      oldEmail: "gmail@gmail.com",
    },
    {
      newName: "name goes here",
      newEmail: "gmail@gmail.com",
      oldName: "name goes here",
      oldEmail: "gmail@gmail.com",
    },
  ];

  const headers = ["Old Info", "", "New Info"];

  // handle dialog
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    // add logic here
  };

  return (
    <Box>
      <Header />
      <Box>
        <TabContext value={value}>
          <Box
            paddingX="16px"
            display={{
              xs: "block",
              md: "flex",
            }}
            justifyContent="space-between"
            alignItems="center"
          >
            <TabList
              onChange={handleChange}
              aria-label="status"
              sx={{
                ".MuiTabs-indicator": {
                  backgroundColor: "black",
                },
              }}
            >
              <Tab
                label="Pending"
                value="pending"
                sx={{
                  paddingX: "0px",
                  paddingBottom: "5px",
                  minWidth: "fit-content",
                  color: "black",
                  marginRight: "15px",
                  "&.Mui-selected": {
                    color: "black",
                  },
                }}
                disableRipple
              />
              <Tab
                label="Denied"
                value="denied"
                sx={{
                  paddingX: "0px",
                  paddingBottom: "5px",
                  minWidth: "fit-content",
                  color: "black",
                  "&.Mui-selected": {
                    color: "black",
                  },
                }}
                disableRipple
              />
            </TabList>

            <CustomInput
              sx={{
                marginTop: {
                  xs: "10px",
                  md: "0px",
                },
              }}
              placeholder="Search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#000000" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          {/* panding tab */}
          <TabPanel value="pending" sx={{ padding: "0px" }}>
            <BasicTable headers={headers} rows={rows}>
              <ContainedButton
                onClick={handleClickOpen}
                variant="contained"
                startIcon={<CloseIcon color="#94A3B8" />}
              >
                Cancel
              </ContainedButton>
            </BasicTable>
          </TabPanel>
          <TabPanel value="denied" sx={{ padding: "0px" }}>
            {/* denied tab */}
            <BasicTable headers={headers} rows={rows}>
              <ContainedButton
                variant="contained"
                endIcon={<KeyboardArrowDownIcon />}
              >
                view admin comments
              </ContainedButton>
            </BasicTable>
          </TabPanel>
        </TabContext>
      </Box>
      {/* dialog */}
      <ConfirmCancelDialog
        open={open}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      />
    </Box>
  );
}

export default Page;

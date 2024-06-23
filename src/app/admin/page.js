"use client";
import BasicTable from "../../components/table/table";
import Header from "../../components/table/header";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box } from "@mui/material";
import ContainedButton from "../../components/custom/contained-button";
import OutlinedButton from "../../components/custom/outlined-button";
import LeaveCommentDialog from "../../components/table/dialog/leave-comment";
import TableTabs from "../../components/table/tabs"

function Page() {
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

  const headers = ["Old Info", "", "New Info" , "" , ""];

  // tabs
  const [value, setValue] = useState("pending"); // default tab

  const tabsList = [
    { label: "Pending", value: "pending" },
    { label: "Denied", value: "denied" },
  ];

  // handle tab change (add logic here / you can call your api here)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // search
  const [searchValue, setSearchValue] = useState("");
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  // handle dialog
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (comment) => {
    // add logic here
    console.log(comment);
  };

  return (
    <Box>
      <Header LinksPostion={"center"} />
      <Box>
        <TabContext value={value}>
          <TableTabs handleTabChange={handleChange} tabList={tabsList} handleSearchChange={handleSearchChange} searchValue={searchValue} />
          {/* panding tab */}
          <TabPanel value="pending" sx={{ padding: "0px" }}>
            <BasicTable headers={headers} rows={rows}>
              <OutlinedButton
                onClick={handleClickOpen}
                variant="outlined"
                startIcon={<CloseIcon color="#94A3B8" />}
              >
                Deny
              </OutlinedButton>
              <ContainedButton variant="contained" startIcon={<DoneIcon />}>
                Approved
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
      <LeaveCommentDialog
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
    </Box>
  );
}

export default Page;

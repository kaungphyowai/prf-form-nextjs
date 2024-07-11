"use client";
import BasicTable from "../../components/table/table";
import Header from "../../components/table/header";
import { Box, formControlClasses } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
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
import TableTabs from "../../components/table/tabs";

function Page() {
  // rows and headers
  // example json 
  // {
  //   formId: 12345678,
  //   newName: "name goes here",
  //   newEmail: "gmail@gmail.com",
  //   oldName: "name goes here",
  //   oldEmail: "gmail@gmail.com",
  // }
  let [rows, setRows] = useState([
    {
        formId: 12345678,
        newName: "name goes here",
        newEmail: "gmail@gmail.com",
        oldName: "name goes here",
        oldEmail: "gmail@gmail.com",
      }
  ])

  // tabs
  const [value, setValue] = useState("pending"); // default tab

  // fetch pending form at the start
  useEffect(() => {
    const requestOptions = {
      method: "POST",
      redirect: "follow"
    };
    setRows([]);
    
    if(value == "pending")
    {

      fetch("/api/fetchPendingForms", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          let rowstmp = result.map(ele => {
            console.log(ele.new_name);
            return {
              formId: ele.approval_id,
              newName: ele.new_name,
              newEmail: ele.new_email,
              oldName: ele.old_name,
              oldEmail: ele.old_email,
            }
          })
          // console.log(result)
          console.log(rowstmp)
          setRows(rowstmp)
        })
        .catch((error) => console.error(error));
    }
    else
    {
      fetch("/api/fetchDenyForms", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          let rowstmp = result.map(ele => {
            console.log(ele.new_name);
            return {
              formId: ele.approval_id,
              newName: ele.new_name,
              newEmail: ele.new_email,
              oldName: ele.old_name,
              oldEmail: ele.old_email,
            }
          })
          // console.log(result)
          console.log(rowstmp)
          setRows(rowstmp)
        })
        .catch((error) => console.error(error));
    }
  }, [value])
  


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

  const handleConfirm = () => {
    // add logic here
  };

  return (
    <Box>
      <Header />
      <Box>
        <TabContext value={value}>
          <TableTabs
            handleTabChange={handleChange}
            tabList={tabsList}
            handleSearchChange={handleSearchChange}
            searchValue={searchValue}
          />
          {/* pending tab */}
          <TabPanel value="pending" sx={{ padding: "0px" }}>
            <BasicTable rows={rows}>
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
            <BasicTable rows={rows}>
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

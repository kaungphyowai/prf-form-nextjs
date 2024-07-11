"use client";
import AdminTable from "../../components/table/adminTable";
import Header from "../../components/table/header";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { useEffect, useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box } from "@mui/material";
import ContainedButton from "../../components/custom/contained-button";
import OutlinedButton from "../../components/custom/outlined-button";
import LeaveCommentDialog from "../../components/table/dialog/leave-comment";
import TableTabs from "../../components/table/tabs";

function Page() {
  // rows and headers
  /**
   * {
      formId: 12345678,
      message: "submitted by Mg Mg at 3:00 on 1.1.2024",
      newName: "name goes here",
      newEmail: "gmail@gmail.com",
      oldName: "name goes here",
      oldEmail: "gmail@gmail.com",
    },
   */
    let [rows, setRows] = useState([
      {
        formId: 12345678,
        message: "submitted by Mg Mg at 3:00 on 1.1.2024",
        newName: "name goes here",
        newEmail: "gmail@gmail.com",
        oldName: "name goes here",
        oldEmail: "gmail@gmail.com",
      }
    ])

  // tabs
  const [value, setValue] = useState("pending"); // default tab

  const tabsList = [
    { label: "Pending", value: "pending" },
    { label: "Denied", value: "denied" },
  ];

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
              return {
                formId: ele.approval_id,
                prfhq_id: ele.prfhq_id,
                message: `submitted by ${ele.submitter_name} at ${new Date(ele.submitted_at).toDateString()}`,
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
                prfhq_id: ele.prfhq_id,
                message: `submitted by ${ele.submitter_name} at ${new Date(ele.submitted_at).toDateString()}`,
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
  const [selectedFormId, setSelectedFormId] = useState(null);


  const handleClickOpen = (formId) => {
    setSelectedFormId(formId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (comment) => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "formid": selectedFormId,
      "comment": comment
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("/api/denyPendingForm", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
    console.log(comment);
  };

  const handleApproved = (formid) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "formid": formid
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("/api/approvePendingForm", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }

  return (
    <Box>
      <Header LinksPostion={"center"} />
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
            <AdminTable rows={rows} pending={true} handleClickOpen={handleClickOpen} handleApproved={handleApproved} >
            </AdminTable>
          </TabPanel>
          <TabPanel value="denied" sx={{ padding: "0px" }}>
            {/* denied tab */}
            <AdminTable rows={rows} handleClickOpen={handleClickOpen} pending={false}>
            </AdminTable>
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

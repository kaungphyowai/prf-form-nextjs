import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import OutlinedButton from "../custom/outlined-button";
import ContainedButton from "../custom/contained-button";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// reusable table for all pages
export default function AdminTable({ headers, rows, pending, handleClickOpen, handleApproved }) {
  return (
    <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                fontSize: "16px",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  marginRight: "10px",
                  backgroundColor: "#F1F5F9",
                  minWidth: "80px",
                  paddingY: "10px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Form ID
              </Box>
              <Box>Old Info</Box>
            </TableCell>
            <TableCell></TableCell>
            <TableCell
              sx={{
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              New Info
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.formId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{
                  borderBottom: "none",
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      marginRight: "10px",
                      backgroundColor: "#F1F5F9",
                      minWidth: "80px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      paddingY: "10px",
                      borderRadius: "8px",
                      fontWeight: "600",
                    }}
                  >
                    {row.prfhq_id}
                  </Box>
                  <Typography>{row.oldName}</Typography>
                </Box>
                {row.message && (
                  <Typography fontSize="10px" color="#94A3B8" fontWeight="400">
                    {row.message}
                  </Typography>
                )}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  borderBottom: "none",
                }}
              >
                {row.oldEmail}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  borderBottom: "none",
                }}
              >
                {row.newName}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  borderBottom: "none",
                }}
              >
                {row.newEmail}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  borderBottom: "none",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "flex-end",
                  }}
                >
                {
                    pending && (
                        <>
                        <OutlinedButton
                onClick={() => {
                    handleClickOpen(row.formId)
                }}
                variant="outlined"
                startIcon={<CloseIcon color="#94A3B8" />}
              >
                Deny
              </OutlinedButton>
              <ContainedButton variant="contained" startIcon={<DoneIcon />}
              onClick={() => handleApproved(row.formId)}
              >
                Approved
              </ContainedButton>
                        </>
                    )
                }
                {
                    !pending && (
                        <ContainedButton
                variant="contained"
                endIcon={<KeyboardArrowDownIcon />}
              >
                view admin comments
              </ContainedButton>
                    )
                }
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

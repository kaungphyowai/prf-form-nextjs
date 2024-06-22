import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

// reusable table for all pages
export default function BasicTable({ headers, rows, children }) {
  return (
    <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell
                key={header}
                sx={{
                  borderBottom: "none",
                }}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{
                  borderBottom: "none",
                }}
              >
                {row.newName}
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "none",
                }}
              >
                {row.newEmail}
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "none",
                }}
              >
                {row.oldName}
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "none",
                }}
              >
                {row.oldEmail}
              </TableCell>
              <TableCell
                align="right"
                sx={{
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
                  {/* buttons as children */}
                  {children}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

import { Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import CustomInput from "../../components/custom/custom-input";

function TableTabs({
  handleTabChange,
  tabList,
  handleSearchChange,
  searchValue,
}) {
  return (
    <Box
      paddingX="16px"
      paddingTop="8px"
      display={{
        xs: "block",
        md: "flex",
      }}
      justifyContent="space-between"
      alignItems="center"
    >
      <TabList
        onChange={handleTabChange}
        aria-label="status"
        sx={{
          ".MuiTabs-indicator": {
            backgroundColor: "black",
          },
        }}
      >
        {tabList.map(({ label, value }) => (
          <Tab
            label={label}
            value={value}
            sx={{
              fontSize: "16px",
              fontWeight: "600",
              padding: "0px",
              minWidth: "fit-content",
              color: "black",
              marginRight: "15px",
              "&.Mui-selected": {
                color: "black",
              },
            }}
            disableRipple
          />
        ))}
      </TabList>

      <CustomInput
        onChange={handleSearchChange}
        sx={{
          marginTop: {
            xs: "10px",
            md: "0px",
          },
          "& input::placeholder": {
            fontSize: "16px",
            fontWeight: "600",
            color: "black",
            opacity: "1",
          },
        }}
        value={searchValue}
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
  );
}

export default TableTabs;

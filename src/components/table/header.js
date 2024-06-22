"use client";
import { Box, Typography, IconButton, Menu } from "@mui/material";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

function Header({ justifyContent }) {
  const links = ["Text Here", "Text Here", "Text Here"];

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <>
      <Box
        color="#F8FAFC"
        bgcolor="#475569"
        paddingX="16px"
        height="68px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {/* avatar */}
        <Box
          sx={{
            bgcolor: "#F8FAFC",
            borderRadius: "50%",
            height: "36px",
            width: "36px",
          }}
        />
        {/* links */}
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            gap: "16px",
            marginLeft: "30px",
            // change order based on justifyContent param
            maxWidth: `${justifyContent == "space-between" ? "fit-content" : "100%"}`,
          }}
        >
          {links.map((link) => (
            <Link href="#" key={link} style={{ textDecoration: "none" }}>
              <Typography sx={{ my: 2, color: "white", display: "block" }}>
                {link}
              </Typography>
            </Link>
          ))}
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "flex", md: "none" },
            marginLeft: "15px",
          }}
        >
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={anchorElNav}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {links.map((link) => (
              <Link href="#" key={link} style={{ textDecoration: "none" }}>
                <Typography
                  sx={{ mx: 2, my: 1, color: "black", display: "block" }}
                >
                  {link}
                </Typography>
              </Link>
            ))}
          </Menu>
        </Box>
        {/* avatar menu */}
        <Box
          sx={{
            bgcolor: "#F8FAFC",
            borderRadius: "50%",
            height: "36px",
            width: "36px",
          }}
        />
      </Box>
    </>
  );
}

export default Header;

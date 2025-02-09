import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { FaRegUserCircle } from "react-icons/fa";

export const Header = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Typography variant="h6" sx={{ cursor: "pointer" }}>
          Skincare
        </Typography>

        {/* Navigation */}
        <div style={{ display: "flex", gap: "20px" }}>
          {["Home", "About", "Booking", "Contact"].map((item) => (
            <Typography
              key={item}
              sx={{
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
                margin: "0 10px",
                transition: "0.3s",
                "&:hover": { color: "black", backgroundColor: "white" },
              }}
            >
              {item}
            </Typography>
          ))}
        </div>

        {/* User Icon */}
        <IconButton>
          <FaRegUserCircle size={25} color="white" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

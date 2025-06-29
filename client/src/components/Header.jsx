import { Typography, Box, useTheme } from "@mui/material";

import React from "react";

function Header({ title, subTitle }) {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="h2"
        color={theme.palette.secondary[100]}
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={theme.palette.secondary[200]}>
        {subTitle}
      </Typography>
    </Box>
  );
}

export default Header;

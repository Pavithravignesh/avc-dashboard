import React from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="80vh"
            textAlign="center"
            px={2}
        >
            <Typography variant="h3" color="error" gutterBottom>
                404 - Page Not Found
            </Typography>

            <Typography variant="body1" color="text.secondary" mb={3}>
                The page you're looking for doesn't exist or may have been moved.
            </Typography>

            <Button
                variant="outlined"
                color={theme.palette.secondary[200]}
                onClick={() => navigate("/")}
            >
                Back to Home
            </Button>
        </Box>
    );
};

export default NotFound;

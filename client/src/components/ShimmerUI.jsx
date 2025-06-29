import React from 'react';
import { Box, Skeleton, useMediaQuery } from '@mui/material';
import Header from 'components/Header';

function ShimmerUI() {
    const isNonMobile = useMediaQuery("(min-width: 1000px)");
    const isTablet = useMediaQuery("(min-width: 768px)");

    const chartBoxHeight = isNonMobile ? 350 : isTablet ? 300 : 250;
    const donutSize = isNonMobile ? 320 : isTablet ? 280 : 250;

    return (
        <Box m={isNonMobile ? "1.5rem 2.5rem" : "1rem 1.5rem"}>
            <Header title="Account Industry" subTitle="Loading data..." />

            <Box display="flex" flexDirection="column" gap={3} mt={3}>
                <Box display="flex" flexDirection={isNonMobile ? "row" : "column"} gap={3}>
                    <Box
                        flex={isNonMobile ? "2" : "1"}
                        display="flex"
                        flexDirection="column"
                        gap={3}
                    >
                        <Skeleton variant="rectangular" width="100%" height={chartBoxHeight} />
                    </Box>

                    <Box
                        flex={isNonMobile ? "1" : "1"}
                        minWidth={isNonMobile ? "300px" : "100%"}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Skeleton variant="circular" width={donutSize} height={donutSize} />
                    </Box>
                </Box>

                <Box width="100%" mt={4}>
                    <Skeleton variant="text" width="40%" height={30} sx={{ mb: 1 }} />
                    <Skeleton variant="rectangular" width="100%" height={200} />
                </Box>
            </Box>
        </Box>
    );
}

export default ShimmerUI;

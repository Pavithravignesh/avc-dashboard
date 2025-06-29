import React from 'react';
import { useMediaQuery } from '@mui/material';
import { useGetAcvRangeQuery } from 'state/api';

function AcvRange() {
    const { data, isLoading } = useGetAcvRangeQuery();
    const isNonMobile = useMediaQuery("(min-width: 1000px)");
    // console.log("🚀 ~ AcvRange ~ data:", data);

    return (
        <div>
            AcvRange
        </div>
    )
}

export default AcvRange

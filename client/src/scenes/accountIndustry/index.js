import React from 'react'
import { useMediaQuery } from '@mui/material';
import { useGetAccountIndustryQuery } from 'state/api';

function AccountIndustry() {
    const { data, isLoading } = useGetAccountIndustryQuery();
    const isNonMobile = useMediaQuery("(min-width: 1000px)");
    // console.log("🚀 ~ AccountIndustry ~ data:", data);

    return (
        <div>
            AccountIndustry
        </div>
    )
}

export default AccountIndustry

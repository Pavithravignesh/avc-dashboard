import React from 'react'
import { useMediaQuery } from '@mui/material';
import { useGetTeamQuery } from 'state/api';

function Team() {
    const { data, isLoading } = useGetTeamQuery();
    const isNonMobile = useMediaQuery("(min-width: 1000px)");
    // console.log("🚀 ~ Team ~ data:", data);
    return (
        <div>
            Team
        </div>
    )
}

export default Team

import React from 'react'
import { useGetCustomerTypeQuery } from 'state/api'
import { Box, useMediaQuery } from "@mui/material";

function CustomerType() {
  const { data, isLoading } = useGetCustomerTypeQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  // console.log("🚀 ~ CustomerType ~ data:", data);

  return (
    <div>
      CustomerType
    </div>
  )
}

export default CustomerType

import React from 'react'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'
export default function Details({ pType, address }) {
    return address ? <Box mt={5}>

        <Typography fontWeight="bold">Address:{address}</Typography>
        <Typography fontWeight="bold">placeType:{pType}</Typography>
    </Box> : null
}

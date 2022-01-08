import React, { FC } from 'react'
import { Typography, Box, CircularProgress } from '@mui/material'

export const Loading: FC = () => {
    return (
        <Box>
            <Typography variant="h6" align="center">Loading data..</Typography>
            <Box sx={{ m: '0 auto', width: '3em', height: '2em' }} ><CircularProgress color='success' /></Box>
        </Box>
    )
}

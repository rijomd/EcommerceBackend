import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './component.css';

export const Loader = () => {
  return (
      <Box className="loader">
        <CircularProgress />
      </Box>
  )
}

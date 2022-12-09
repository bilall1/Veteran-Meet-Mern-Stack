import React from 'react'

import Sidebar from './Sidebar'
import EventMidSection from './EventMidSection'
import { Box, Stack } from '@mui/system'
import EventRightSide from './EventRightSide'
const Event = () => {
  return (
    <Box>
    
    <Stack direction="row" spacing={2} justifyContent="space-between">
    <Sidebar />
    <EventMidSection />
    <EventRightSide />
    </Stack>
    </Box>
    

  )
}

export default Event
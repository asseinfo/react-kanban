import { FC } from 'react'
import { Typography, Button, Box, IconButton } from '@mui/material'
import BoltIcon from '@mui/icons-material/Bolt'
import ScheduleIcon from '@mui/icons-material/Schedule'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

export const Header: FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant='h4'>Board</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton size='small'>
          <BoltIcon />
        </IconButton>
        <IconButton size='small'>
          <ScheduleIcon />
        </IconButton>
        <Typography sx={{ mr: '30px' }} variant='body1'>
          4 days remaining
        </Typography>
        <Button size='small' variant='contained'>
          Complete sprint
        </Button>
        <IconButton>
          <MoreHorizIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

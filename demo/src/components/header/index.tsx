import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import Icon from '@mui/icons-material/ViewKanban'

import { Links } from './Links'

export const Header = () => {
  return (
    <AppBar position='static'>
      <Toolbar disableGutters sx={{ padding: '0 20px' }}>
        <Icon sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }} />
        <Typography
          variant='h6'
          noWrap
          component='a'
          href='/'
          sx={{
            flexGrow: 1,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none'
          }}
        >
          React Kanban
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Links />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export * from './Links'

import { FC } from 'react'
import { Outlet, ReactLocation, Router } from '@tanstack/react-location'
import { Box } from '@mui/material'
import '@caldwell619/react-kanban/dist/styles.css'

import { ControlledBoardDemo } from '@/features/controlled'
import { UncontrolledBoardDemo } from '@/features/uncontrolled'
import { JiraDemo } from '@/features/jira'
import { NotionDemo } from '@/features/notion'
import { Header } from './components'

const location = new ReactLocation()

export const App: FC = () => {
  return (
    <Router
      location={location}
      basepath='/react-kanban'
      routes={[
        { path: '/', element: <Index /> },
        {
          path: 'controlled',
          element: <ControlledBoardDemo />
        },
        {
          path: 'uncontrolled',
          element: <UncontrolledBoardDemo />
        },
        {
          path: 'jira',
          element: <JiraDemo />
        },
        {
          path: 'notion',
          element: <NotionDemo />
        }
      ]}
    >
      <Header />
      <Box sx={{ padding: 3 }}>
        <Outlet /> {/* Start rendering router matches */}
      </Box>
    </Router>
  )
}

function Index() {
  return (
    <div>
      <h3>Welcome Home!</h3>
    </div>
  )
}

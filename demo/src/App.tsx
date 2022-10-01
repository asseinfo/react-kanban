import { FC } from 'react'
import { Typography, Box } from '@mui/material'
import { UncontrolledBoard } from '@caldwell619/react-kanban'
import '@caldwell619/react-kanban/dist/styles.css'

import { board } from './data'

const App: FC = () => {
  return (
    <Box>
      <Typography>Yo</Typography>
      {/* @ts-ignore */}
      <UncontrolledBoard
        initialBoard={board}
        // allowRemoveLane
        allowRenameColumn
        allowRemoveCard
        // onLaneRemove={console.log}
        onCardRemove={console.log}
        // onLaneRename={console.log}
        allowAddCard={{ on: 'top' }}
        onNewCardConfirm={async draftCard => ({
          id: new Date().getTime(),
          ...draftCard
        })}
        onCardNew={console.log}
      />
    </Box>
  )
}

export default App

import { FC } from 'react'
import { UncontrolledBoard, UncontrolledBoardProps } from '@caldwell619/react-kanban'
import { Card, CardContent, CardHeader, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Close'

import { board } from '@/data'
import { Source } from '@/components'

export const CustomElementsBoardDemo: FC = () => {
  return (
    <>
      <Source title='Custom Elements' url='/' />
      <UncontrolledBoard initialBoard={board} renderCard={renderCard} />
    </>
  )
}

const renderCard: UncontrolledBoardProps['renderCard'] = card => {
  return (
    <Card>
      <CardHeader
        title={card.title}
        action={
          <IconButton size='small'>
            <DeleteIcon />
          </IconButton>
        }
      />
      <CardContent>{card.description}</CardContent>
    </Card>
  )
}
// TODO: Notion and Jira clone

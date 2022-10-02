import { FC } from 'react'
import { UncontrolledBoard } from '@caldwell619/react-kanban'
import { Divider } from '@mui/material'

import { board, CustomCard } from '@/data'
import { Source } from '@/components'
import { Filters, renderCard, Header } from './components'

export const JiraDemo: FC = () => {
  return (
    <>
      <Source title='Custom Elements' url='/' />
      <Divider sx={{ marginBottom: 5 }} />
      <Header />
      <Filters />

      <UncontrolledBoard<CustomCard> initialBoard={board} renderCard={renderCard} />
    </>
  )
}

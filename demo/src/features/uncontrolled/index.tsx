import { FC } from 'react'
import { UncontrolledBoard } from '@caldwell619/react-kanban'

import { board } from '@/data'
import { Source } from '@/components'

export const UncontrolledBoardDemo: FC = () => {
  return (
    <>
      <Source title='Uncontrolled' url='/' />
      <UncontrolledBoard initialBoard={board} />
    </>
  )
}

// TODO: use form to control props

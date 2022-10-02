import { FC } from 'react'
import { UncontrolledBoard } from '@caldwell619/react-kanban'

import { board } from '@/data'
import { Source } from '@/components'

export const NotionDemo: FC = () => {
  return (
    <>
      <Source title='Custom Elements' url='/' />
      <UncontrolledBoard initialBoard={board} />
    </>
  )
}

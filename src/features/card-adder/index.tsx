import { FC, useState } from 'react'

import { Card, Column } from '@/types'
import { CardForm } from './components'

export const CardAdder: FC<Props> = ({ column, onConfirm }) => {
  function confirmCard(card: Card) {
    onConfirm(column, card)
    setAddingCard(false)
  }

  const [addingCard, setAddingCard] = useState(false)

  return (
    <>
      {addingCard ? (
        <CardForm onConfirm={confirmCard} onCancel={() => setAddingCard(false)} />
      ) : (
        <button className='react-kanban-card-adder-button' onClick={() => setAddingCard(!addingCard)}>
          +
        </button>
      )}
    </>
  )
}

type OnConfirm = (column: Column, card: Card) => void

interface Props {
  column: Column
  onConfirm: OnConfirm
}

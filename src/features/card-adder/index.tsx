import { useState } from 'react'

import { Card, Column } from '@/types'
import { CardForm } from './components'

export const CardAdder = function <TCard extends Card>({ column, onConfirm }: Props<TCard>) {
  function confirmCard(card: TCard) {
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

interface Props<TCard extends Card> {
  column: Column<TCard>
  onConfirm: (column: Column<TCard>, card: TCard) => void
}

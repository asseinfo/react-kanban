import { useState } from 'react'
import CardForm from './components/CardForm'

export default function CardAdder({ column, onConfirm, disableCardTitle }) {
  function confirmCard(card) {
    onConfirm(column, card)
    setAddingCard(false)
  }

  const [addingCard, setAddingCard] = useState(false)

  return (
    <>
      {addingCard ? (
        <CardForm onConfirm={confirmCard} onCancel={() => setAddingCard(false)} disableCardTitle={disableCardTitle} />
      ) : (
        <button className='react-kanban-card-adder-button' onClick={() => setAddingCard(!addingCard)}>
          +
        </button>
      )}
    </>
  )
}

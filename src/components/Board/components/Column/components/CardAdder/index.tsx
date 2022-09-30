import { useState } from 'react'
import CardForm from './components/CardForm'

// @ts-expect-error TS(7031) FIXME: Binding element 'column' implicitly has an 'any' t... Remove this comment to see the full error message
export default function CardAdder({ column, onConfirm }) {
  // @ts-expect-error TS(7006) FIXME: Parameter 'card' implicitly has an 'any' type.
  function confirmCard(card) {
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

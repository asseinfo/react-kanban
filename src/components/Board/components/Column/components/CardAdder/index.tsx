import { useState } from 'react'
import CardForm from './components/CardForm'

export default function CardAdder({ column, onConfirm }) {
  function confirmCard(card) {
    onConfirm(column, card)
    setAddingCard(false)
  }

  const [addingCard, setAddingCard] = useState(false)

  return (
    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
    <>
      {addingCard ? (
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <CardForm onConfirm={confirmCard} onCancel={() => setAddingCard(false)} />
      ) : (
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <button className='react-kanban-card-adder-button' onClick={() => setAddingCard(!addingCard)}>
          +
        </button>
      )}
    </>
  )
}

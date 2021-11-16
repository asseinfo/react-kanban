import EditIcon from '../../../../../assets/editIcon'
import { useState } from 'react'
import CardForm from '../Column/components/CardAdder/components/CardForm'

export default function ({ children: card, dragging, allowRemoveCard, onCardRemove, allowEditCard, onCardEdit }) {
  const [edit, setEdit] = useState(false)

  const confirmCard = () => {}

  return !edit ? (
    <div className={`react-kanban-card ${dragging ? 'react-kanban-card--dragging' : ''}`}>
      <span>
        <div className='react-kanban-card__title'>
          <span>{card.title}</span>
          <div>
            {allowEditCard && (
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setEdit(true)
                  onCardEdit(card)
                }}
              >
                {EditIcon()}
              </span>
            )}
            {allowRemoveCard && (
              <span style={{ cursor: 'pointer' }} onClick={() => onCardRemove(card)}>
                ×
              </span>
            )}
          </div>
        </div>
      </span>
      <div className='react-kanban-card__description'>{card.description}</div>
    </div>
  ) : (
    <CardForm onConfirm={confirmCard} onCancel={() => setEdit(false)} />
  )
}

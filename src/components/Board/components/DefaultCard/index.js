import EditIcon from '../../../../../assets/editIcon'
import { useState } from 'react'
import CardForm from '../Column/components/CardAdder/components/CardForm'

export default function ({
  children: card,
  dragging,
  allowRemoveCard,
  onCardRemove,
  allowEditCard,
  onCardEdit,
  disableCardTitle,
}) {
  const [edit, setEdit] = useState(false)
  const [initialTitle, setInitialTitle] = useState(card.title)
  const [initialDescription, setInitialDescription] = useState(card.description)

  const confirmCard = (column) => {
    onCardEdit(card, column.title, column.description)
    setInitialTitle(column.title)
    setInitialDescription(column.description)
    setEdit(false)
  }

  const renderEditIcon = () =>
    allowEditCard && (
      <span
        style={{ cursor: 'pointer' }}
        onClick={() => {
          setEdit(true)
        }}
      >
        {EditIcon()}
      </span>
    )

  const renderCloseIcon = () =>
    allowRemoveCard && (
      <span style={{ cursor: 'pointer' }} onClick={() => onCardRemove(card)}>
        ×
      </span>
    )

  return !edit ? (
    <div onClick={() => setEdit(true)} className={`react-kanban-card ${dragging ? 'react-kanban-card--dragging' : ''}`}>
      {!disableCardTitle && (
        <span>
          <div className='react-kanban-card__title'>
            <span>{card.title}</span>
            <div>
              {renderEditIcon()}
              {renderCloseIcon()}
            </div>
          </div>
        </span>
      )}
      <div
        className={
          disableCardTitle ? 'react-kanban-card__description-title__disabled' : 'react-kanban-card__description'
        }
      >
        <span>{card.description}</span>
        {disableCardTitle && (
          <div>
            {renderEditIcon()} {renderCloseIcon()}
          </div>
        )}
      </div>
    </div>
  ) : (
    <CardForm
      onConfirm={confirmCard}
      onCancel={() => setEdit(false)}
      initialValue={{ title: initialTitle, description: initialDescription }}
      isEdit={edit}
      disableCardTitle={disableCardTitle}
    />
  )
}

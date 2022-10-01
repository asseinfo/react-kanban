import { FC } from 'react'

import { Card } from '@/types'

export const DefaultCard: FC<Props> = ({ children: card, dragging, allowRemoveCard, onCardRemove }) => {
  return (
    <div className={`react-kanban-card ${dragging ? 'react-kanban-card--dragging' : ''}`}>
      <span>
        <div className='react-kanban-card__title'>
          <span>{card.title}</span>
          {allowRemoveCard && (
            <span style={{ cursor: 'pointer' }} onClick={() => onCardRemove(card)}>
              ×
            </span>
          )}
        </div>
      </span>
      <div className='react-kanban-card__description'>{card.description}</div>
    </div>
  )
}

type OnCardRemove = (card: Card) => void
interface Props {
  children: Card
  dragging: boolean
  allowRemoveCard: boolean
  onCardRemove: OnCardRemove
}

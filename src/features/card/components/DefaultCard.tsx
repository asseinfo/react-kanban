import { Card } from '@/types'

export const DefaultCard = function <TCard extends Card>({
  children: card,
  dragging,
  allowRemoveCard,
  onCardRemove,
}: Props<TCard>) {
  return (
    <div className={`react-kanban-card ${dragging ? 'react-kanban-card--dragging' : ''}`}>
      <span>
        <div className='react-kanban-card__title'>
          <span>{card.title}</span>
          {allowRemoveCard && (
            <span style={{ cursor: 'pointer' }} onClick={onCardRemove ? () => onCardRemove(card) : undefined}>
              X
            </span>
          )}
        </div>
      </span>
      <div className='react-kanban-card__description'>{card.description}</div>
    </div>
  )
}

interface Props<TCard extends Card> {
  children: TCard
  dragging: boolean
  allowRemoveCard: boolean
  onCardRemove?: (card: TCard) => void
}

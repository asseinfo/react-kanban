import { FC } from 'react'
import { Draggable } from 'react-beautiful-dnd'

import { Card as CardType, RenderCard } from '@/types'

export const Card: FC<Props> = ({ children: card, index, renderCard, disableCardDrag }) => {
  return (
    <Draggable draggableId={String(card.id)} index={index} isDragDisabled={disableCardDrag}>
      {(provided, { isDragging }) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            data-testid={`card-${card.id}`}
          >
            <div style={{ display: 'inline-block', whiteSpace: 'normal' }}>{renderCard(isDragging)}</div>
          </div>
        )
      }}
    </Draggable>
  )
}

interface Props {
  children: CardType
  index: number
  renderCard: RenderCard
  disableCardDrag: boolean
}

export * from './components'

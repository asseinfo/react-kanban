import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import Card from './components/Card'
import CardSkeleton from '../CardSkeleton'
import withDroppable from '../../../withDroppable'
import CardAdder from './components/CardAdder'

export const StyledColumn = styled.div`
  height: 100%;
  min-height: 28px;
  display: inline-block;
  padding: 15px;
  border-radius: 2px;
  background-color: #eee;
  margin: 5px;
  vertical-align: top;
`

const DroppableColumn = withDroppable(styled.div`
  height: inherit;
  min-height: inherit;
`)

function Column({
  children,
  index: columnIndex,
  renderCard,
  renderColumnHeader,
  disableColumnDrag,
  disableCardDrag,
  onCardNew,
  allowAddCard,
}) {
  return (
    <Draggable draggableId={`column-draggable-${children.id}`} index={columnIndex} isDragDisabled={disableColumnDrag}>
      {(columnProvided) => (
        <StyledColumn
          ref={columnProvided.innerRef}
          {...columnProvided.draggableProps}
          data-testid={`column-${children.id}`}
        >
          <div {...columnProvided.dragHandleProps} data-testid={`column-header-${children.id}`}>
            {renderColumnHeader(children)}
          </div>
          {allowAddCard && <CardAdder column={children} onConfirm={onCardNew} />}
          <DroppableColumn droppableId={String(children.id)}>
            {children.cards.length ? (
              children.cards.map((card, index) => (
                <Card
                  key={card.id}
                  index={index}
                  renderCard={(dragging) => renderCard(children, card, dragging)}
                  disableCardDrag={disableCardDrag}
                >
                  {card}
                </Card>
              ))
            ) : (
              <CardSkeleton />
            )}
          </DroppableColumn>
        </StyledColumn>
      )}
    </Draggable>
  )
}

export default Column

import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import Card from './components/Card'
import CardSkeleton from '../CardSkeleton'
import withDroppable from '../../../withDroppable'
import CardAdder from './components/CardAdder'

export const StyledColumn = styled.div`
  height: 100%;
  display: inline-block;
  padding: 15px;
  border-radius: 2px;
  background-color: #eee;
  margin: 5px;
  vertical-align: top;
`

const DroppableColumn = withDroppable(styled.div`
  min-height: 28px;
`)

function Column({
  children,
  index: columnIndex,
  renderCard,
  renderColumnHeader,
  disableColumnDrag,
  disableCardDrag,
  onCardAdd,
  allowAddCard
}) {
  return (
    <Draggable draggableId={`column-draggable-${children.id}`} index={columnIndex} isDragDisabled={disableColumnDrag}>
      {columnProvided => (
        <StyledColumn ref={columnProvided.innerRef} {...columnProvided.draggableProps} data-testid='column'>
          <div {...columnProvided.dragHandleProps} data-testid='column-header'>
            {renderColumnHeader(children)}
          </div>
          {allowAddCard && <CardAdder column={children} onConfirm={onCardAdd} />}
          <DroppableColumn droppableId={String(children.id)}>
            {children.cards.length ? (
              children.cards.map((card, index) => (
                <Card
                  key={card.id}
                  index={index}
                  renderCard={dragging => renderCard(children, card, dragging)}
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

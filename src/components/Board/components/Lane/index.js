import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import DefaultCard from './components/DefaultCard'
import Card, { CardSkeleton } from './components/Card'
import withDroppable from '../../../withDroppable'

export const StyledLane = styled.div`
  height: 100%;
  display: inline-block;
  padding: 15px;
  border-radius: 2px;
  background-color: #eee;
  margin: 5px;
  vertical-align: top;
`

const DroppableLane = withDroppable('div')

function Lane ({
  children,
  index: laneIndex,
  renderCard,
  renderLaneHeader,
  disableLaneDrag,
  disableCardDrag,
  allowRemoveCard,
  onCardRemove
}) {
  return (
    <Draggable draggableId={`lane-draggable-${children.id}`} index={laneIndex} isDragDisabled={disableLaneDrag}>
      {laneProvided => (
        <StyledLane ref={laneProvided.innerRef} {...laneProvided.draggableProps} data-testid='lane'>
          <div {...laneProvided.dragHandleProps} data-testid='lane-header'>
            {renderLaneHeader}
          </div>
          <DroppableLane droppableId={String(children.id)}>
            {children.cards.length ? (
              children.cards.map((card, index) => (
                <Card
                  key={card.id}
                  index={index}
                  renderCard={dragging => (
                    renderCard ? (
                      renderCard(card, dragging)
                    ) : (
                      <DefaultCard
                        dragging={dragging}
                        allowRemoveCard={allowRemoveCard}
                        onCardRemove={onCardRemove}
                      >
                        {card}
                      </DefaultCard>
                    )
                  )}
                  disableCardDrag={disableCardDrag}
                >
                  {card}
                </Card>
              ))
            ) : (
              <CardSkeleton />
            )}
          </DroppableLane>
        </StyledLane>
      )}
    </Draggable>
  )
}

export default Lane

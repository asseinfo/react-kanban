import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import Card from './components/Card'
import CardSkeleton from '../CardSkeleton'
import withDroppable from '../../../withDroppable'

export const StyledLane = styled.div`
  height: 100%;
  display: inline-block;
  border-radius: 2px;
  vertical-align: top;
  overflow-y: auto;
`
const LaneWrapper = styled.div`
  height: auto;
  margin: 5px;
  padding: 15px;
  background-color: #eee;
`

const DroppableLane = withDroppable(styled.div`
  min-height: 28px;
`)

function Lane ({
  children,
  index: laneIndex,
  renderCard,
  renderLaneHeader,
  disableLaneDrag,
  disableCardDrag
}) {
  return (
    <Draggable draggableId={`lane-draggable-${children.id}`} index={laneIndex} isDragDisabled={disableLaneDrag}>
      {laneProvided => (
        <StyledLane ref={laneProvided.innerRef} {...laneProvided.draggableProps} data-testid='lane'>
          <LaneWrapper>
            <div {...laneProvided.dragHandleProps} data-testid='lane-header'>
              {renderLaneHeader}
            </div>
            <DroppableLane droppableId={String(children.id)}>
              {children.cards.length ? (
                children.cards.map((card, index) => (
                  <Card
                    key={card.id}
                    index={index}
                    renderCard={dragging => renderCard(card, dragging)}
                    disableCardDrag={disableCardDrag}
                  >
                    {card}
                  </Card>
                ))
              ) : (
                <CardSkeleton />
              )}
            </DroppableLane>
          </LaneWrapper>
        </StyledLane>
      )}
    </Draggable>
  )
}

export default Lane

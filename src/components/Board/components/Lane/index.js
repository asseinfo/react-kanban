import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import Card, { CardSkeleton } from './components/Card'
import withDroppable from '../../../withDroppable'

const StyledLane = styled.div`
  height: 100%;
  padding: 15px;
  border-radius: 2px;
  background-color: #eee;
  margin: 5px;
`

const LaneTitle = styled.div`
  padding-left: 10px;
  padding-bottom: 10px;
  font-weight: bold;
`
const DroppableLane = withDroppable('div')

function Lane ({ children, index: laneIndex, renderCard }) {
  return (
    <Draggable draggableId={`lane-draggable-${children.id}`} index={laneIndex}>
      {laneProvided => (
        <StyledLane ref={laneProvided.innerRef} {...laneProvided.draggableProps} data-testid='lane'>
          <LaneTitle {...laneProvided.dragHandleProps}>{children.title}</LaneTitle>
          <DroppableLane droppableId={String(children.id)}>
            {children.cards.length
              ? children.cards.map((card, index) => (<Card key={card.id} index={index} renderCard={renderCard}>{card}</Card>))
              : <CardSkeleton />
            }
          </DroppableLane>
        </StyledLane>
      )}
    </Draggable>
  )
}

export default Lane

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

const DefaultLaneHeader = styled.div`
  padding-left: 10px;
  padding-bottom: 10px;
  font-weight: bold;
`
const DroppableLane = withDroppable('div')

function Lane ({ children, index: laneIndex, renderCard, renderLaneHeader }) {
  return (
    <Draggable draggableId={`lane-draggable-${children.id}`} index={laneIndex}>
      {laneProvided => (
        <StyledLane ref={laneProvided.innerRef} {...laneProvided.draggableProps} data-testid='lane'>
          <div {...laneProvided.dragHandleProps} data-testid='lane-header'>
            {renderLaneHeader
              ? renderLaneHeader(children)
              : <DefaultLaneHeader>{children.title}</DefaultLaneHeader>
            }
          </div>
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

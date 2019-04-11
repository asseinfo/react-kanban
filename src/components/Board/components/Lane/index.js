import React from 'react'
import styled from 'styled-components'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import Card from './components/Card'

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

function Lane ({ children, index }) {
  return (
    <Draggable draggableId={`lane-draggable-${children.id}`} index={index}>
      {laneProvided => (
        <StyledLane ref={laneProvided.innerRef} {...laneProvided.draggableProps} >
          <LaneTitle {...laneProvided.dragHandleProps}>{children.title}</LaneTitle>
          <Droppable droppableId={String(children.id)}>
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {children.cards.map((card, idx) => (<Card key={card.id} index={idx}>{card}</Card>))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </StyledLane>
      )}
    </Draggable>
  )
}

export default Lane

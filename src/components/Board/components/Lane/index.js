import React from 'react'
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd'
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

function Lane ({ children }) {
  return (
    <Droppable droppableId={String(children.id)}>
      {provided => (
        <StyledLane
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <LaneTitle>{children.title}</LaneTitle>
          {children.cards.map((card, idx) => (<Card key={card.id} index={idx}>{card}</Card>))}
          {provided.placeholder}
        </StyledLane>
      )}
    </Droppable>
  )
}

export default Lane

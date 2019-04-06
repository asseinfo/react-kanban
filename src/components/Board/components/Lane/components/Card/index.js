import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

const StyledCard = styled.div`
  border-radius: 3px;
  background-color: #fff;
  padding: 10px;
  margin-bottom: 7px;
  max-width: 250px;
  min-width: 230px;

  ${({ dragging }) => dragging && `
    box-shadow: 2px 2px grey;
  `}
`

const CardTitle = styled.div`
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
  font-weight: bold
`

const CardDescription = styled.div`
  padding-top: 10px;
`

function Card ({ children, index }) {
  return (
    <Draggable draggableId={String(children.id)} index={index}>
      {(provided, snapshot) => {
        return (
          <StyledCard
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            dragging={snapshot.isDragging}
          >
            <CardTitle>{children.title}</CardTitle>
            <CardDescription>{children.description}</CardDescription>
          </StyledCard>
        )
      }}
    </Draggable>
  )
}

export default Card

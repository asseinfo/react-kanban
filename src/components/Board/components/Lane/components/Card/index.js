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
`

const DraggingCard = styled(StyledCard)`
  box-shadow: 2px 2px grey;
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
        const Card = snapshot.isDragging ? DraggingCard : StyledCard
        return (
          <Card
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <CardTitle>{children.title}</CardTitle>
            <CardDescription>{children.description}</CardDescription>
          </Card>
        )
      }}
    </Draggable>
  )
}

export default Card

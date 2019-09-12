import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

const CardContent = styled.div`
  display: inline-block;
`

function Card ({ children, index, renderCard, disableCardDrag }) {
  return (
    <Draggable draggableId={String(children.id)} index={index} isDragDisabled={disableCardDrag}>
      {(provided, { isDragging }) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            data-testid='card'
          >
            <CardContent>
              {renderCard(isDragging)}
            </CardContent>
          </div>
        )
      }}
    </Draggable>
  )
}

export default Card

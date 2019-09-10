import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import CardSkeleton from '../../../CardSkeleton'

const DraggableCard = styled(CardSkeleton)`
  border-radius: 3px;
  background-color: #fff;

  ${({ dragging }) => dragging && `
    box-shadow: 2px 2px grey;
  `}
`

function Card ({ children, index, renderCard, disableCardDrag }) {
  return (
    <Draggable draggableId={String(children.id)} index={index} isDragDisabled={disableCardDrag}>
      {(provided, { isDragging }) => {
        return (
          <DraggableCard
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            data-testid='card'
            dragging={isDragging}
          >
            {renderCard(isDragging)}
          </DraggableCard>
        )
      }}
    </Draggable>
  )
}

export default Card

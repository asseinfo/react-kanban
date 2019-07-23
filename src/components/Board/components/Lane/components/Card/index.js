import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

export const CardSkeleton = styled.div`
   max-width: 250px;
   min-width: 230px;
   padding: 10px;
   margin-bottom: 7px;
 `

const DefaultCard = styled(CardSkeleton)`
  border-radius: 3px;
  background-color: #fff;

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

function Card ({ children, index, renderCard, disableCardDrag }) {
  return (
    <Draggable draggableId={String(children.id)} index={index} isDragDisabled={disableCardDrag}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            data-testid='card'
          >
            {renderCard
              ? renderCard(children, snapshot.isDragging)
              : (
                <DefaultCard dragging={snapshot.isDragging}>
                  <CardTitle>{children.title}</CardTitle>
                  <CardDescription>{children.description}</CardDescription>
                </DefaultCard>
              )
            }
          </div>
        )
      }}
    </Draggable>
  )
}

export default Card

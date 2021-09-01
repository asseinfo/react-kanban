import { Draggable } from 'react-beautiful-dnd'

function Card({ children, index, renderCard, disableCardDrag }) {
  return (
    <Draggable draggableId={String(children.id)} index={index} isDragDisabled={disableCardDrag}>
      {(provided, { isDragging }) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            data-testid={`card-${children.id}`}
          >
            <div className="react-kanban-card-container">{renderCard(isDragging)}</div>
          </div>
        )
      }}
    </Draggable>
  )
}

export default Card

import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import Card from './components/Card'
import withDroppable from '../../../withDroppable'

const ColumnEmptyPlaceholder = React.forwardRef((props, ref) => (
  <div ref={ref} style={{ minHeight: '28px' }} {...props} />
))

const DroppableColumn = withDroppable(ColumnEmptyPlaceholder)

function Column({ children, index: columnIndex, renderCard, renderColumnHeader, disableColumnDrag, disableCardDrag }) {
  return (
    <Draggable draggableId={`column-draggable-${children.id}`} index={columnIndex} isDragDisabled={disableColumnDrag}>
      {columnProvided => (
        <div
          ref={columnProvided.innerRef}
          {...columnProvided.draggableProps}
          style={{ height: '100%', display: 'inline-block', verticalAlign: 'top' }}
          className='react-kanban-column'
          data-testid='column'
        >
          <div {...columnProvided.dragHandleProps} data-testid='column-header'>
            {renderColumnHeader(children)}
          </div>
          <DroppableColumn droppableId={String(children.id)}>
            {children.cards.length ? (
              children.cards.map((card, index) => (
                <Card
                  key={card.id}
                  index={index}
                  renderCard={dragging => renderCard(children, card, dragging)}
                  disableCardDrag={disableCardDrag}
                >
                  {card}
                </Card>
              ))
            ) : (
              <div className='react-kanban-card-skeleton' />
            )}
          </DroppableColumn>
        </div>
      )}
    </Draggable>
  )
}

export default Column

import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import Card from './components/Card'
import withDroppable from '../../../withDroppable'
import CardAdder from './components/CardAdder'
import style from './style.scss'

const ColumnEmptyPlaceholder = React.forwardRef((props, ref) => (
  <div ref={ref} style={{ minHeight: '28px' }} {...props} />
))

const DroppableColumn = withDroppable(ColumnEmptyPlaceholder)

function Column({
  children,
  index: columnIndex,
  renderCard,
  renderColumnHeader,
  disableColumnDrag,
  disableCardDrag,
  onCardNew,
  allowAddCard
}) {
  return (
    <Draggable draggableId={`column-draggable-${children.id}`} index={columnIndex} isDragDisabled={disableColumnDrag}>
      {columnProvided => (
        <div
          ref={columnProvided.innerRef}
          {...columnProvided.draggableProps}
          className={`${style.column} react-kanban-column`}
          data-testid='column'
        >
          <div {...columnProvided.dragHandleProps} data-testid='column-header'>
            {renderColumnHeader(children)}
          </div>
          {allowAddCard && <CardAdder column={children} onConfirm={onCardNew} />}
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

import { forwardRef } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import Card from './components/Card'
import withDroppable from '../../../withDroppable'
import CardAdder from './components/CardAdder'
import { pickPropOut } from '@services/utils'

const ColumnEmptyPlaceholder = forwardRef((props, ref) => (
  // @ts-expect-error TS(2686) FIXME: 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
  <div ref={ref} style={{ minHeight: 'inherit', height: 'inherit' }} {...props} />
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
  allowAddCard,
}) {
  return (
    // @ts-expect-error TS(2686) FIXME: 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
    <Draggable draggableId={`column-draggable-${children.id}`} index={columnIndex} isDragDisabled={disableColumnDrag}>
      {(columnProvided) => {
        const draggablePropsWithoutStyle = pickPropOut(columnProvided.draggableProps, 'style')

        return (
          // @ts-expect-error TS(2686) FIXME: 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <div
            ref={columnProvided.innerRef}
            {...draggablePropsWithoutStyle}
            style={{
              height: '100%',
              minHeight: '28px',
              display: 'inline-block',
              verticalAlign: 'top',
              ...columnProvided.draggableProps.style,
            }}
            className='react-kanban-column'
            data-testid={`column-${children.id}`}
          >
            {/* @ts-expect-error TS(2686) FIXME: 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message */}
            <div {...columnProvided.dragHandleProps}>{renderColumnHeader(children)}</div>
            {/* @ts-expect-error TS(2686) FIXME: 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message */}
            {allowAddCard && <CardAdder column={children} onConfirm={onCardNew} />}
            {/* @ts-expect-error TS(2604) FIXME: JSX element type 'DroppableColumn' does not have a... Remove this comment to see the full error message */}
            <DroppableColumn droppableId={String(children.id)}>
              {children.cards.length ? (
                children.cards.map((card, index) => (
                  // @ts-expect-error TS(2686) FIXME: 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                  <Card
                    key={card.id}
                    index={index}
                    renderCard={(dragging) => renderCard(children, card, dragging)}
                    disableCardDrag={disableCardDrag}
                  >
                    {card}
                  </Card>
                ))
              ) : (
                // @ts-expect-error TS(2686) FIXME: 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                <div className='react-kanban-card-skeleton' />
              )}
            </DroppableColumn>
          </div>
        )
      }}
    </Draggable>
  )
}

export default Column

import { forwardRef } from 'react'
// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Draggable } from 'react-beautiful-dnd'
import Card from './components/Card'
import withDroppable from '../../../withDroppable'
import CardAdder from './components/CardAdder'
import { pickPropOut } from '@services/utils'

const ColumnEmptyPlaceholder = forwardRef((props, ref) => (
  // @ts-expect-error TS(2322) FIXME: Type 'ForwardedRef<unknown>' is not assignable to ... Remove this comment to see the full error message
  <div ref={ref} style={{ minHeight: 'inherit', height: 'inherit' }} {...props} />
))

const DroppableColumn = withDroppable(ColumnEmptyPlaceholder)

function Column({
  // @ts-expect-error TS(7031) FIXME: Binding element 'children' implicitly has an 'any'... Remove this comment to see the full error message
  children,
  // @ts-expect-error TS(7031) FIXME: Binding element 'columnIndex' implicitly has an 'a... Remove this comment to see the full error message
  index: columnIndex,
  // @ts-expect-error TS(7031) FIXME: Binding element 'renderCard' implicitly has an 'an... Remove this comment to see the full error message
  renderCard,
  // @ts-expect-error TS(7031) FIXME: Binding element 'renderColumnHeader' implicitly ha... Remove this comment to see the full error message
  renderColumnHeader,
  // @ts-expect-error TS(7031) FIXME: Binding element 'disableColumnDrag' implicitly has... Remove this comment to see the full error message
  disableColumnDrag,
  // @ts-expect-error TS(7031) FIXME: Binding element 'disableCardDrag' implicitly has a... Remove this comment to see the full error message
  disableCardDrag,
  // @ts-expect-error TS(7031) FIXME: Binding element 'onCardNew' implicitly has an 'any... Remove this comment to see the full error message
  onCardNew,
  // @ts-expect-error TS(7031) FIXME: Binding element 'allowAddCard' implicitly has an '... Remove this comment to see the full error message
  allowAddCard,
}) {
  return (
    <Draggable draggableId={`column-draggable-${children.id}`} index={columnIndex} isDragDisabled={disableColumnDrag}>
      {/* @ts-expect-error TS(7006) FIXME: Parameter 'columnProvided' implicitly has an 'any'... Remove this comment to see the full error message */}
      {(columnProvided) => {
        const draggablePropsWithoutStyle = pickPropOut(columnProvided.draggableProps, 'style')

        return (
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
            <div {...columnProvided.dragHandleProps}>{renderColumnHeader(children)}</div>
            {allowAddCard && <CardAdder column={children} onConfirm={onCardNew} />}
            {/* @ts-expect-error TS(2604) FIXME: JSX element type 'DroppableColumn' does not have a... Remove this comment to see the full error message */}
            <DroppableColumn droppableId={String(children.id)}>
              {children.cards.length ? (
                // @ts-expect-error TS(7006) FIXME: Parameter 'card' implicitly has an 'any' type.
                children.cards.map((card, index) => (
                  // @ts-expect-error TS(2786) FIXME: 'Card' cannot be used as a JSX component.
                  <Card
                    key={card.id}
                    index={index}
                    // @ts-expect-error TS(7006) FIXME: Parameter 'dragging' implicitly has an 'any' type.
                    renderCard={(dragging) => renderCard(children, card, dragging)}
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
        )
      }}
    </Draggable>
  )
}

export default Column

import { FC, forwardRef } from 'react'
import { Draggable } from 'react-beautiful-dnd'

import { Card } from '../card'
import { withDroppable } from '../with-droppable'
import { CardAdder } from '../card-adder'
import { pickPropOut } from '@services/utils'
import { Column as ColumnType, Card as CardType } from '@/types'

const ColumnEmptyPlaceholder = forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref} style={{ minHeight: 'inherit', height: 'inherit' }} {...props} />
))

const DroppableColumn = withDroppable(ColumnEmptyPlaceholder)

export const Column: FC<Props> = ({
  children: column,
  index: columnIndex,
  renderCard,
  renderColumnHeader,
  disableColumnDrag,
  disableCardDrag,
  onCardNew,
  allowAddCard,
}) => {
  return (
    <Draggable draggableId={`column-draggable-${column.id}`} index={columnIndex} isDragDisabled={disableColumnDrag}>
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
            data-testid={`column-${column.id}`}
          >
            <div {...columnProvided.dragHandleProps}>{renderColumnHeader(column)}</div>
            {allowAddCard && <CardAdder column={column} onConfirm={onCardNew} />}
            <DroppableColumn droppableId={String(column.id)}>
              {column.cards.length ? (
                column.cards.map((card, index) => (
                  <Card
                    key={card.id}
                    index={index}
                    renderCard={(dragging: any) => renderCard(column, card, dragging)}
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

export type RenderColumnHeader = (column: ColumnType) => JSX.Element
export type RenderCard = (column: ColumnType, card: CardType, dragging: boolean) => JSX.Element
interface Props {
  children: ColumnType
  index: number
  renderCard: RenderCard
  renderColumnHeader: RenderColumnHeader
  disableColumnDrag: boolean
  disableCardDrag: boolean
  onCardNew: (column: ColumnType, card: CardType) => void | Promise<void>
  allowAddCard: boolean | { on: 'top' | 'bottom' }
}

export * from './components'

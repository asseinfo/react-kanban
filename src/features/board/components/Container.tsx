import { FC, forwardRef } from 'react'
import { DragDropContext, DragDropContextProps } from 'react-beautiful-dnd'

import { Column } from '@/features/column'
import { DefaultColumn } from '@/features/column'
import {
  getCard,
  getCoordinates,
  isAColumnMove,
  isMovingAColumnToAnotherPosition,
  isMovingACardToAnotherPosition,
  Coordinates,
} from '@/services/board'
import { withDroppable } from '@/features/with-droppable'
import { RenderCard } from '@/features/column'
import { Card, Column as ColumnType, KanbanBoard } from '@/types'

const Columns = forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref} style={{ whiteSpace: 'nowrap' }} {...props} />
))
const DroppableBoard = withDroppable(Columns)

export const BoardContainer: FC<Props> = ({
  children: board,
  renderCard,
  disableColumnDrag,
  disableCardDrag,
  renderColumnHeader,
  renderColumnAdder,
  allowRemoveColumn,
  onColumnRemove,
  allowRenameColumn,
  onColumnRename,
  onColumnDragEnd,
  onCardDragEnd,
  onCardNew,
  allowAddCard,
}) => {
  const handleOnDragEnd: DragDropContextProps['onDragEnd'] = (event) => {
    const coordinates = getCoordinates(event, board)
    if (!coordinates.source) return

    isAColumnMove(event.type)
      ? isMovingAColumnToAnotherPosition(coordinates) &&
        onColumnDragEnd({ ...coordinates, subject: board.columns[coordinates.source.fromPosition] })
      : isMovingACardToAnotherPosition(coordinates) &&
        onCardDragEnd({ ...coordinates, subject: getCard(board, coordinates.source) })
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div style={{ overflowY: 'hidden', display: 'flex', alignItems: 'flex-start' }} className='react-kanban-board'>
        <DroppableBoard droppableId='board-droppable' direction='horizontal' type='BOARD'>
          {board.columns.map((column, index) => (
            <Column
              key={column.id}
              index={index}
              renderCard={renderCard}
              renderColumnHeader={(column) =>
                renderColumnHeader ? (
                  renderColumnHeader(column)
                ) : (
                  <DefaultColumn
                    allowRemoveColumn={!!allowRemoveColumn}
                    onColumnRemove={onColumnRemove}
                    allowRenameColumn={!!allowRenameColumn}
                    onColumnRename={onColumnRename}
                  >
                    {column}
                  </DefaultColumn>
                )
              }
              disableColumnDrag={!!disableColumnDrag}
              disableCardDrag={!!disableCardDrag}
              onCardNew={onCardNew}
              allowAddCard={!!allowAddCard}
            >
              {column}
            </Column>
          ))}
        </DroppableBoard>
        {renderColumnAdder()}
      </div>
    </DragDropContext>
  )
}

export interface OnDragEnd<TSubject> extends Partial<Coordinates> {
  subject: TSubject
}
interface Props {
  children: KanbanBoard
  renderCard: RenderCard
  disableColumnDrag: boolean
  disableCardDrag: boolean
  renderColumnHeader: (column: ColumnType) => JSX.Element
  renderColumnAdder: () => JSX.Element | null
  allowRemoveColumn: boolean
  onColumnRemove?: (column: ColumnType) => void
  allowRenameColumn: boolean
  onColumnRename?: (column: ColumnType, title: string) => void
  onColumnDragEnd: (event: OnDragEnd<ColumnType>) => void
  onCardDragEnd: (event: OnDragEnd<Card>) => void
  onCardNew: (column: ColumnType, card: Card) => void | Promise<void>
  allowAddCard: boolean
}

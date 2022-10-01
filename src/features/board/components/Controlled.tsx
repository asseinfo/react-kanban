import { FC } from 'react'

import { ColumnAdder } from '@/features/column-adder'
import { DefaultCard } from '@/features/card'
import { BoardContainer, OnDragEnd } from './Container'
import { Card, Column, KanbanBoard } from '@/types'
import { DefaultColumn } from '@/features/column'

export const ControlledBoard: FC<ControlledBoardProps> = ({
  children: board,
  onCardDragEnd,
  onColumnDragEnd,
  onNewColumnConfirm,
  onColumnRemove,
  onColumnRename,
  onCardRemove,
  renderColumnAdder,
  renderColumnHeader,
  renderCard,
  allowAddColumn = true,
  allowRemoveColumn = true,
  allowRenameColumn = true,
  allowRemoveCard = true,
  disableCardDrag = false,
  disableColumnDrag = false,
}) => {
  const handleOnCardDragEnd = ({ source, destination, subject }: OnDragEnd<Card>) => {
    if (onCardDragEnd) {
      onCardDragEnd(subject, source, destination)
    }
  }
  const handleOnColumnDragEnd = ({ source, destination, subject }: OnDragEnd<Column>) => {
    if (onColumnDragEnd) {
      onColumnDragEnd(subject, source, destination)
    }
  }

  return (
    <BoardContainer
      onCardDragEnd={handleOnCardDragEnd}
      onColumnDragEnd={handleOnColumnDragEnd}
      renderColumnAdder={() => {
        if (!allowAddColumn) return null
        if (renderColumnAdder) return renderColumnAdder()
        if (!onNewColumnConfirm) return null
        return <ColumnAdder onConfirm={(title) => onNewColumnConfirm({ title, cards: [] })} />
      }}
      renderColumnHeader={
        renderColumnHeader
          ? renderColumnHeader
          : (column) => (
              <DefaultColumn
                allowRemoveColumn={allowRemoveColumn}
                onColumnRemove={(updatedColumn) => onColumnRemove?.(board, updatedColumn)}
                allowRenameColumn={allowRenameColumn}
                onColumnRename={(renamedColumn) => onColumnRename?.(board, renamedColumn)}
              >
                {column}
              </DefaultColumn>
            )
      }
      renderCard={(_column, card, dragging) => {
        if (renderCard) return renderCard(card, { dragging })
        return (
          <DefaultCard dragging={dragging} allowRemoveCard={!!allowRemoveCard} onCardRemove={onCardRemove}>
            {card}
          </DefaultCard>
        )
      }}
      allowRemoveColumn={allowRemoveColumn}
      onColumnRemove={(column) => onColumnRemove?.(board, column)}
      allowRenameColumn={allowRenameColumn}
      onColumnRename={(column) => onColumnRename?.(board, column)}
      disableColumnDrag={disableColumnDrag}
      disableCardDrag={disableCardDrag}
      // TODO: Check these
      onCardNew={() => {
        //
      }}
      allowAddCard
    >
      {board}
    </BoardContainer>
  )
}

interface CardBag {
  dragging: boolean
}
export type OnDragEndNotification<TSubject> = (
  subject: TSubject,
  source: OnDragEnd<TSubject>['source'],
  destination: OnDragEnd<TSubject>['destination']
) => void
export interface ControlledBoardProps {
  children: KanbanBoard
  onCardDragEnd?: OnDragEndNotification<Card>
  onColumnDragEnd?: OnDragEndNotification<Column>
  /** Validation in which you provide the ID of the newly created column */
  onNewColumnConfirm?: (column: Omit<Column, 'id'>) => Column
  onColumnRemove?: (board: KanbanBoard, column: Column) => void
  onColumnRename?: (board: KanbanBoard, column: Column) => void
  onCardRemove?: () => void
  /** If not provided , will render the default column adder */
  renderColumnAdder?: () => JSX.Element
  /** If not provided , will render the default column header */
  renderColumnHeader?: () => JSX.Element
  /** If not provided , will render the default card */
  renderCard?: (card: Card, cardBag: CardBag) => JSX.Element
  /** @default true */
  allowRemoveColumn?: boolean
  /** @default true */
  allowRenameColumn?: boolean
  /** @default true */
  allowRemoveCard?: boolean
  /** @default true */
  allowAddColumn?: boolean
  /** @default false */
  disableCardDrag?: boolean
  /** @default false */
  disableColumnDrag?: boolean
}

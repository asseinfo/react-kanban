import { FC, useState } from 'react'

import { ColumnAdder } from '@/features/column-adder'
import { when, partialRight } from '@services/utils'
import { DefaultCard } from '@/features/card'
import { moveCard, moveColumn, addColumn, removeColumn, changeColumn, addCard, removeCard } from '@services/helpers'
import { Card, Column, KanbanBoard } from '@/types'
import { BoardContainer } from './Container'
import { DefaultColumn } from '@/features/column'

export const UncontrolledBoard: FC<UncontrolledBoardProps> = ({
  initialBoard,
  onCardDragEnd,
  onColumnDragEnd,
  allowAddColumn = true,
  renderColumnAdder,
  onNewColumnConfirm,
  onColumnRemove,
  renderColumnHeader,
  allowRemoveColumn = true,
  allowRenameColumn = true,
  onColumnRename,
  onCardNew,
  renderCard,
  allowRemoveCard = true,
  onCardRemove,
  onColumnNew,
  disableCardDrag = false,
  disableColumnDrag = false,
  allowAddCard = true,
  onNewCardConfirm,
}) => {
  const [board, setBoard] = useState(initialBoard)

  // @ts-expect-error TS(7031) FIXME: Binding element 'source' implicitly has an 'any' t... Remove this comment to see the full error message
  const handleOnDragEnd = ({ source, destination, subject }, { moveCallback, notifyCallback }) => {
    const reorderedBoard = moveCallback(board, source, destination)
    when(notifyCallback)((callback) => callback(reorderedBoard, subject, source, destination))
    setBoard(reorderedBoard)
  }

  const handleColumnAdd = async (newColumn: Omit<Column, 'id'>) => {
    // TODO: Need to check if confirms fire w/o IDs
    const column = renderColumnAdder ? newColumn : await onNewColumnConfirm?.(newColumn)
    if (!column) throw new Error('Cant add falsy column')
    const boardWithNewColumn = addColumn(board, column)
    onColumnNew?.(boardWithNewColumn, column as Column)
    setBoard(boardWithNewColumn)
  }

  const handleColumnRemove = (column: Column) => {
    const filteredBoard = removeColumn(board, column)
    onColumnRemove?.(filteredBoard, column)
    setBoard(filteredBoard)
  }

  const handleColumnRename = (column: Column, title: string) => {
    const boardWithRenamedColumn = changeColumn(board, column, { title })
    onColumnRename?.(boardWithRenamedColumn, { ...column, title })
    setBoard(boardWithRenamedColumn)
  }

  const handleCardAdd = (column: Column, card: Card, options = {}) => {
    const boardWithNewCard = addCard(board, column, card, options)
    const targetColumn = boardWithNewCard.columns.find(({ id }) => id === column.id)
    if (!targetColumn) throw new Error('Cannot find target column')

    onCardNew?.(boardWithNewCard, targetColumn, card)
    setBoard(boardWithNewCard)
  }

  const handleDraftCardAdd = async (column: Column, card: Card, options = {}) => {
    const newCard = await onNewCardConfirm?.(card)
    if (!newCard) throw new Error('Cant add falsy card')
    handleCardAdd(column, newCard, options)
  }

  const handleCardRemove = (column: Column, card: Card) => {
    const boardWithoutCard = removeCard(board, column, card)
    const targetColumn = boardWithoutCard.columns.find(({ id }) => id === column.id)
    if (!targetColumn) throw new Error('Cannot find target column')
    onCardRemove?.(boardWithoutCard, targetColumn, card)
    setBoard(boardWithoutCard)
  }

  const handleOnCardDragEnd = partialRight(handleOnDragEnd, { moveCallback: moveCard, notifyCallback: onCardDragEnd })
  const handleOnColumnDragEnd = partialRight(handleOnDragEnd, {
    moveCallback: moveColumn,
    notifyCallback: onColumnDragEnd,
  })

  return (
    <BoardContainer
      onCardDragEnd={handleOnCardDragEnd}
      onColumnDragEnd={handleOnColumnDragEnd}
      renderColumnAdder={() => {
        if (!allowAddColumn) return null
        if (renderColumnAdder) return renderColumnAdder({ addColumn: handleColumnAdd })
        if (!onNewColumnConfirm) return null

        return <ColumnAdder onConfirm={(title) => handleColumnAdd({ title, cards: [] })} />
      }}
      // TODO: Check because og this could be falsy, also no idea what bound thing is
      renderColumnHeader={(column) => {
        if (renderColumnHeader) {
          return renderColumnHeader(column, {
            removeColumn: handleColumnRemove.bind(null, column),
            renameColumn: handleColumnRename.bind(null, column),
            addCard: handleCardAdd.bind(null, column),
          })
        } else {
          return (
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
      }}
      renderCard={(column, card, dragging) => {
        if (renderCard) return renderCard(card, { removeCard: handleCardRemove.bind(null, column, card), dragging })
        return (
          <DefaultCard
            dragging={dragging}
            allowRemoveCard={allowRemoveCard}
            onCardRemove={(card) => handleCardRemove(column, card)}
          >
            {card}
          </DefaultCard>
        )
      }}
      allowRemoveColumn={allowRemoveColumn}
      onColumnRemove={handleColumnRemove}
      allowRenameColumn={allowRenameColumn}
      onColumnRename={handleColumnRename}
      disableColumnDrag={disableColumnDrag}
      disableCardDrag={disableCardDrag}
      onCardNew={async (column, card) => await handleDraftCardAdd(column, card, allowAddCard)}
      allowAddCard={!!allowAddCard && !!onNewCardConfirm}
    >
      {board}
    </BoardContainer>
  )
}

type HandleColumnAdd = (newColumn: Column) => Promise<void>
type BoundFunction = any

export interface UncontrolledBoardProps {
  initialBoard: KanbanBoard
  /** If not provided , will render the default column adder */
  renderColumnAdder?: (options: { addColumn: HandleColumnAdd }) => JSX.Element
  /** If not provided , will render the default column header */
  renderColumnHeader?: (
    column: Column,
    options: { removeColumn: BoundFunction; renameColumn: BoundFunction; addCard: BoundFunction }
  ) => JSX.Element
  /** If not provided , will render the default card */
  renderCard?: (card: Card, options: { removeCard: BoundFunction; dragging: boolean }) => JSX.Element
  onColumnRemove?: (filteredBoard: KanbanBoard, column: Column) => void
  onColumnRename?: (board: KanbanBoard, column: Column) => void
  onCardNew?: (board: KanbanBoard, column: Column, card: Card) => void
  onCardRemove?: (board: KanbanBoard, column: Column, card: Card) => void
  onColumnNew?: (board: KanbanBoard, column: Column) => void
  /** Validation in which you provide the ID of the newly created card */
  onNewCardConfirm?: (card: Omit<Card, 'id'>) => Promise<Card>
  /** Validation in which you provide the ID of the newly created column */
  onNewColumnConfirm?: (newColumn: Omit<Column, 'id'>) => Promise<Column>
  onCardDragEnd?: () => void
  onColumnDragEnd?: () => void
  /** @default false */
  disableCardDrag?: boolean
  /** @default false */
  disableColumnDrag?: boolean
  /** @default true */
  allowAddCard?: boolean | { on: 'top' | 'bottom' }
  /** @default true */
  allowRemoveCard?: boolean
  /** @default true */
  allowRemoveColumn?: boolean
  /** @default true */
  allowRenameColumn?: boolean
  /** @default true */
  allowAddColumn?: boolean
}

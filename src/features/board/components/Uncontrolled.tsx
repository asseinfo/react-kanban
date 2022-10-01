import { FC, useState } from 'react'

import { ColumnAdder } from '@/features/column-adder'
import { when, partialRight } from '@services/utils'
import { DefaultCard } from '@/features/card'
import { moveCard, moveColumn, addColumn, removeColumn, changeColumn, addCard, removeCard } from '@services/helpers'
import { Card, Column, KanbanBoard } from '@/types'
import { BoardContainer } from './Container'

export const UncontrolledBoard: FC<Props> = ({
  initialBoard,
  onCardDragEnd,
  onColumnDragEnd,
  allowAddColumn,
  renderColumnAdder,
  onNewColumnConfirm,
  onColumnRemove,
  renderColumnHeader,
  allowRemoveColumn,
  allowRenameColumn,
  onColumnRename,
  onCardNew,
  renderCard,
  allowRemoveCard,
  onCardRemove,
  onColumnNew,
  disableCardDrag,
  disableColumnDrag,
  allowAddCard,
  onNewCardConfirm,
}) => {
  const [board, setBoard] = useState(initialBoard)

  // @ts-expect-error TS(7031) FIXME: Binding element 'source' implicitly has an 'any' t... Remove this comment to see the full error message
  const handleOnDragEnd = ({ source, destination, subject }, { moveCallback, notifyCallback }) => {
    const reorderedBoard = moveCallback(board, source, destination)
    // @ts-expect-error TS(7006) FIXME: Parameter 'callback' implicitly has an 'any' type.
    when(notifyCallback)((callback) => callback(reorderedBoard, subject, source, destination))
    setBoard(reorderedBoard)
  }

  const handleColumnAdd = async (newColumn: Omit<Column, 'id'>) => {
    // TODO: Need to check if confirms fire w/o IDs
    const column = renderColumnAdder ? newColumn : await onNewColumnConfirm?.(newColumn)
    if (!column) throw new Error('Cant add falsy column')
    const boardWithNewColumn = addColumn(board, column)
    onColumnNew(boardWithNewColumn, column as Column)
    setBoard(boardWithNewColumn)
  }

  const handleColumnRemove = (column: Column) => {
    const filteredBoard = removeColumn(board, column)
    onColumnRemove(filteredBoard, column)
    setBoard(filteredBoard)
  }

  const handleColumnRename = (column: Column, title: string) => {
    const boardWithRenamedColumn = changeColumn(board, column, { title })
    onColumnRename(boardWithRenamedColumn, { ...column, title })
    setBoard(boardWithRenamedColumn)
  }

  const handleCardAdd = (column: Column, card: Card, options = {}) => {
    const boardWithNewCard = addCard(board, column, card, options)
    const targetColumn = boardWithNewCard.columns.find(({ id }) => id === column.id)
    if (!targetColumn) throw new Error('Cannot find target column')

    onCardNew(boardWithNewCard, targetColumn, card)
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
    onCardRemove(boardWithoutCard, targetColumn, card)
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
        return renderColumnHeader(column, {
          removeColumn: handleColumnRemove.bind(null, column),
          renameColumn: handleColumnRename.bind(null, column),
          addCard: handleCardAdd.bind(null, column),
        })
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
interface Props {
  initialBoard: KanbanBoard
  onCardDragEnd: () => void
  onColumnDragEnd: () => void
  allowAddColumn: boolean
  renderColumnAdder?: (options: { addColumn: HandleColumnAdd }) => JSX.Element
  onNewColumnConfirm?: (newColumn: Omit<Column, 'id'>) => Promise<Column>
  onColumnRemove: (filteredBoard: KanbanBoard, column: Column) => void
  renderColumnHeader: (
    column: Column,
    options: { removeColumn: BoundFunction; renameColumn: BoundFunction; addCard: BoundFunction }
  ) => JSX.Element
  allowRemoveColumn: boolean
  allowRenameColumn: boolean
  onColumnRename: (board: KanbanBoard, column: Column) => void
  onCardNew: (board: KanbanBoard, column: Column, card: Card) => void
  renderCard: (card: Card, options: { removeCard: BoundFunction; dragging: boolean }) => JSX.Element
  allowRemoveCard: boolean
  onCardRemove: (board: KanbanBoard, column: Column, card: Card) => void
  onColumnNew: (board: KanbanBoard, column: Column) => void
  disableCardDrag: boolean
  disableColumnDrag: boolean
  allowAddCard: boolean
  onNewCardConfirm?: (card: Omit<Card, 'id'>) => Promise<Card>
}

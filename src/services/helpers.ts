import { Card, Column, KanbanBoard } from '@/types'
import {
  removeFromArrayAtPosition,
  addInArrayAtPosition,
  changeElementOfPositionInArray,
  replaceElementOfArray,
} from '@services/utils'

function reorderCardsOnColumn(column: any, reorderCards: any) {
  return { ...column, cards: reorderCards(column.cards) }
}

function moveColumn(board: any, { fromPosition }: any, { toPosition }: any) {
  return { ...board, columns: changeElementOfPositionInArray(board.columns, fromPosition, toPosition) }
}

function moveCard(board: any, { fromPosition, fromColumnId }: any, { toPosition, toColumnId }: any) {
  const sourceColumn = board.columns.find((column: any) => column.id === fromColumnId)
  const destinationColumn = board.columns.find((column: any) => column.id === toColumnId)

  const reorderColumnsOnBoard = (reorderColumnsMapper: any) => ({
    ...board,
    columns: board.columns.map(reorderColumnsMapper),
  })
  const reorderCardsOnSourceColumn = reorderCardsOnColumn.bind(null, sourceColumn)
  const reorderCardsOnDestinationColumn = reorderCardsOnColumn.bind(null, destinationColumn)

  if (sourceColumn.id === destinationColumn.id) {
    const reorderedCardsOnColumn = reorderCardsOnSourceColumn((cards: any) => {
      return changeElementOfPositionInArray(cards, fromPosition, toPosition)
    })
    return reorderColumnsOnBoard((column: any) => (column.id === sourceColumn.id ? reorderedCardsOnColumn : column))
  } else {
    const reorderedCardsOnSourceColumn = reorderCardsOnSourceColumn((cards: any) => {
      return removeFromArrayAtPosition(cards, fromPosition)
    })
    const reorderedCardsOnDestinationColumn = reorderCardsOnDestinationColumn((cards: any) => {
      return addInArrayAtPosition(cards, sourceColumn.cards[fromPosition], toPosition)
    })
    return reorderColumnsOnBoard((column: any) => {
      if (column.id === sourceColumn.id) return reorderedCardsOnSourceColumn
      if (column.id === destinationColumn.id) return reorderedCardsOnDestinationColumn
      return column
    })
  }
}

function addColumn<TCard extends Card>(board: KanbanBoard<TCard>, column: Partial<Column<TCard>>) {
  return { ...board, columns: addInArrayAtPosition(board.columns, column, board.columns.length) }
}

function removeColumn<TCard extends Card>(board: KanbanBoard<TCard>, column: Column<TCard>) {
  return { ...board, columns: board.columns.filter(({ id }: any) => id !== column.id) }
}

function changeColumn<TCard extends Card>(
  board: KanbanBoard<TCard>,
  column: Column<TCard>,
  newColumn: Partial<Column<TCard>>
) {
  const changedColumns = replaceElementOfArray(board.columns)({
    when: ({ id }: any) => id === column.id,
    for: (value: any) => ({
      ...value,
      ...newColumn,
    }),
  })
  return { ...board, columns: changedColumns }
}

function addCard<TCard extends Card>(
  board: KanbanBoard<TCard>,
  inColumn: any,
  card: TCard,
  { on }: any = {}
): KanbanBoard<TCard> {
  const columnToAdd = board.columns.find(({ id }: any) => id === inColumn.id)
  if (!columnToAdd) throw new Error(`Cannot find column with ID: ${inColumn.id}`)
  const cards = addInArrayAtPosition(columnToAdd.cards, card, on === 'top' ? 0 : columnToAdd.cards.length)
  const columns = replaceElementOfArray(board.columns)({
    when: ({ id }: any) => inColumn.id === id,
    for: (value: any) => ({
      ...value,
      cards,
    }),
  })
  return { ...board, columns }
}

function removeCard<TCard extends Card>(board: any, fromColumn: any, card: any): KanbanBoard<TCard> {
  const columnToRemove = board.columns.find(({ id }: any) => id === fromColumn.id)
  const filteredCards = columnToRemove.cards.filter(({ id }: any) => card.id !== id)
  const columnWithoutCard = { ...columnToRemove, cards: filteredCards }
  const filteredColumns = board.columns.map((column: any) => (fromColumn.id === column.id ? columnWithoutCard : column))
  return { ...board, columns: filteredColumns }
}

function changeCard(board: any, cardId: any, newCard: any) {
  const changedCards = (cards: any) =>
    replaceElementOfArray(cards)({
      when: ({ id }: any) => id === cardId,
      for: (card: any) => ({
        ...card,
        ...newCard,
      }),
    })

  return {
    ...board,
    columns: board.columns.map((column: any) => ({
      ...column,
      cards: changedCards(column.cards),
    })),
  }
}

export { moveColumn, moveCard, addColumn, removeColumn, changeColumn, addCard, removeCard, changeCard }

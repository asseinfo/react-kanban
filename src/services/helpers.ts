import {
  removeFromArrayAtPosition,
  addInArrayAtPosition,
  changeElementOfPositionInArray,
  replaceElementOfArray,
} from '@services/utils'

// @ts-expect-error TS(7006) FIXME: Parameter 'column' implicitly has an 'any' type.
function reorderCardsOnColumn(column, reorderCards) {
  return { ...column, cards: reorderCards(column.cards) }
}

// @ts-expect-error TS(7006) FIXME: Parameter 'board' implicitly has an 'any' type.
function moveColumn(board, { fromPosition }, { toPosition }) {
  return { ...board, columns: changeElementOfPositionInArray(board.columns, fromPosition, toPosition) }
}

// @ts-expect-error TS(7006) FIXME: Parameter 'board' implicitly has an 'any' type.
function moveCard(board, { fromPosition, fromColumnId }, { toPosition, toColumnId }) {
  // @ts-expect-error TS(7006) FIXME: Parameter 'column' implicitly has an 'any' type.
  const sourceColumn = board.columns.find((column) => column.id === fromColumnId)
  // @ts-expect-error TS(7006) FIXME: Parameter 'column' implicitly has an 'any' type.
  const destinationColumn = board.columns.find((column) => column.id === toColumnId)

  // @ts-expect-error TS(7006) FIXME: Parameter 'reorderColumnsMapper' implicitly has an... Remove this comment to see the full error message
  const reorderColumnsOnBoard = (reorderColumnsMapper) => ({
    ...board,
    columns: board.columns.map(reorderColumnsMapper),
  })
  const reorderCardsOnSourceColumn = reorderCardsOnColumn.bind(null, sourceColumn)
  const reorderCardsOnDestinationColumn = reorderCardsOnColumn.bind(null, destinationColumn)

  if (sourceColumn.id === destinationColumn.id) {
    // @ts-expect-error TS(7006) FIXME: Parameter 'cards' implicitly has an 'any' type.
    const reorderedCardsOnColumn = reorderCardsOnSourceColumn((cards) => {
      return changeElementOfPositionInArray(cards, fromPosition, toPosition)
    })
    // @ts-expect-error TS(7006) FIXME: Parameter 'column' implicitly has an 'any' type.
    return reorderColumnsOnBoard((column) => (column.id === sourceColumn.id ? reorderedCardsOnColumn : column))
  } else {
    // @ts-expect-error TS(7006) FIXME: Parameter 'cards' implicitly has an 'any' type.
    const reorderedCardsOnSourceColumn = reorderCardsOnSourceColumn((cards) => {
      return removeFromArrayAtPosition(cards, fromPosition)
    })
    // @ts-expect-error TS(7006) FIXME: Parameter 'cards' implicitly has an 'any' type.
    const reorderedCardsOnDestinationColumn = reorderCardsOnDestinationColumn((cards) => {
      return addInArrayAtPosition(cards, sourceColumn.cards[fromPosition], toPosition)
    })
    // @ts-expect-error TS(7006) FIXME: Parameter 'column' implicitly has an 'any' type.
    return reorderColumnsOnBoard((column) => {
      if (column.id === sourceColumn.id) return reorderedCardsOnSourceColumn
      if (column.id === destinationColumn.id) return reorderedCardsOnDestinationColumn
      return column
    })
  }
}

// @ts-expect-error TS(7006) FIXME: Parameter 'board' implicitly has an 'any' type.
function addColumn(board, column) {
  return { ...board, columns: addInArrayAtPosition(board.columns, column, board.columns.length) }
}

// @ts-expect-error TS(7006) FIXME: Parameter 'board' implicitly has an 'any' type.
function removeColumn(board, column) {
  // @ts-expect-error TS(7031) FIXME: Binding element 'id' implicitly has an 'any' type.
  return { ...board, columns: board.columns.filter(({ id }) => id !== column.id) }
}

// @ts-expect-error TS(7006) FIXME: Parameter 'board' implicitly has an 'any' type.
function changeColumn(board, column, newColumn) {
  const changedColumns = replaceElementOfArray(board.columns)({
    // @ts-expect-error TS(7031) FIXME: Binding element 'id' implicitly has an 'any' type.
    when: ({ id }) => id === column.id,
    // @ts-expect-error TS(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
    for: (value) => ({ ...value, ...newColumn }),
  })
  return { ...board, columns: changedColumns }
}

// @ts-expect-error TS(7006) FIXME: Parameter 'board' implicitly has an 'any' type.
function addCard(board, inColumn, card, { on }: any = {}) {
  // @ts-expect-error TS(7031) FIXME: Binding element 'id' implicitly has an 'any' type.
  const columnToAdd = board.columns.find(({ id }) => id === inColumn.id)
  const cards = addInArrayAtPosition(columnToAdd.cards, card, on === 'top' ? 0 : columnToAdd.cards.length)
  const columns = replaceElementOfArray(board.columns)({
    // @ts-expect-error TS(7031) FIXME: Binding element 'id' implicitly has an 'any' type.
    when: ({ id }) => inColumn.id === id,
    // @ts-expect-error TS(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
    for: (value) => ({ ...value, cards }),
  })
  return { ...board, columns }
}

// @ts-expect-error TS(7006) FIXME: Parameter 'board' implicitly has an 'any' type.
function removeCard(board, fromColumn, card) {
  // @ts-expect-error TS(7031) FIXME: Binding element 'id' implicitly has an 'any' type.
  const columnToRemove = board.columns.find(({ id }) => id === fromColumn.id)
  // @ts-expect-error TS(7031) FIXME: Binding element 'id' implicitly has an 'any' type.
  const filteredCards = columnToRemove.cards.filter(({ id }) => card.id !== id)
  const columnWithoutCard = { ...columnToRemove, cards: filteredCards }
  // @ts-expect-error TS(7006) FIXME: Parameter 'column' implicitly has an 'any' type.
  const filteredColumns = board.columns.map((column) => (fromColumn.id === column.id ? columnWithoutCard : column))
  return { ...board, columns: filteredColumns }
}

// @ts-expect-error TS(7006) FIXME: Parameter 'board' implicitly has an 'any' type.
function changeCard(board, cardId, newCard) {
  // @ts-expect-error TS(7006) FIXME: Parameter 'cards' implicitly has an 'any' type.
  const changedCards = (cards) =>
    replaceElementOfArray(cards)({
      // @ts-expect-error TS(7031) FIXME: Binding element 'id' implicitly has an 'any' type.
      when: ({ id }) => id === cardId,
      // @ts-expect-error TS(7006) FIXME: Parameter 'card' implicitly has an 'any' type.
      for: (card) => ({ ...card, ...newCard }),
    })

  // @ts-expect-error TS(7006) FIXME: Parameter 'column' implicitly has an 'any' type.
  return { ...board, columns: board.columns.map((column) => ({ ...column, cards: changedCards(column.cards) })) }
}

export { moveColumn, moveCard, addColumn, removeColumn, changeColumn, addCard, removeCard, changeCard }

// @ts-expect-error TS(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
function getCoordinates(event, board) {
  if (event.destination === null) return {}

  const columnSource = { fromPosition: event.source.index }
  const columnDestination = { toPosition: event.destination.index }

  if (isAColumnMove(event.type)) {
    return { source: columnSource, destination: columnDestination }
  }

  return {
    source: { ...columnSource, fromColumnId: getColumn(board, event.source.droppableId).id },
    destination: { ...columnDestination, toColumnId: getColumn(board, event.destination.droppableId).id },
  }
}

// @ts-expect-error TS(7006) FIXME: Parameter 'type' implicitly has an 'any' type.
function isAColumnMove(type) {
  return type === 'BOARD'
}

// @ts-expect-error TS(7006) FIXME: Parameter 'board' implicitly has an 'any' type.
function getCard(board, sourceCoordinate) {
  // @ts-expect-error TS(7006) FIXME: Parameter 'column' implicitly has an 'any' type.
  const column = board.columns.find((column) => column.id === sourceCoordinate.fromColumnId)
  return column.cards[sourceCoordinate.fromPosition]
}

// @ts-expect-error TS(7006) FIXME: Parameter 'board' implicitly has an 'any' type.
function getColumn(board, droppableId) {
  // @ts-expect-error TS(7031) FIXME: Binding element 'id' implicitly has an 'any' type.
  return board.columns.find(({ id }) => String(id) === droppableId)
}

// @ts-expect-error TS(7006) FIXME: Parameter 'coordinates' implicitly has an 'any' ty... Remove this comment to see the full error message
function isMovingAColumnToAnotherPosition(coordinates) {
  return coordinates.source.fromPosition !== coordinates.destination.toPosition
}

// @ts-expect-error TS(7006) FIXME: Parameter 'coordinates' implicitly has an 'any' ty... Remove this comment to see the full error message
function isMovingACardToAnotherPosition(coordinates) {
  return !(
    coordinates.source.fromPosition === coordinates.destination.toPosition &&
    coordinates.source.fromColumnId === coordinates.destination.toColumnId
  )
}

export { getCard, getCoordinates, isAColumnMove, isMovingAColumnToAnotherPosition, isMovingACardToAnotherPosition }

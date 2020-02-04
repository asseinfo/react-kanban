function getCoordinates(event, board) {
  if (event.destination === null) return {}

  const laneSource = { fromPosition: event.source.index }
  const laneDestination = { toPosition: event.destination.index }

  if (isALaneMove(event.type)) {
    return { source: laneSource, destination: laneDestination }
  }

  return {
    source: { ...laneSource, fromLaneId: getLane(board, event.source.droppableId).id },
    destination: { ...laneDestination, toLaneId: getLane(board, event.destination.droppableId).id }
  }
}

function isALaneMove(type) {
  return type === 'BOARD'
}

function getCard(board, sourceCoordinate) {
  const lane = board.lanes.find(lane => lane.id === sourceCoordinate.fromLaneId)
  return lane.cards[sourceCoordinate.fromPosition]
}

function getLane(board, droppableId) {
  return board.lanes.find(({ id }) => String(id) === droppableId)
}

export { getCard, getCoordinates, isALaneMove }

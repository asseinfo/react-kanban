function getCoordinates(event) {
  if (event.destination === null) return {}

  const laneSource = { fromPosition: event.source.index }
  const laneDestination = { toPosition: event.destination.index }

  if (isALaneMove(event.type)) {
    return { source: laneSource, destination: laneDestination }
  }

  return {
    source: { ...laneSource, fromLaneId: parseInt(event.source.droppableId) },
    destination: { ...laneDestination, toLaneId: parseInt(event.destination.droppableId) }
  }
}

function isALaneMove(type) {
  return type === 'BOARD'
}

function getCard(board, sourceCoordinate) {
  const lane = board.lanes.find(lane => lane.id === sourceCoordinate.fromLaneId)
  return lane.cards[sourceCoordinate.fromPosition]
}

export { getCard, getCoordinates, isALaneMove }

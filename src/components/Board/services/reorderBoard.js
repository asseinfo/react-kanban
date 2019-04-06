import { removeFromArrayAtPosition, addInArrayAtPosition, changeElementOfPositionInArray } from '@services/utils'

function reorderBoard (board, source, destination) {
  var reorderedBoard

  const sourceLane = board.lanes.find(lane => lane.id === source.laneId)
  const destinationLane = board.lanes.find(lane => lane.id === destination.laneId)

  if (sourceLane.id === destinationLane.id) {
    const reorderedCards = changeElementOfPositionInArray(sourceLane.cards, source.index, destination.index)
    const reorderedLane = { ...sourceLane, cards: reorderedCards }
    reorderedBoard = { ...board, lanes: board.lanes.map(lane => lane.id === sourceLane.id ? reorderedLane : lane) }
  } else {
    const reorderedSourceLane = { ...sourceLane, cards: removeFromArrayAtPosition(sourceLane.cards, source.index) }
    const reorderedDestinationLane = { ...destinationLane, cards: addInArrayAtPosition(destinationLane.cards, sourceLane.cards[source.index], destination.index) }
    reorderedBoard = { ...board,
      lanes: board.lanes.map(lane => {
        if (lane.id === sourceLane.id) return reorderedSourceLane
        if (lane.id === destinationLane.id) return reorderedDestinationLane
        return lane
      })
    }
  }

  return reorderedBoard
}

export default reorderBoard

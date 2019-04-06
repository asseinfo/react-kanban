import { removeFromArrayAtPosition, addInArrayAtPosition, changeElementOfPositionInArray } from '@services/utils'

function reorderCardsOnLane (lane, reorderCards) {
  return { ...lane, cards: reorderCards(lane.cards) }
}

function reorderLanesOnBoard (board, reorderLanesMapper) {
  return { ...board, lanes: board.lanes.map(reorderLanesMapper) }
}

function reorderBoard (board, source, destination) {
  var reorderedBoard

  const sourceLane = board.lanes.find(lane => lane.id === source.laneId)
  const destinationLane = board.lanes.find(lane => lane.id === destination.laneId)

  if (sourceLane.id === destinationLane.id) {
    const reorderedLane = reorderCardsOnLane(sourceLane, cards => {
      return changeElementOfPositionInArray(cards, source.index, destination.index)
    })
    reorderedBoard = reorderLanesOnBoard(board, lane => lane.id === sourceLane.id ? reorderedLane : lane)
  } else {
    const reorderedSourceLane = reorderCardsOnLane(sourceLane, cards => {
      return removeFromArrayAtPosition(cards, source.index)
    })
    const reorderedDestinationLane = reorderCardsOnLane(destinationLane, cards => {
      return addInArrayAtPosition(cards, sourceLane.cards[source.index], destination.index)
    })
    reorderedBoard = reorderLanesOnBoard(board, lane => {
      if (lane.id === sourceLane.id) return reorderedSourceLane
      if (lane.id === destinationLane.id) return reorderedDestinationLane
      return lane
    })
  }

  return reorderedBoard
}

export default reorderBoard

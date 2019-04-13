import { removeFromArrayAtPosition, addInArrayAtPosition, changeElementOfPositionInArray } from '@services/utils'

export default function reorderBoard (board, source, destination) {
  const reorderFn = source.laneId ? reorderCardsOnBorder : reorderLaneOnBorder
  return reorderFn(board, source, destination)
}

function reorderCardsOnBorder (board, source, destination) {
  const sourceLane = board.lanes.find(lane => lane.id === source.laneId)
  const destinationLane = board.lanes.find(lane => lane.id === destination.laneId)

  const reorderLanesOnBoard = reorderLanesMapper => ({ ...board, lanes: board.lanes.map(reorderLanesMapper) })
  const reorderCardsOnLane = (lane, reorderCards) => ({ ...lane, cards: reorderCards(lane.cards) })
  const reorderCardsOnSourceLane = reorderCardsOnLane.bind(null, sourceLane)
  const reorderCardsOnDestinationLane = reorderCardsOnLane.bind(null, destinationLane)

  if (sourceLane.id === destinationLane.id) {
    const reorderedCardsOnLane = reorderCardsOnSourceLane(cards => {
      return changeElementOfPositionInArray(cards, source.index, destination.index)
    })
    return reorderLanesOnBoard(lane => lane.id === sourceLane.id ? reorderedCardsOnLane : lane)
  } else {
    const reorderedCardsOnSourceLane = reorderCardsOnSourceLane(cards => {
      return removeFromArrayAtPosition(cards, source.index)
    })
    const reorderedCardsOnDestinationLane = reorderCardsOnDestinationLane(cards => {
      return addInArrayAtPosition(cards, sourceLane.cards[source.index], destination.index)
    })
    return reorderLanesOnBoard(lane => {
      if (lane.id === sourceLane.id) return reorderedCardsOnSourceLane
      if (lane.id === destinationLane.id) return reorderedCardsOnDestinationLane
      return lane
    })
  }
}

function reorderLaneOnBorder (board, source, destination) {
  return { ...board, lanes: changeElementOfPositionInArray(board.lanes, source.index, destination.index) }
}

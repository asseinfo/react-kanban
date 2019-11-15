import { removeFromArrayAtPosition, addInArrayAtPosition, changeElementOfPositionInArray } from '@services/utils'

function reorderCardsOnLane(lane, reorderCards) {
  return { ...lane, cards: reorderCards(lane.cards) }
}

function moveLane(board, { fromPosition }, { toPosition }) {
  return { ...board, lanes: changeElementOfPositionInArray(board.lanes, fromPosition, toPosition) }
}

function moveCard(board, { fromPosition, fromLaneId }, { toPosition, toLaneId }) {
  const sourceLane = board.lanes.find(lane => lane.id === fromLaneId)
  const destinationLane = board.lanes.find(lane => lane.id === toLaneId)

  const reorderLanesOnBoard = reorderLanesMapper => ({ ...board, lanes: board.lanes.map(reorderLanesMapper) })
  const reorderCardsOnSourceLane = reorderCardsOnLane.bind(null, sourceLane)
  const reorderCardsOnDestinationLane = reorderCardsOnLane.bind(null, destinationLane)

  if (sourceLane.id === destinationLane.id) {
    const reorderedCardsOnLane = reorderCardsOnSourceLane(cards => {
      return changeElementOfPositionInArray(cards, fromPosition, toPosition)
    })
    return reorderLanesOnBoard(lane => (lane.id === sourceLane.id ? reorderedCardsOnLane : lane))
  } else {
    const reorderedCardsOnSourceLane = reorderCardsOnSourceLane(cards => {
      return removeFromArrayAtPosition(cards, fromPosition)
    })
    const reorderedCardsOnDestinationLane = reorderCardsOnDestinationLane(cards => {
      return addInArrayAtPosition(cards, sourceLane.cards[fromPosition], toPosition)
    })
    return reorderLanesOnBoard(lane => {
      if (lane.id === sourceLane.id) return reorderedCardsOnSourceLane
      if (lane.id === destinationLane.id) return reorderedCardsOnDestinationLane
      return lane
    })
  }
}

function addLane(board, lane) {
  return { ...board, lanes: addInArrayAtPosition(board.lanes, lane, board.lanes.length) }
}

function removeLane(board, lane) {
  return { ...board, lanes: board.lanes.filter(({ id }) => id !== lane.id) }
}

function renameLane(board, lane, newTitle) {
  const renamedLanes = board.lanes.map(value => (value.id === lane.id ? { ...value, title: newTitle } : value))
  return { ...board, lanes: renamedLanes }
}

export { moveLane, moveCard, addLane, removeLane, renameLane }

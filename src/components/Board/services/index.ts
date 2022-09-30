import { DropResult } from 'react-beautiful-dnd'

import { KanbanBoard } from '../../../types'

function getCoordinates(event: DropResult, board: KanbanBoard) {
  if (event.destination === null) return {}

  const columnSource = { fromPosition: event.source.index }
  const columnDestination = { toPosition: event.destination?.index }

  if (isAColumnMove(event.type)) {
    return { source: columnSource, destination: columnDestination }
  }

  return {
    source: { ...columnSource, fromColumnId: getColumn(board, event.source.droppableId).id },
    destination: { ...columnDestination, toColumnId: getColumn(board, event.destination?.droppableId).id },
  }
}

function isAColumnMove(type: any) {
  return type === 'BOARD'
}

function getCard(board: any, sourceCoordinate: any) {
  const column = board.columns.find((column: any) => column.id === sourceCoordinate.fromColumnId)
  return column.cards[sourceCoordinate.fromPosition]
}

function getColumn(board: any, droppableId: any) {
  return board.columns.find(({ id }: any) => String(id) === droppableId)
}

function isMovingAColumnToAnotherPosition(coordinates: any) {
  return coordinates.source.fromPosition !== coordinates.destination.toPosition
}

function isMovingACardToAnotherPosition(coordinates: any) {
  return !(
    coordinates.source.fromPosition === coordinates.destination.toPosition &&
    coordinates.source.fromColumnId === coordinates.destination.toColumnId
  )
}

export { getCard, getCoordinates, isAColumnMove, isMovingAColumnToAnotherPosition, isMovingACardToAnotherPosition }

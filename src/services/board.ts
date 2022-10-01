import { DropResult } from 'react-beautiful-dnd'

import { Card, Column, KanbanBoard } from '@/types'

export interface Coordinates {
  source: {
    fromPosition: number
    fromColumnId?: string | number
  }
  destination: {
    toPosition?: number
    toColumnId?: string | number
  }
}
export const getCoordinates = (event: DropResult, board: KanbanBoard): Partial<Coordinates> => {
  if (event.destination === null) return {}

  const columnSource = { fromPosition: event.source.index }
  const columnDestination = { toPosition: event.destination?.index }

  if (isAColumnMove(event.type)) {
    return { source: columnSource, destination: columnDestination }
  }

  return {
    source: { ...columnSource, fromColumnId: getColumnStrict(board, event.source.droppableId).id },
    destination: { ...columnDestination, toColumnId: getColumnStrict(board, event.destination?.droppableId).id },
  }
}

export const isAColumnMove = (type: string) => {
  return type === 'BOARD'
}

export const getCard = (board: KanbanBoard, sourceCoordinate: Coordinates['source']): Card => {
  const column = board.columns.find((column: any) => column.id === sourceCoordinate.fromColumnId)
  if (!column) throw new Error(`Cannot find column: ${sourceCoordinate.fromColumnId}`)
  return column.cards[sourceCoordinate.fromPosition]
}

export const getColumn = (board: KanbanBoard, droppableId: string): Column | undefined => {
  return board.columns.find(({ id }: any) => String(id) === droppableId)
}

export const getColumnStrict = (board: KanbanBoard, droppableId: any): Column => {
  const column = getColumn(board, droppableId)
  if (!column) throw new Error(`Cannot find column with ID: ${droppableId}`)
  return column
}

export const isMovingAColumnToAnotherPosition = (coordinates: Coordinates) => {
  return coordinates.source.fromPosition !== coordinates.destination.toPosition
}

export const isMovingACardToAnotherPosition = (coordinates: Coordinates) => {
  return !(
    coordinates.source.fromPosition === coordinates.destination.toPosition &&
    coordinates.source.fromColumnId === coordinates.destination.toColumnId
  )
}

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
export const getCoordinates = <TCard extends Card>(
  event: DropResult,
  board: KanbanBoard<TCard>
): Partial<Coordinates> => {
  if (event.destination === null) return {}

  const columnSource = { fromPosition: event.source.index }
  const columnDestination = { toPosition: event.destination?.index }

  if (isAColumnMove(event.type)) {
    return { source: columnSource, destination: columnDestination }
  }

  return {
    source: { ...columnSource, fromColumnId: getColumnStrict<TCard>(board, event.source.droppableId).id },
    destination: { ...columnDestination, toColumnId: getColumnStrict<TCard>(board, event.destination?.droppableId).id },
  }
}

export const isAColumnMove = (type: string) => {
  return type === 'BOARD'
}

export const getCard = <TCard extends Card>(
  board: KanbanBoard<TCard>,
  sourceCoordinate: Coordinates['source']
): TCard => {
  const column = board.columns.find((column: any) => column.id === sourceCoordinate.fromColumnId)
  if (!column) throw new Error(`Cannot find column: ${sourceCoordinate.fromColumnId}`)
  return column.cards[sourceCoordinate.fromPosition]
}

export const getColumn = <TCard extends Card>(
  board: KanbanBoard<TCard>,
  droppableId: string
): Column<TCard> | undefined => {
  return board.columns.find(({ id }: any) => String(id) === droppableId)
}

export const getColumnStrict = <TCard extends Card>(board: KanbanBoard<TCard>, droppableId: any): Column<TCard> => {
  const column = getColumn<TCard>(board, droppableId)
  if (!column) throw new Error(`Cannot find column with ID: ${droppableId}`)
  return column
}

export const isMovingAColumnToAnotherPosition = (coordinates: Partial<Coordinates>) => {
  return coordinates.source?.fromPosition !== coordinates.destination?.toPosition
}

export const isMovingACardToAnotherPosition = (coordinates: Partial<Coordinates>) => {
  return !(
    coordinates.source?.fromPosition === coordinates.destination?.toPosition &&
    coordinates.source?.fromColumnId === coordinates.destination?.toColumnId
  )
}

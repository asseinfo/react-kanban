import React, { useState } from 'react'
import styled from 'styled-components'
import { DragDropContext } from 'react-beautiful-dnd'
import Lane from './components/Lane'
import reorderBoard from './services/reorderBoard'

const StyledBoard = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 5px;
  overflow-y: hidden;
`

function Board ({ children, onCardDragEnd }) {
  const [board, setBoard] = useState(children)

  function onDragEnd (event) {
    if (event.destination === null) return

    const source = { laneId: parseInt(event.source.droppableId), index: event.source.index }
    const destination = { laneId: parseInt(event.destination.droppableId), index: event.destination.index }

    const reorderedBoard = reorderBoard(board, source, destination)

    onCardDragEnd && onCardDragEnd(reorderedBoard, source, destination)
    setBoard(reorderedBoard)
  }

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <StyledBoard>
        {board.lanes.map(lane => (<Lane key={lane.id}>{lane}</Lane>))}
      </StyledBoard>
    </DragDropContext>
  )
}

export default Board

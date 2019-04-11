import React, { useState } from 'react'
import styled from 'styled-components'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
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

function Board ({ children, onCardDragEnd, onLaneDragEnd }) {
  const [board, setBoard] = useState(children)

  function onDragEnd (event) {
    if (event.destination === null) return

    let source, destination
    if (event.type === 'board') {
      source = { index: event.source.index }
      destination = { index: event.destination.index }
    } else {
      source = { laneId: parseInt(event.source.droppableId), index: event.source.index }
      destination = { laneId: parseInt(event.destination.droppableId), index: event.destination.index }
    }

    const reorderedBoard = reorderBoard(board, source, destination)

    if (event.type === 'board') {
      onLaneDragEnd && onLaneDragEnd(reorderedBoard, source, destination)
    } else {
      onCardDragEnd && onCardDragEnd(reorderedBoard, source, destination)
    }
    setBoard(reorderedBoard)
  }

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId='lane-droppable' direction='horizontal' type='board'>
        {provided => (
          <StyledBoard ref={provided.innerRef} {...provided.droppableProps}>
            {board.lanes.map((lane, idx) => (<Lane key={lane.id} index={idx}>{lane}</Lane>))}
            {provided.placeholder}
          </StyledBoard>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default Board

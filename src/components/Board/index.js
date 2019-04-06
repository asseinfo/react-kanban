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

function Board ({ children }) {
  const [board, setBoard] = useState(children)

  /* istanbul ignore next https://github.com/atlassian/react-beautiful-dnd/issues/1215; It's on Cypress. */
  function onDragEnd ({ source, destination }) {
    console.log(source, destination)
    if (destination === null) return

    setBoard(reorderBoard(
      board,
      { laneId: parseInt(source.droppableId), index: source.index },
      { laneId: parseInt(destination.droppableId), index: destination.index }
    ))
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

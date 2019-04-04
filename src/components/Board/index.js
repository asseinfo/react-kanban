import React, { useState } from 'react'
import styled from 'styled-components'
import { DragDropContext } from 'react-beautiful-dnd'
import Lane from './components/Lane'
import { swapElementsOfArray, removeFromArray, addInArray } from './services/array'

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
    if (destination === null) return

    var reorderedBoard
    const sourceLane = board.lanes.find(lane => lane.id === parseInt(source.droppableId))
    if (source.droppableId === destination.droppableId) {
      const reorderedLane = { ...sourceLane, cards: swapElementsOfArray(sourceLane.cards, source.index, destination.index) }
      reorderedBoard = { ...board, lanes: board.lanes.map(lane => lane.id === parseInt(source.droppableId) ? reorderedLane : lane) }
    } else {
      const destinationLane = board.lanes.find(lane => lane.id === parseInt(destination.droppableId))
      const reorderedSourceLane = { ...sourceLane, cards: removeFromArray(sourceLane.cards, source.index) }
      const reorderedDestinationLane = { ...destinationLane, cards: addInArray(destinationLane.cards, sourceLane.cards[source.index], destination.index) }
      reorderedBoard = { ...board,
        lanes: board.lanes.map(lane => {
          if (lane.id === sourceLane.id) return reorderedSourceLane
          if (lane.id === destinationLane.id) return reorderedDestinationLane
          return lane
        })
      }
    }
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

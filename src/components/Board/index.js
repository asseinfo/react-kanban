import React, { useState } from 'react'
import styled from 'styled-components'
import { DragDropContext } from 'react-beautiful-dnd'
import Lane from './components/Lane'
import LaneAdder from './components/LaneAdder'
import reorderBoard from './services/reorderBoard'
import withDroppable from '../withDroppable'
import { addInArrayAtPosition } from '../../services/utils'

const StyledBoard = styled.div`
  padding: 5px;
  overflow-y: hidden;
  display: flex;
  align-items: flex-start;
`

const Lanes = styled.div`
  white-space: nowrap;
`

const DroppableBoard = withDroppable(Lanes)

function Board ({ children, onCardDragEnd, onLaneDragEnd, renderCard, renderLaneHeader, allowAddLane, onNewLane }) {
  const [board, setBoard] = useState(children)

  function onDragEnd (event) {
    if (event.destination === null) return

    let source = { index: event.source.index }
    let destination = { index: event.destination.index }
    let propCallback = onLaneDragEnd

    if (event.type !== 'BOARD') {
      source = { ...source, laneId: parseInt(event.source.droppableId) }
      destination = { ...destination, laneId: parseInt(event.destination.droppableId) }
      propCallback = onCardDragEnd
    }

    const reorderedBoard = reorderBoard(board, source, destination)
    propCallback && propCallback(reorderedBoard, source, destination)
    setBoard(reorderedBoard)
  }

  function addLane (title) {
    const lanes = addInArrayAtPosition(board.lanes, onNewLane({ title, cards: [] }), board.lanes.length)
    setBoard({ ...board, lanes })
  }

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <StyledBoard>
        <DroppableBoard droppableId='board-droppable' direction='horizontal' type='BOARD'>
          {board.lanes.map((lane, index) => (
            <Lane key={lane.id} index={index} renderCard={renderCard} renderLaneHeader={renderLaneHeader}>{lane}</Lane>)
          )}
        </DroppableBoard>
        {allowAddLane && onNewLane && <LaneAdder onConfirm={addLane} />}
      </StyledBoard>
    </DragDropContext>
  )
}

export default Board

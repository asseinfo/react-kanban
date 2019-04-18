import React, { useState } from 'react'
import styled from 'styled-components'
import { DragDropContext } from 'react-beautiful-dnd'
import Lane from './components/Lane'
import reorderBoard from './services/reorderBoard'
import withDroppable from '../withDroppable'
import { addInArrayAtPosition } from '../../services/utils'

const StyledBoard = styled.div`
  padding: 5px;
  overflow-y: hidden;
  display: flex;
  align-items: flex-start;
`

const LaneAdder = styled.div`
  border: 2px dashed #eee;
  width: 230px;
  height: 132px;
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }
`

const Lanes = styled.div`
`

const DroppableBoard = withDroppable(Lanes)

function Board ({ children, onCardDragEnd, onLaneDragEnd, renderCard, renderLaneHeader, allowAddLane, onNewLane }) {
  const [board, setBoard] = useState(children)
  const [addingLane, setAddingLane] = useState(false)
  const inputLaneName = React.createRef()

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

  function addLane (event) {
    event.preventDefault()
    const lane = { ...onNewLane({ title: inputLaneName.current.value }), cards: [] }
    const lanes = addInArrayAtPosition(board.lanes, lane, board.lanes.length)
    setBoard({ ...board, lanes })
    setAddingLane(false)
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
        {allowAddLane && onNewLane &&
        (!addingLane
          ? <LaneAdder onClick={() => setAddingLane(true)} role='button'>➕</LaneAdder>
          : (
            <div>
              <form onSubmit={addLane}>
                <input type='text' ref={inputLaneName} /><button>Ok</button>
              </form>
            </div>
          )
        )
        }
      </StyledBoard>
    </DragDropContext>
  )
}

export default Board

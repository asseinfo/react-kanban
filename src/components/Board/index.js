import React, { useState } from 'react'
import styled from 'styled-components'
import { DragDropContext } from 'react-beautiful-dnd'
import Lane from './components/Lane'
import LaneAdder from './components/LaneAdder'
import reorderBoard from './services/reorderBoard'
import withDroppable from '../withDroppable'
import { addInArrayAtPosition, when } from '@services/utils'

const StyledBoard = styled.div`
  padding: 5px;
  overflow-y: hidden;
  display: flex;
  align-items: flex-start;
`

const Lanes = styled.div`
  white-space: nowrap;
`

const DefaultLaneHeader = styled.div`
  padding-left: 10px;
  padding-bottom: 10px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;

  span:nth-child(2) {
    cursor: pointer;
  }
`

const DroppableBoard = withDroppable(Lanes)

function Board ({
  children,
  onCardDragEnd,
  onLaneDragEnd,
  renderCard,
  renderLaneHeader,
  allowAddLane,
  onNewLane,
  disableLaneDrag,
  disableCardDrag,
  allowRemoveLane,
  onLaneRemove
}) {
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
    when(propCallback)(callback => callback(reorderedBoard, source, destination))
    setBoard(reorderedBoard)
  }

  function addLane (title) {
    const lanes = addInArrayAtPosition(board.lanes, onNewLane({ title, cards: [] }), board.lanes.length)
    setBoard({ ...board, lanes })
  }

  function removeLane (laneId) {
    const lanes = board.lanes.filter(lane => lane.id !== laneId)
    const filteredBoard = { ...board, lanes }
    onLaneRemove && onLaneRemove(filteredBoard)
    setBoard(filteredBoard)
  }

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <StyledBoard>
        <DroppableBoard droppableId='board-droppable' direction='horizontal' type='BOARD'>
          {board.lanes.map((lane, index) => (
            <Lane
              key={lane.id}
              index={index}
              renderCard={renderCard}
              renderLaneHeader={renderLaneHeader ? renderLaneHeader(lane, removeLane.bind(null, lane.id)) : (
                <DefaultLaneHeader>
                  <span>{lane.title}</span>{allowRemoveLane && <span onClick={() => removeLane(lane.id)}>×</span>}
                </DefaultLaneHeader>
              )}
              disableLaneDrag={disableLaneDrag}
              disableCardDrag={disableCardDrag}
            >
              {lane}
            </Lane>
          ))}
        </DroppableBoard>
        {allowAddLane && onNewLane && <LaneAdder onConfirm={addLane} />}
      </StyledBoard>
    </DragDropContext>
  )
}

export default Board

import React, { useState } from 'react'
import styled from 'styled-components'
import { DragDropContext } from 'react-beautiful-dnd'
import Lane from './components/Lane'
import LaneAdder from './components/LaneAdder'
import reorderBoard from './services/reorderBoard'
import withDroppable from '../withDroppable'
import { addInArrayAtPosition, when } from '@services/utils'
import DefaultLaneHeader from './components/DefaultLaneHeader'
import DefaultCard from './components/DefaultCard'

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

function Board ({
  children,
  onCardDragEnd,
  onLaneDragEnd,
  renderCard,
  renderLaneHeader,
  allowAddLane,
  onLaneNew,
  disableLaneDrag,
  disableCardDrag,
  allowRemoveLane,
  onLaneRemove,
  allowRenameLane,
  onLaneRename,
  allowRemoveCard,
  onCardRemove,
  renderLaneAdder,
  onCardNew
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

  async function addLane (lane) {
    const lanes = renderLaneAdder ? addInArrayAtPosition(board.lanes, lane, board.lanes.length)
      : addInArrayAtPosition(board.lanes, await onLaneNew(lane), board.lanes.length)

    setBoard({ ...board, lanes })
  }

  function removeLane (lane) {
    const filteredLanes = board.lanes.filter(({ id }) => id !== lane.id)
    const filteredBoard = { ...board, lanes: filteredLanes }
    onLaneRemove(filteredBoard, lane)
    setBoard(filteredBoard)
  }

  function renameLane (laneId, title) {
    const renamedLane = board.lanes.find(lane => lane.id === laneId)
    const renamedLanes = board.lanes.map(lane => lane.id === laneId ? { ...lane, title } : lane)
    const boardWithRenamedLane = { ...board, lanes: renamedLanes }
    onLaneRename(boardWithRenamedLane, { ...renamedLane, title })
    setBoard(boardWithRenamedLane)
  }

  function removeCard (lane, card) {
    const filteredCards = lane.cards.filter(({ id }) => card.id !== id)
    const laneWithoutCard = { ...lane, cards: filteredCards }
    const filteredLanes = board.lanes.map(laneMap => lane.id === laneMap.id ? laneWithoutCard : laneMap)
    const boardWithoutCard = { ...board, lanes: filteredLanes }
    onCardRemove(boardWithoutCard, laneWithoutCard, card)
    setBoard(boardWithoutCard)
  }

  function addCard (lane, card, { on } = {}) {
    const cards = addInArrayAtPosition(lane.cards, card, on === 'top' ? 0 : lane.cards.length)
    const lanes = board.lanes.map(laneMap => lane.id === laneMap.id ? { ...laneMap, cards } : laneMap)
    const boardWithNewCard = { ...board, lanes }
    onCardNew(boardWithNewCard, { ...lane, cards }, card)
    setBoard(boardWithNewCard)
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
              renderCard={(card, dragging) => {
                if (renderCard) return renderCard(card, { removeCard: removeCard.bind(null, lane, card), dragging })
                return (
                  <DefaultCard
                    dragging={dragging}
                    allowRemoveCard={allowRemoveCard}
                    onCardRemove={card => removeCard(lane, card)}
                  >
                    {card}
                  </DefaultCard>
                )
              }}
              renderLaneHeader={renderLaneHeader ? (
                renderLaneHeader(lane, {
                  removeLane: removeLane.bind(null, lane),
                  renameLane: renameLane.bind(null, lane.id),
                  addCard: addCard.bind(null, lane)
                })
              ) : (
                <DefaultLaneHeader
                  allowRemoveLane={allowRemoveLane}
                  onLaneRemove={removeLane}
                  allowRenameLane={allowRenameLane}
                  onLaneRename={renameLane}
                >
                  {lane}
                </DefaultLaneHeader>
              )}
              disableLaneDrag={disableLaneDrag}
              disableCardDrag={disableCardDrag}
            >
              {lane}
            </Lane>
          ))}
        </DroppableBoard>
        {renderLaneAdder && allowAddLane ? renderLaneAdder({ addLane })
          : allowAddLane && onLaneNew && <LaneAdder onConfirm={(title) => addLane({ title, cards: [] })} />}
      </StyledBoard>
    </DragDropContext>
  )
}

export default Board

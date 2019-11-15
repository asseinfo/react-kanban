import React, { useState } from 'react'
import styled from 'styled-components'
import { DragDropContext } from 'react-beautiful-dnd'
import Lane from './components/Lane'
import LaneAdder from './components/LaneAdder'
import withDroppable from '../withDroppable'
import { addInArrayAtPosition, when } from '@services/utils'
import DefaultLaneHeader from './components/DefaultLaneHeader'
import DefaultCard from './components/DefaultCard'
import { moveCard, moveLane, addLane, removeLane, renameLane } from './services'

const StyledBoard = styled.div`
  padding: 5px;
  overflow-y: hidden;
  display: flex;
  align-items: flex-start;
`

const Lanes = styled.div`
  white-space: nowrap;
`

function isALaneMove(type) {
  return type === 'BOARD'
}

function getCoordinates(event) {
  if (event.destination === null) return {}

  const laneSource = { fromPosition: event.source.index }
  const laneDestination = { toPosition: event.destination.index }

  if (isALaneMove(event.type)) {
    return { source: laneSource, destination: laneDestination }
  }

  return {
    source: { ...laneSource, fromLaneId: parseInt(event.source.droppableId) },
    destination: { ...laneDestination, toLaneId: parseInt(event.destination.droppableId) }
  }
}

const DroppableBoard = withDroppable(Lanes)

function Board(props) {
  return props.initialBoard ? <UncontrolledBoard {...props} /> : <ControlledBoard {...props} />
}

function UncontrolledBoard({
  initialBoard,
  onCardDragEnd,
  onLaneDragEnd,
  allowAddLane,
  renderLaneAdder,
  onNewLaneConfirm,
  onLaneRemove,
  renderLaneHeader,
  allowRemoveLane,
  allowRenameLane,
  onLaneRename,
  ...props
}) {
  const [board, setBoard] = useState(initialBoard)

  function handleOnDragEnd(event) {
    const { source, destination } = getCoordinates(event)
    if (!source) return

    const { moveCallback, dragEndCallback } = isALaneMove(event.type)
      ? {
          moveCallback: moveLane,
          dragEndCallback: onLaneDragEnd
        }
      : {
          moveCallback: moveCard,
          dragEndCallback: onCardDragEnd
        }

    const reorderedBoard = moveCallback(board, source, destination)
    when(dragEndCallback)(callback => callback(reorderedBoard, source, destination))
    setBoard(reorderedBoard)
  }

  async function handleLaneAdd(newLane) {
    const lane = renderLaneAdder ? newLane : await onNewLaneConfirm(newLane)
    setBoard(addLane(board, lane))
  }

  function handleLaneRemove(lane) {
    const filteredBoard = removeLane(board, lane)
    onLaneRemove(filteredBoard, lane)
    setBoard(filteredBoard)
  }

  function handleLaneRename(lane, title) {
    const boardWithRenamedLane = renameLane(board, lane, title)
    onLaneRename(boardWithRenamedLane, { ...lane, title })
    setBoard(boardWithRenamedLane)
  }

  return (
    <BoardContainer
      {...props}
      onDragEnd={handleOnDragEnd}
      renderLaneAdder={() => {
        if (!allowAddLane) return null
        if (renderLaneAdder) return renderLaneAdder({ addLane: handleLaneAdd })
        if (!onNewLaneConfirm) return null
        return <LaneAdder onConfirm={title => handleLaneAdd({ title, cards: [] })} />
      }}
      renderLaneHeader={lane => {
        if (renderLaneHeader)
          return renderLaneHeader(lane, {
            removeLane: handleLaneRemove.bind(null, lane),
            renameLane: handleLaneRename.bind(null, lane),
            addCard: addCard.bind(null, lane)
          })
        return (
          <DefaultLaneHeader
            allowRemoveLane={allowRemoveLane}
            onLaneRemove={handleLaneRemove}
            allowRenameLane={allowRenameLane}
            onLaneRename={handleLaneRename}
          >
            {lane}
          </DefaultLaneHeader>
        )
      }}
    >
      {board}
    </BoardContainer>
  )
}

function ControlledBoard({
  children,
  onCardDragEnd,
  onLaneDragEnd,
  allowAddLane,
  renderLaneAdder,
  onNewLaneConfirm,
  ...props
}) {
  function handleOnDragEnd(event) {
    const { source, destination } = getCoordinates(event)
    if (!source) return

    const dragEndCallback = isALaneMove(event.type) ? onLaneDragEnd : onCardDragEnd

    when(dragEndCallback)(callback => callback(source, destination))
  }

  return (
    <BoardContainer
      {...props}
      renderLaneAdder={() => {
        if (!allowAddLane) return null
        if (renderLaneAdder) return renderLaneAdder()
        if (!onNewLaneConfirm) return null
        return <LaneAdder onConfirm={onNewLaneConfirm} />
      }}
      onDragEnd={handleOnDragEnd}
    >
      {children}
    </BoardContainer>
  )
}

function BoardContainer({
  children: board,
  onDragEnd,
  renderCard,
  disableLaneDrag,
  disableCardDrag,
  renderLaneHeader,
  allowRemoveCard,
  onCardRemove,
  onCardNew,
  renderLaneAdder
}) {
  function removeCard(lane, card) {
    const filteredCards = lane.cards.filter(({ id }) => card.id !== id)
    const laneWithoutCard = { ...lane, cards: filteredCards }
    const filteredLanes = board.lanes.map(laneMap => (lane.id === laneMap.id ? laneWithoutCard : laneMap))
    const boardWithoutCard = { ...board, lanes: filteredLanes }
    onCardRemove(boardWithoutCard, laneWithoutCard, card)
    setBoard(boardWithoutCard)
  }

  function addCard(lane, card, { on } = {}) {
    const cards = addInArrayAtPosition(lane.cards, card, on === 'top' ? 0 : lane.cards.length)
    const lanes = board.lanes.map(laneMap => (lane.id === laneMap.id ? { ...laneMap, cards } : laneMap))
    const boardWithNewCard = { ...board, lanes }
    onCardNew(boardWithNewCard, { ...lane, cards }, card)
    setBoard(boardWithNewCard)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
              renderLaneHeader={renderLaneHeader}
              disableLaneDrag={disableLaneDrag}
              disableCardDrag={disableCardDrag}
            >
              {lane}
            </Lane>
          ))}
        </DroppableBoard>
        {renderLaneAdder()}
      </StyledBoard>
    </DragDropContext>
  )
}

export default Board

import React, { useState } from 'react'
import styled from 'styled-components'
import { DragDropContext } from 'react-beautiful-dnd'
import Lane from './components/Lane'
import LaneAdder from './components/LaneAdder'
import withDroppable from '../withDroppable'
import { when } from '@services/utils'
import DefaultLaneHeader from './components/DefaultLaneHeader'
import DefaultCard from './components/DefaultCard'
import { moveCard, moveLane, addLane, removeLane, renameLane, addCard, removeCard } from './services'

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
  onCardNew,
  renderCard,
  allowRemoveCard,
  onCardRemove,
  onLaneNew
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
    const boardWithNewLane = addLane(board, lane)
    onLaneNew(boardWithNewLane, lane)
    setBoard(boardWithNewLane)
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

  function handleCardAdd(lane, card, options = {}) {
    const boardWithNewCard = addCard(board, lane, card, options)
    onCardNew(
      boardWithNewCard,
      boardWithNewCard.lanes.find(({ id }) => id === lane.id),
      card
    )
    setBoard(boardWithNewCard)
  }

  function handleCardRemove(lane, card) {
    const boardWithoutCard = removeCard(board, lane, card)
    onCardRemove(
      boardWithoutCard,
      boardWithoutCard.lanes.find(({ id }) => id === lane.id),
      card
    )
    setBoard(boardWithoutCard)
  }

  return (
    <BoardContainer
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
            addCard: handleCardAdd.bind(null, lane)
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
      renderCard={(lane, card, dragging) => {
        if (renderCard) return renderCard(card, { removeCard: handleCardRemove.bind(null, lane, card), dragging })
        return (
          <DefaultCard
            dragging={dragging}
            allowRemoveCard={allowRemoveCard}
            onCardRemove={card => handleCardRemove(lane, card)}
          >
            {card}
          </DefaultCard>
        )
      }}
    >
      {board}
    </BoardContainer>
  )
}

function ControlledBoard({
  children: board,
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
  renderCard,
  allowRemoveCard,
  onCardRemove
}) {
  function handleOnDragEnd(event) {
    const { source, destination } = getCoordinates(event)
    if (!source) return

    const dragEndCallback = isALaneMove(event.type) ? onLaneDragEnd : onCardDragEnd

    when(dragEndCallback)(callback => callback(source, destination))
  }

  return (
    <BoardContainer
      onDragEnd={handleOnDragEnd}
      renderLaneAdder={() => {
        if (!allowAddLane) return null
        if (renderLaneAdder) return renderLaneAdder()
        if (!onNewLaneConfirm) return null
        return <LaneAdder onConfirm={title => onNewLaneConfirm({ title, cards: [] })} />
      }}
      renderLaneHeader={lane => {
        if (renderLaneHeader) return renderLaneHeader(lane)
        return (
          <DefaultLaneHeader
            allowRemoveLane={allowRemoveLane}
            onLaneRemove={onLaneRemove}
            allowRenameLane={allowRenameLane}
            onLaneRename={onLaneRename}
          >
            {lane}
          </DefaultLaneHeader>
        )
      }}
      renderCard={(_lane, card, dragging) => {
        if (renderCard) return renderCard(card, { dragging })
        return (
          <DefaultCard dragging={dragging} allowRemoveCard={allowRemoveCard} onCardRemove={onCardRemove}>
            {card}
          </DefaultCard>
        )
      }}
    >
      {board}
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
  renderLaneAdder
}) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StyledBoard>
        <DroppableBoard droppableId='board-droppable' direction='horizontal' type='BOARD'>
          {board.lanes.map((lane, index) => (
            <Lane
              key={lane.id}
              index={index}
              renderCard={renderCard}
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

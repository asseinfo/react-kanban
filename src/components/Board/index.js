import React, { useState } from 'react'
import styled from 'styled-components'
import { DragDropContext } from 'react-beautiful-dnd'
import Lane from './components/Lane'
import LaneAdder from './components/LaneAdder'
import withDroppable from '../withDroppable'
import { when, partialRight } from '@services/utils'
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
  onLaneNew,
  disableCardDrag,
  disableLaneDrag
}) {
  const [board, setBoard] = useState(initialBoard)
  const handleOnCardDragEnd = partialRight(handleOnDragEnd, { moveCallback: moveCard, notifyCallback: onCardDragEnd })
  const handleOnLaneDragEnd = partialRight(handleOnDragEnd, { moveCallback: moveLane, notifyCallback: onLaneDragEnd })

  function handleOnDragEnd({ source, destination }, { moveCallback, notifyCallback }) {
    const reorderedBoard = moveCallback(board, source, destination)
    when(notifyCallback)(callback => callback(reorderedBoard, source, destination))
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
      onCardDragEnd={handleOnCardDragEnd}
      onLaneDragEnd={handleOnLaneDragEnd}
      renderLaneAdder={() => {
        if (!allowAddLane) return null
        if (renderLaneAdder) return renderLaneAdder({ addLane: handleLaneAdd })
        if (!onNewLaneConfirm) return null
        return <LaneAdder onConfirm={title => handleLaneAdd({ title, cards: [] })} />
      }}
      {...(renderLaneHeader && {
        renderLaneHeader: lane =>
          renderLaneHeader(lane, {
            removeLane: handleLaneRemove.bind(null, lane),
            renameLane: handleLaneRename.bind(null, lane),
            addCard: handleCardAdd.bind(null, lane)
          })
      })}
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
      allowRemoveLane={allowRemoveLane}
      onLaneRemove={handleLaneRemove}
      allowRenameLane={allowRenameLane}
      onLaneRename={handleLaneRename}
      disableLaneDrag={disableLaneDrag}
      disableCardDrag={disableCardDrag}
      onCardAdd={handleCardAdd}
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
  onCardRemove,
  disableCardDrag,
  disableLaneDrag
}) {
  function handleOnCardDragEnd({ source, destination }) {
    when(onCardDragEnd)(callback => callback(source, destination))
  }

  function handleOnLaneDragEnd({ source, destination }) {
    when(onLaneDragEnd)(callback => callback(source, destination))
  }

  return (
    <BoardContainer
      onCardDragEnd={handleOnCardDragEnd}
      onLaneDragEnd={handleOnLaneDragEnd}
      renderLaneAdder={() => {
        if (!allowAddLane) return null
        if (renderLaneAdder) return renderLaneAdder()
        if (!onNewLaneConfirm) return null
        return <LaneAdder onConfirm={title => onNewLaneConfirm({ title, cards: [] })} />
      }}
      {...(renderLaneHeader && { renderLaneHeader: renderLaneHeader })}
      renderCard={(_lane, card, dragging) => {
        if (renderCard) return renderCard(card, { dragging })
        return (
          <DefaultCard dragging={dragging} allowRemoveCard={allowRemoveCard} onCardRemove={onCardRemove}>
            {card}
          </DefaultCard>
        )
      }}
      allowRemoveLane={allowRemoveLane}
      onLaneRemove={onLaneRemove}
      allowRenameLane={allowRenameLane}
      onLaneRename={onLaneRename}
      disableLaneDrag={disableLaneDrag}
      disableCardDrag={disableCardDrag}
    >
      {board}
    </BoardContainer>
  )
}

function BoardContainer({
  children: board,
  renderCard,
  disableLaneDrag,
  disableCardDrag,
  renderLaneHeader,
  renderLaneAdder,
  allowRemoveLane,
  onLaneRemove,
  allowRenameLane,
  onLaneRename,
  onLaneDragEnd,
  onCardDragEnd,
  onCardAdd
}) {
  function handleOnDragEnd(event) {
    const coordinates = getCoordinates(event)
    if (!coordinates.source) return

    isALaneMove(event.type) ? onLaneDragEnd(coordinates) : onCardDragEnd(coordinates)
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <StyledBoard>
        <DroppableBoard droppableId='board-droppable' direction='horizontal' type='BOARD'>
          {board.lanes.map((lane, index) => (
            <Lane
              key={lane.id}
              index={index}
              renderCard={renderCard}
              renderLaneHeader={lane =>
                renderLaneHeader ? (
                  renderLaneHeader(lane)
                ) : (
                  <DefaultLaneHeader
                    allowRemoveLane={allowRemoveLane}
                    onLaneRemove={onLaneRemove}
                    allowRenameLane={allowRenameLane}
                    onLaneRename={onLaneRename}
                    onCardAdd={onCardAdd}
                  >
                    {lane}
                  </DefaultLaneHeader>
                )
              }
              disableLaneDrag={disableLaneDrag}
              disableCardDrag={disableCardDrag}
              onCardAdd={onCardAdd}
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

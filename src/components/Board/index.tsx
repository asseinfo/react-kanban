import { forwardRef, useState } from 'react'
// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { DragDropContext } from 'react-beautiful-dnd'
import Column from './components/Column'
import ColumnAdder from './components/ColumnAdder'
import withDroppable from '../withDroppable'
import { when, partialRight } from '@services/utils'
import DefaultColumnHeader from './components/DefaultColumnHeader'
import DefaultCard from './components/DefaultCard'
import {
  getCard,
  getCoordinates,
  isAColumnMove,
  isMovingAColumnToAnotherPosition,
  isMovingACardToAnotherPosition,
} from './services'
import { moveCard, moveColumn, addColumn, removeColumn, changeColumn, addCard, removeCard } from '@services/helpers'

// @ts-expect-error TS(2322) FIXME: Type 'ForwardedRef<unknown>' is not assignable to ... Remove this comment to see the full error message
const Columns = forwardRef((props, ref) => <div ref={ref} style={{ whiteSpace: 'nowrap' }} {...props} />)

const DroppableBoard = withDroppable(Columns)

// @ts-expect-error TS(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
function Board(props) {
  return props.initialBoard ? <UncontrolledBoard {...props} /> : <ControlledBoard {...props} />
}

function UncontrolledBoard({
  // @ts-expect-error TS(7031) FIXME: Binding element 'initialBoard' implicitly has an '... Remove this comment to see the full error message
  initialBoard,
  // @ts-expect-error TS(7031) FIXME: Binding element 'onCardDragEnd' implicitly has an ... Remove this comment to see the full error message
  onCardDragEnd,
  // @ts-expect-error TS(7031) FIXME: Binding element 'onColumnDragEnd' implicitly has a... Remove this comment to see the full error message
  onColumnDragEnd,
  // @ts-expect-error TS(7031) FIXME: Binding element 'allowAddColumn' implicitly has an... Remove this comment to see the full error message
  allowAddColumn,
  // @ts-expect-error TS(7031) FIXME: Binding element 'renderColumnAdder' implicitly has... Remove this comment to see the full error message
  renderColumnAdder,
  // @ts-expect-error TS(7031) FIXME: Binding element 'onNewColumnConfirm' implicitly ha... Remove this comment to see the full error message
  onNewColumnConfirm,
  // @ts-expect-error TS(7031) FIXME: Binding element 'onColumnRemove' implicitly has an... Remove this comment to see the full error message
  onColumnRemove,
  // @ts-expect-error TS(7031) FIXME: Binding element 'renderColumnHeader' implicitly ha... Remove this comment to see the full error message
  renderColumnHeader,
  // @ts-expect-error TS(7031) FIXME: Binding element 'allowRemoveColumn' implicitly has... Remove this comment to see the full error message
  allowRemoveColumn,
  // @ts-expect-error TS(7031) FIXME: Binding element 'allowRenameColumn' implicitly has... Remove this comment to see the full error message
  allowRenameColumn,
  // @ts-expect-error TS(7031) FIXME: Binding element 'onColumnRename' implicitly has an... Remove this comment to see the full error message
  onColumnRename,
  // @ts-expect-error TS(7031) FIXME: Binding element 'onCardNew' implicitly has an 'any... Remove this comment to see the full error message
  onCardNew,
  // @ts-expect-error TS(7031) FIXME: Binding element 'renderCard' implicitly has an 'an... Remove this comment to see the full error message
  renderCard,
  // @ts-expect-error TS(7031) FIXME: Binding element 'allowRemoveCard' implicitly has a... Remove this comment to see the full error message
  allowRemoveCard,
  // @ts-expect-error TS(7031) FIXME: Binding element 'onCardRemove' implicitly has an '... Remove this comment to see the full error message
  onCardRemove,
  // @ts-expect-error TS(7031) FIXME: Binding element 'onColumnNew' implicitly has an 'a... Remove this comment to see the full error message
  onColumnNew,
  // @ts-expect-error TS(7031) FIXME: Binding element 'disableCardDrag' implicitly has a... Remove this comment to see the full error message
  disableCardDrag,
  // @ts-expect-error TS(7031) FIXME: Binding element 'disableColumnDrag' implicitly has... Remove this comment to see the full error message
  disableColumnDrag,
  // @ts-expect-error TS(7031) FIXME: Binding element 'allowAddCard' implicitly has an '... Remove this comment to see the full error message
  allowAddCard,
  // @ts-expect-error TS(7031) FIXME: Binding element 'onNewCardConfirm' implicitly has ... Remove this comment to see the full error message
  onNewCardConfirm,
}) {
  const [board, setBoard] = useState(initialBoard)
  const handleOnCardDragEnd = partialRight(handleOnDragEnd, { moveCallback: moveCard, notifyCallback: onCardDragEnd })
  const handleOnColumnDragEnd = partialRight(handleOnDragEnd, {
    moveCallback: moveColumn,
    notifyCallback: onColumnDragEnd,
  })

  // @ts-expect-error TS(7031) FIXME: Binding element 'source' implicitly has an 'any' t... Remove this comment to see the full error message
  function handleOnDragEnd({ source, destination, subject }, { moveCallback, notifyCallback }) {
    const reorderedBoard = moveCallback(board, source, destination)
    // @ts-expect-error TS(7006) FIXME: Parameter 'callback' implicitly has an 'any' type.
    when(notifyCallback)((callback) => callback(reorderedBoard, subject, source, destination))
    setBoard(reorderedBoard)
  }

  // @ts-expect-error TS(2705) FIXME: An async function or method in ES5/ES3 requires th... Remove this comment to see the full error message
  async function handleColumnAdd(newColumn) {
    const column = renderColumnAdder ? newColumn : await onNewColumnConfirm(newColumn)
    const boardWithNewColumn = addColumn(board, column)
    onColumnNew(boardWithNewColumn, column)
    setBoard(boardWithNewColumn)
  }

  // @ts-expect-error TS(7006) FIXME: Parameter 'column' implicitly has an 'any' type.
  function handleColumnRemove(column) {
    const filteredBoard = removeColumn(board, column)
    onColumnRemove(filteredBoard, column)
    setBoard(filteredBoard)
  }

  // @ts-expect-error TS(7006) FIXME: Parameter 'column' implicitly has an 'any' type.
  function handleColumnRename(column, title) {
    const boardWithRenamedColumn = changeColumn(board, column, { title })
    onColumnRename(boardWithRenamedColumn, { ...column, title })
    setBoard(boardWithRenamedColumn)
  }

  // @ts-expect-error TS(7006) FIXME: Parameter 'column' implicitly has an 'any' type.
  function handleCardAdd(column, card, options = {}) {
    const boardWithNewCard = addCard(board, column, card, options)

    onCardNew(
      boardWithNewCard,
      // @ts-expect-error TS(7031) FIXME: Binding element 'id' implicitly has an 'any' type.
      boardWithNewCard.columns.find(({ id }) => id === column.id),
      card
    )
    setBoard(boardWithNewCard)
  }

  // @ts-expect-error TS(2705) FIXME: An async function or method in ES5/ES3 requires th... Remove this comment to see the full error message
  async function handleDraftCardAdd(column, card, options = {}) {
    const newCard = await onNewCardConfirm(card)
    handleCardAdd(column, newCard, options)
  }

  // @ts-expect-error TS(7006) FIXME: Parameter 'column' implicitly has an 'any' type.
  function handleCardRemove(column, card) {
    const boardWithoutCard = removeCard(board, column, card)
    onCardRemove(
      boardWithoutCard,
      // @ts-expect-error TS(7031) FIXME: Binding element 'id' implicitly has an 'any' type.
      boardWithoutCard.columns.find(({ id }) => id === column.id),
      card
    )
    setBoard(boardWithoutCard)
  }

  return (
    <BoardContainer
      onCardDragEnd={handleOnCardDragEnd}
      onColumnDragEnd={handleOnColumnDragEnd}
      renderColumnAdder={() => {
        if (!allowAddColumn) return null
        if (renderColumnAdder) return renderColumnAdder({ addColumn: handleColumnAdd })
        if (!onNewColumnConfirm) return null
        // @ts-expect-error TS(7006) FIXME: Parameter 'title' implicitly has an 'any' type.
        return <ColumnAdder onConfirm={(title) => handleColumnAdd({ title, cards: [] })} />
      }}
      {...(renderColumnHeader && {
        // @ts-expect-error TS(7006) FIXME: Parameter 'column' implicitly has an 'any' type.
        renderColumnHeader: (column) =>
          renderColumnHeader(column, {
            removeColumn: handleColumnRemove.bind(null, column),
            renameColumn: handleColumnRename.bind(null, column),
            addCard: handleCardAdd.bind(null, column),
          }),
      })}
      // @ts-expect-error TS(7006) FIXME: Parameter 'column' implicitly has an 'any' type.
      renderCard={(column, card, dragging) => {
        if (renderCard) return renderCard(card, { removeCard: handleCardRemove.bind(null, column, card), dragging })
        return (
          <DefaultCard
            dragging={dragging}
            allowRemoveCard={allowRemoveCard}
            // @ts-expect-error TS(7006) FIXME: Parameter 'card' implicitly has an 'any' type.
            onCardRemove={(card) => handleCardRemove(column, card)}
          >
            {card}
          </DefaultCard>
        )
      }}
      allowRemoveColumn={allowRemoveColumn}
      onColumnRemove={handleColumnRemove}
      allowRenameColumn={allowRenameColumn}
      onColumnRename={handleColumnRename}
      disableColumnDrag={disableColumnDrag}
      disableCardDrag={disableCardDrag}
      // @ts-expect-error TS(7006) FIXME: Parameter 'column' implicitly has an 'any' type.
      onCardNew={(column, card) => handleDraftCardAdd(column, card, allowAddCard)}
      allowAddCard={allowAddCard && onNewCardConfirm}
    >
      {board}
    </BoardContainer>
  )
}

function ControlledBoard({
  // @ts-expect-error TS(7031) FIXME: Binding element 'board' implicitly has an 'any' ty... Remove this comment to see the full error message
  children: board,
  // @ts-expect-error TS(7031) FIXME: Binding element 'onCardDragEnd' implicitly has an ... Remove this comment to see the full error message
  onCardDragEnd,
  // @ts-expect-error TS(7031) FIXME: Binding element 'onColumnDragEnd' implicitly has a... Remove this comment to see the full error message
  onColumnDragEnd,
  // @ts-expect-error TS(7031) FIXME: Binding element 'allowAddColumn' implicitly has an... Remove this comment to see the full error message
  allowAddColumn,
  // @ts-expect-error TS(7031) FIXME: Binding element 'renderColumnAdder' implicitly has... Remove this comment to see the full error message
  renderColumnAdder,
  // @ts-expect-error TS(7031) FIXME: Binding element 'onNewColumnConfirm' implicitly ha... Remove this comment to see the full error message
  onNewColumnConfirm,
  // @ts-expect-error TS(7031) FIXME: Binding element 'onColumnRemove' implicitly has an... Remove this comment to see the full error message
  onColumnRemove,
  // @ts-expect-error TS(7031) FIXME: Binding element 'renderColumnHeader' implicitly ha... Remove this comment to see the full error message
  renderColumnHeader,
  // @ts-expect-error TS(7031) FIXME: Binding element 'allowRemoveColumn' implicitly has... Remove this comment to see the full error message
  allowRemoveColumn,
  // @ts-expect-error TS(7031) FIXME: Binding element 'allowRenameColumn' implicitly has... Remove this comment to see the full error message
  allowRenameColumn,
  // @ts-expect-error TS(7031) FIXME: Binding element 'onColumnRename' implicitly has an... Remove this comment to see the full error message
  onColumnRename,
  // @ts-expect-error TS(7031) FIXME: Binding element 'renderCard' implicitly has an 'an... Remove this comment to see the full error message
  renderCard,
  // @ts-expect-error TS(7031) FIXME: Binding element 'allowRemoveCard' implicitly has a... Remove this comment to see the full error message
  allowRemoveCard,
  // @ts-expect-error TS(7031) FIXME: Binding element 'onCardRemove' implicitly has an '... Remove this comment to see the full error message
  onCardRemove,
  // @ts-expect-error TS(7031) FIXME: Binding element 'disableCardDrag' implicitly has a... Remove this comment to see the full error message
  disableCardDrag,
  // @ts-expect-error TS(7031) FIXME: Binding element 'disableColumnDrag' implicitly has... Remove this comment to see the full error message
  disableColumnDrag,
}) {
  const handleOnCardDragEnd = partialRight(handleOnDragEnd, { notifyCallback: onCardDragEnd })
  const handleOnColumnDragEnd = partialRight(handleOnDragEnd, { notifyCallback: onColumnDragEnd })

  // @ts-expect-error TS(7031) FIXME: Binding element 'source' implicitly has an 'any' t... Remove this comment to see the full error message
  function handleOnDragEnd({ source, destination, subject }, { notifyCallback }) {
    // @ts-expect-error TS(7006) FIXME: Parameter 'callback' implicitly has an 'any' type.
    when(notifyCallback)((callback) => callback(subject, source, destination))
  }

  return (
    <BoardContainer
      onCardDragEnd={handleOnCardDragEnd}
      onColumnDragEnd={handleOnColumnDragEnd}
      renderColumnAdder={() => {
        if (!allowAddColumn) return null
        if (renderColumnAdder) return renderColumnAdder()
        if (!onNewColumnConfirm) return null
        // @ts-expect-error TS(7006) FIXME: Parameter 'title' implicitly has an 'any' type.
        return <ColumnAdder onConfirm={(title) => onNewColumnConfirm({ title, cards: [] })} />
      }}
      {...(renderColumnHeader && { renderColumnHeader: renderColumnHeader })}
      // @ts-expect-error TS(7006) FIXME: Parameter '_column' implicitly has an 'any' type.
      renderCard={(_column, card, dragging) => {
        if (renderCard) return renderCard(card, { dragging })
        return (
          <DefaultCard dragging={dragging} allowRemoveCard={allowRemoveCard} onCardRemove={onCardRemove}>
            {card}
          </DefaultCard>
        )
      }}
      allowRemoveColumn={allowRemoveColumn}
      onColumnRemove={onColumnRemove}
      allowRenameColumn={allowRenameColumn}
      onColumnRename={onColumnRename}
      disableColumnDrag={disableColumnDrag}
      disableCardDrag={disableCardDrag}
    >
      {board}
    </BoardContainer>
  )
}

function BoardContainer({
  // @ts-expect-error TS(7031) FIXME: Binding element 'board' implicitly has an 'any' ty... Remove this comment to see the full error message
  children: board,
  // @ts-expect-error TS(7031) FIXME: Binding element 'renderCard' implicitly has an 'an... Remove this comment to see the full error message
  renderCard,
  // @ts-expect-error TS(7031) FIXME: Binding element 'disableColumnDrag' implicitly has... Remove this comment to see the full error message
  disableColumnDrag,
  // @ts-expect-error TS(7031) FIXME: Binding element 'disableCardDrag' implicitly has a... Remove this comment to see the full error message
  disableCardDrag,
  // @ts-expect-error TS(7031) FIXME: Binding element 'renderColumnHeader' implicitly ha... Remove this comment to see the full error message
  renderColumnHeader,
  // @ts-expect-error TS(7031) FIXME: Binding element 'renderColumnAdder' implicitly has... Remove this comment to see the full error message
  renderColumnAdder,
  // @ts-expect-error TS(7031) FIXME: Binding element 'allowRemoveColumn' implicitly has... Remove this comment to see the full error message
  allowRemoveColumn,
  // @ts-expect-error TS(7031) FIXME: Binding element 'onColumnRemove' implicitly has an... Remove this comment to see the full error message
  onColumnRemove,
  // @ts-expect-error TS(7031) FIXME: Binding element 'allowRenameColumn' implicitly has... Remove this comment to see the full error message
  allowRenameColumn,
  // @ts-expect-error TS(7031) FIXME: Binding element 'onColumnRename' implicitly has an... Remove this comment to see the full error message
  onColumnRename,
  // @ts-expect-error TS(7031) FIXME: Binding element 'onColumnDragEnd' implicitly has a... Remove this comment to see the full error message
  onColumnDragEnd,
  // @ts-expect-error TS(7031) FIXME: Binding element 'onCardDragEnd' implicitly has an ... Remove this comment to see the full error message
  onCardDragEnd,
  // @ts-expect-error TS(7031) FIXME: Binding element 'onCardNew' implicitly has an 'any... Remove this comment to see the full error message
  onCardNew,
  // @ts-expect-error TS(7031) FIXME: Binding element 'allowAddCard' implicitly has an '... Remove this comment to see the full error message
  allowAddCard,
}) {
  // @ts-expect-error TS(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  function handleOnDragEnd(event) {
    const coordinates = getCoordinates(event, board)
    if (!coordinates.source) return

    isAColumnMove(event.type)
      ? isMovingAColumnToAnotherPosition(coordinates) &&
        onColumnDragEnd({ ...coordinates, subject: board.columns[coordinates.source.fromPosition] })
      : isMovingACardToAnotherPosition(coordinates) &&
        onCardDragEnd({ ...coordinates, subject: getCard(board, coordinates.source) })
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div style={{ overflowY: 'hidden', display: 'flex', alignItems: 'flex-start' }} className='react-kanban-board'>
        {/* @ts-expect-error TS(2604) FIXME: JSX element type 'DroppableBoard' does not have an... Remove this comment to see the full error message */}
        <DroppableBoard droppableId='board-droppable' direction='horizontal' type='BOARD'>
          {/* @ts-expect-error TS(7006) FIXME: Parameter 'column' implicitly has an 'any' type. */}
          {board.columns.map((column, index) => (
            <Column
              key={column.id}
              index={index}
              renderCard={renderCard}
              // @ts-expect-error TS(7006) FIXME: Parameter 'column' implicitly has an 'any' type.
              renderColumnHeader={(column) =>
                renderColumnHeader ? (
                  renderColumnHeader(column)
                ) : (
                  <DefaultColumnHeader
                    allowRemoveColumn={allowRemoveColumn}
                    onColumnRemove={onColumnRemove}
                    allowRenameColumn={allowRenameColumn}
                    onColumnRename={onColumnRename}
                  >
                    {column}
                  </DefaultColumnHeader>
                )
              }
              disableColumnDrag={disableColumnDrag}
              disableCardDrag={disableCardDrag}
              onCardNew={onCardNew}
              allowAddCard={allowAddCard}
            >
              {column}
            </Column>
          ))}
        </DroppableBoard>
        {renderColumnAdder()}
      </div>
    </DragDropContext>
  )
}

export default Board

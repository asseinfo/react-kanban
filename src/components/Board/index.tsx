import { FC, forwardRef, useState } from 'react'
import { DragDropContext, DragDropContextProps } from 'react-beautiful-dnd'
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
import { Props } from '../../types'

const Columns = forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref} style={{ whiteSpace: 'nowrap' }} {...props} />
))

const DroppableBoard = withDroppable(Columns)
const Board: FC<Props> = (props) => {
  return props.initialBoard ? <UncontrolledBoard {...props} /> : <ControlledBoard {...props} />
}

const UncontrolledBoard: FC<Props> = ({
  initialBoard,
  onCardDragEnd,
  onColumnDragEnd,
  allowAddColumn,
  renderColumnAdder,
  onNewColumnConfirm,
  onColumnRemove,
  renderColumnHeader,
  allowRemoveColumn,
  allowRenameColumn,
  onColumnRename,
  onCardNew,
  renderCard,
  allowRemoveCard,
  onCardRemove,
  onColumnNew,
  disableCardDrag,
  disableColumnDrag,
  allowAddCard,
  onNewCardConfirm,
}) => {
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

const ControlledBoard: FC<Props> = ({
  children: board,
  onCardDragEnd,
  onColumnDragEnd,
  allowAddColumn,
  renderColumnAdder,
  onNewColumnConfirm,
  onColumnRemove,
  renderColumnHeader,
  allowRemoveColumn,
  allowRenameColumn,
  onColumnRename,
  renderCard,
  allowRemoveCard,
  onCardRemove,
  disableCardDrag,
  disableColumnDrag,
}) => {
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

const BoardContainer: FC<Props> = ({
  children: board,
  renderCard,
  disableColumnDrag,
  disableCardDrag,
  renderColumnHeader,
  renderColumnAdder,
  allowRemoveColumn,
  onColumnRemove,
  allowRenameColumn,
  onColumnRename,
  onColumnDragEnd,
  onCardDragEnd,
  onCardNew,
  allowAddCard,
}) => {
  const handleOnDragEnd: DragDropContextProps['onDragEnd'] = (event) => {
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

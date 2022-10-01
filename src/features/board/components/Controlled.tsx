import { FC } from 'react'

import { ColumnAdder } from '@/features/column-adder'
import { DefaultCard } from '@/features/card'
import { BoardContainer, OnDragEnd } from './Container'
import { Card, CardBag, Column, KanbanBoard } from '@/types'

export const ControlledBoard: FC<Props> = ({
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
  // when(notifyCallback)((callback) => callback(subject, source, destination))
  // const handleOnColumnDragEnd = ({ source, destination, subject }: OnDragEnd<Column>) => {
  //   when2(onColumnDragEnd, (onColumnDragEndVerified) => onColumnDragEndVerified(subject, source, destination))
  // }

  const handleOnCardDragEnd = ({ source, destination, subject }: OnDragEnd<Card>) => {
    if (onCardDragEnd) {
      onCardDragEnd(subject, source, destination)
    }
  }
  const handleOnColumnDragEnd = ({ source, destination, subject }: OnDragEnd<Column>) => {
    if (onColumnDragEnd) {
      onColumnDragEnd(subject, source, destination)
    }
  }

  return (
    <BoardContainer
      onCardDragEnd={handleOnCardDragEnd}
      onColumnDragEnd={handleOnColumnDragEnd}
      renderColumnAdder={() => {
        if (!allowAddColumn) return null
        if (renderColumnAdder) return renderColumnAdder()
        if (!onNewColumnConfirm) return null
        return <ColumnAdder onConfirm={(title) => onNewColumnConfirm({ title, cards: [] })} />
      }}
      renderColumnHeader={renderColumnHeader}
      renderCard={(_column, card, dragging) => {
        if (renderCard) return renderCard(card, { dragging })
        return (
          <DefaultCard dragging={dragging} allowRemoveCard={!!allowRemoveCard} onCardRemove={onCardRemove}>
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
      // TODO: Check these
      onCardNew={() => {}}
      allowAddCard
    >
      {board}
    </BoardContainer>
  )
}

type OnDragEndNotification<TSubject> = (
  subject: TSubject,
  source: OnDragEnd<TSubject>['source'],
  destination: OnDragEnd<TSubject>['destination']
) => void
interface Props {
  children: KanbanBoard
  onCardDragEnd?: OnDragEndNotification<Card>
  onColumnDragEnd?: OnDragEndNotification<Column>
  allowAddColumn: boolean
  renderColumnAdder: () => JSX.Element
  onNewColumnConfirm: (column: Omit<Column, 'id'>) => Column
  onColumnRemove: () => void
  renderColumnHeader: () => JSX.Element
  allowRemoveColumn: boolean
  allowRenameColumn: boolean
  onColumnRename: () => void
  renderCard: (card: Card, cardBag: CardBag) => JSX.Element
  allowRemoveCard: boolean
  onCardRemove: () => void
  disableCardDrag: boolean
  disableColumnDrag: boolean
}

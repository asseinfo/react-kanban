import React from 'react'
import styled from 'styled-components'
import CardSkeleton from '../CardSkeleton'
import CursorPointer from '../CursorPointer'

const DefaultCard = styled(CardSkeleton)`
  border-radius: 3px;
  background-color: #fff;
  padding: 10px;
  margin-bottom: 7px;

  ${({ dragging }) =>
    dragging &&
    `
    box-shadow: 2px 2px grey;
  `}
`

const CardTitle = styled.div`
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
`

const CardDescription = styled.div`
  padding-top: 10px;
`

export default function({ children: card, dragging, allowRemoveCard, onCardRemove }) {
  return (
    <DefaultCard dragging={dragging}>
      <span>
        <CardTitle>
          <span>{card.title}</span>
          {allowRemoveCard && <CursorPointer onClick={() => onCardRemove(card)}>×</CursorPointer>}
        </CardTitle>
      </span>
      <CardDescription>{card.description}</CardDescription>
    </DefaultCard>
  )
}

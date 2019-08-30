import React from 'react'
import styled from 'styled-components'
import CardSkeleton from '../CardSkeleton'

const DefaultCard = styled(CardSkeleton)`
  border-radius: 3px;
  background-color: #fff;

  ${({ dragging }) => dragging && `
    box-shadow: 2px 2px grey;
  `}
`

const CardTitle = styled.div`
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
  font-weight: bold
`

const CardDescription = styled.div`
  padding-top: 10px;
`

export default function ({ children: card, dragging, allowRemoveCard, onCardRemove }) {
  return (
    <DefaultCard dragging={dragging}>
      <span>
        <CardTitle>
          {card.title}
          {allowRemoveCard && <span onClick={() => onCardRemove(card)}>×</span>}
        </CardTitle>
      </span>
      <CardDescription>{card.description}</CardDescription>
    </DefaultCard>
  )
}

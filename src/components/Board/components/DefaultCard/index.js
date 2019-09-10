import React from 'react'
import styled from 'styled-components'
import CursorPointer from '../CursorPointer'

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

export default function ({ children: card, dragging, allowRemoveCard, onCardRemove }) {
  return (
    <div>
      <span>
        <CardTitle>
          <span>{card.title}</span>
          {allowRemoveCard && <CursorPointer onClick={() => onCardRemove(card)}>×</CursorPointer>}
        </CardTitle>
      </span>
      <CardDescription>{card.description}</CardDescription>
    </div>
  )
}

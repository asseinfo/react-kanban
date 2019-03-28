import React from 'react'
import styled from 'styled-components'
import Card from './components/Card'

const StyledLane = styled.div`
  height: 100%;
  padding: 15px;
  border-radius: 2px;
  background-color: #eee;
  margin: 5px;
`

const LaneTitle = styled.div`
  padding-left: 10px;
  padding-bottom: 10px;
  font-weight: bold;
`

function Lane ({ children }) {
  return (
    <StyledLane>
      <LaneTitle>{children.title}</LaneTitle>
      {children.cards.map(card => (<Card key={card.id}>{card}</Card>))}
    </StyledLane>
  )
}

export default Lane

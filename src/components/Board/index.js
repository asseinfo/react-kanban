import React from 'react'
import styled from 'styled-components'
import Lane from './components/Lane'

const StyledBoard = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 5px;
  overflow-y: hidden;
`

function Board ({ children }) {
  return (
    <StyledBoard>
      {children.lanes.map(lane => (<Lane key={lane.id}>{lane}</Lane>))}
    </StyledBoard>
  )
}

export default Board

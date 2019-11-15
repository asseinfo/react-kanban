import React, { useState } from 'react'
import styled from 'styled-components'
import LaneForm from './components/LaneForm'

const LaneAdderPlaceholder = styled.div`
  border: 2px dashed #eee;
  min-width: 230px;
  height: 132px;
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }
`

function LaneAdder({ onConfirm }) {
  const [isAddingLane, setAddingLane] = useState(false)

  function confirmLane(title) {
    onConfirm(title)
    setAddingLane(false)
  }

  return isAddingLane ? (
    <LaneForm onConfirm={confirmLane} onCancel={() => setAddingLane(false)} />
  ) : (
    <LaneAdderPlaceholder onClick={() => setAddingLane(true)} role='button'>
      ➕
    </LaneAdderPlaceholder>
  )
}

export default LaneAdder

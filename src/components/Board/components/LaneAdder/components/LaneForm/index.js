import React from 'react'
import styled from 'styled-components'
import { StyledLane } from '../../../Lane'
import { when } from '@services/utils'

const StyledLaneForm = styled(StyledLane)`
  min-width: 230px;

  form {
    display: flex;
    justify-content: space-between;
  }
`

function LaneForm({ onConfirm, onCancel }) {
  const inputLaneTitle = React.createRef()

  function addLane(event) {
    event.preventDefault()

    when(inputLaneTitle.current.value)(onConfirm)
  }

  return (
    <StyledLaneForm>
      <form onSubmit={addLane}>
        <input type='text' ref={inputLaneTitle} autoFocus />
        <button type='submit'>Add</button>
        <button type='button' onClick={onCancel}>
          Cancel
        </button>
      </form>
    </StyledLaneForm>
  )
}

export default LaneForm

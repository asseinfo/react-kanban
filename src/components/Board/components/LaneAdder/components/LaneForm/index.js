import React from 'react'
import styled from 'styled-components'
import { StyledLane } from '../../../Lane'
import { when } from '@services/utils'

const StyledLaneForm = styled(StyledLane)`
width: 350px;
  form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  button[type=submit]{
    flex: 1;
    margin: 5px 10px 0px 0px;
  }

  button[type=button]{
    flex: 1;
    margin-top: 5px;
  }
`

function LaneForm ({ onConfirm, onCancel }) {
  const inputLaneTitle = React.createRef()

  function addLane (event) {
    event.preventDefault()

    when(inputLaneTitle.current.value)(onConfirm)
  }

  return (
    <StyledLaneForm>
      <form onSubmit={addLane}>
        <input type='text' ref={inputLaneTitle} autoFocus />
        <button type='submit'>Add</button>
        <button type='button' onClick={onCancel}>Cancel</button>
      </form>
    </StyledLaneForm>
  )
}

export default LaneForm

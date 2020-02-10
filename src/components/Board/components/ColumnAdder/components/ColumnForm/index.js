import React from 'react'
import styled from 'styled-components'
import { StyledColumn } from '../../../Column'
import { when } from '@services/utils'

const StyledColumnForm = styled(StyledColumn)`
  min-width: 230px;

  form {
    display: flex;
    justify-content: space-between;
  }
`

function ColumnForm({ onConfirm, onCancel }) {
  const inputColumnTitle = React.createRef()

  function addColumn(event) {
    event.preventDefault()

    when(inputColumnTitle.current.value)(onConfirm)
  }

  return (
    <StyledColumnForm>
      <form onSubmit={addColumn}>
        <input type='text' ref={inputColumnTitle} autoFocus />
        <button type='submit'>Add</button>
        <button type='button' onClick={onCancel}>
          Cancel
        </button>
      </form>
    </StyledColumnForm>
  )
}

export default ColumnForm

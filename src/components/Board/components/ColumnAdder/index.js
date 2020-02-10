import React, { useState } from 'react'
import styled from 'styled-components'
import ColumnForm from './components/ColumnForm'

const ColumnAdderPlaceholder = styled.div`
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

function ColumnAdder({ onConfirm }) {
  const [isAddingColumn, setAddingColumn] = useState(false)

  function confirmColumn(title) {
    onConfirm(title)
    setAddingColumn(false)
  }

  return isAddingColumn ? (
    <ColumnForm onConfirm={confirmColumn} onCancel={() => setAddingColumn(false)} />
  ) : (
    <ColumnAdderPlaceholder onClick={() => setAddingColumn(true)} role='button'>
      ➕
    </ColumnAdderPlaceholder>
  )
}

export default ColumnAdder

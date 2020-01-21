import React, { useState } from 'react'
import styled from 'styled-components'
import { when } from '@services/utils'
import CardSkeleton from '../../../../../CardSkeleton'

const DefaultCard = styled(CardSkeleton)`
  border-radius: 3px;
  background-color: #fff;
  padding: 10px;
  margin-bottom: 7px;
  input {
    border: 0px;
    font-family: inherit;
    font-size: inherit;
  }
`

const CardTitle = styled.div`
  input {
    font-weight: bold;
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0px;
  }
`

const CardDescription = styled.div`
  input {
    width: 100%;
  }
  padding-top: 10px;
`
const StyledFormButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  button{
    background-color: #eee;
    border: 1px solid #ccc;
    border: none;
    padding: 5px;
    width:80%
    border-radius: 3px;
    cursor: pointer;
  }
  button:hover {
    transition: 0.3s;
    background-color: #ccc;
  }
  button:first-of-type{
    margin-right:15px;
  }
`

function LaneForm({ onConfirm, onCancel }) {
  const inputCardTitle = React.createRef()
  const inputCardDescription = React.createRef()

  function addCard(event) {
    event.preventDefault()

    when(inputCardTitle.current.value)(() =>
      onConfirm({ title: inputCardTitle.current.value, description: inputCardDescription.current.value })
    )
  }

  return (
    <DefaultCard>
      <form onSubmit={addCard}>
        <CardTitle>
          <input name='title' autoFocus defaultValue='Title' ref={inputCardTitle} />
        </CardTitle>
        <CardDescription>
          <input name='description' defaultValue='Description' ref={inputCardDescription} />
        </CardDescription>
        <StyledFormButtons>
          <button type='submit'> Add </button>
          <button
            onClick={event => {
              event.preventDefault()
              onCancel()
            }}
          >
            Cancel
          </button>
        </StyledFormButtons>
      </form>
    </DefaultCard>
  )
}

export default LaneForm

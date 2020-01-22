import React, { useState } from 'react'
import styled from 'styled-components'
import CardForm from './components/CardForm'

const AddCardButton = styled.button`
  width: 100%;
  margin-top: 5px;
  background-color: transparent;
  cursor: pointer;
  border: 1px solid #ccc;
  transition: 0.3s;
  :hover {
    background-color: #ccc;
  }
  border-radius: 3px;
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: bold;
`

export default function CardAdder({ lane, onConfirm }) {
  function confirmCard(card) {
    onConfirm(lane, card)
    setAddingCard(false)
  }

  const [addingCard, setAddingCard] = useState(false)

  return (
    <>
      {addingCard ? (
        <CardForm onConfirm={confirmCard} onCancel={() => setAddingCard(false)} />
      ) : (
        <AddCardButton onClick={() => setAddingCard(!addingCard)}>+</AddCardButton>
      )}
    </>
  )
}

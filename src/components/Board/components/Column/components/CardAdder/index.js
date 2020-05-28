import React, { useState } from 'react'
import styled from 'styled-components'
import CardForm from './components/CardForm'

const AddCardButton = styled.button`
  width: 100%;
  margin-top: 3px;
  background-color: transparent;
  cursor: pointer;
  border: 1px solid #ccc;
  transition: 0.3s;
  :hover {
    background-color: #ccc;
  }
  border-radius: 3px;
  font-size: 15px;
  // margin-bottom: 5px;
  text-align: start;
  padding: 6px 4px;
  vertical-align: center;
`
const AddCardPlus = styled.span`
  font-size: 18px;
  // padding-top: 7px;
  // padding-left: 3px;
`
export default function CardAdder({ column, onConfirm }) {
  function confirmCard(card) {
    onConfirm(column, card)
    setAddingCard(false)
  }

  const [addingCard, setAddingCard] = useState(false)

  return (
    <>
      {addingCard ? (
        <CardForm onConfirm={confirmCard} onCancel={() => setAddingCard(false)} />
      ) : (
        <AddCardButton onClick={() => setAddingCard(!addingCard)}>
          <AddCardPlus>+ </AddCardPlus>
          Add new card{' '}
        </AddCardButton>
      )}
    </>
  )
}

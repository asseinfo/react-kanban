import React, { useState } from 'react'
import styled from 'styled-components'
import CardSkeleton from '../../../CardSkeleton'

const AddCardButton = styled.button`
  width: 100%;
  margin-top: 5px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  border: 1px solid #ccc;
  :hover {
    transition: 0.3s;
    background-color: #ccc;
  }
  font-size: 20px;
  margin-bottom: 10px;
`
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
  input{
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
  const FormButtonsWrapper = styled.div`
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

const CardDescription = styled.div`
  input{
    width:100%;
  }
  padding-top: 10px;
`

export default function CardAdder({ lane, onCardAdd }) {
  function handleCardAdd(event) {
    event.preventDefault()
    onCardAdd(lane, { id: 4, title: 'Card adicionado', description: 'Testando' })
  }

  const [addingCard, setAddingCard] = useState(false)

  return (
    <>
      <AddCardButton onClick={() => setAddingCard(!addingCard)}>+</AddCardButton>
      {addingCard && (
        <DefaultCard>
          <span>
            <CardTitle>
              <input autoFocus defaultValue='Title'/>
            </CardTitle>
          </span>
          <CardDescription>
            <input defaultValue='Description' />
          </CardDescription>
          <FormButtonsWrapper>
            <button >Save</button>
            <button>Cancel</button>
          </FormButtonsWrapper>
        </DefaultCard>
      )}
    </>
  )
}

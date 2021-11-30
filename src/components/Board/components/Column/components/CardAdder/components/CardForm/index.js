import { useRef } from 'react'
import { when } from '@services/utils'

function CardForm({ onConfirm, onCancel, initialValue }) {
  const inputCardTitle = useRef()
  const inputCardDescription = useRef()

  function addCard(event) {
    event.preventDefault()
    when(inputCardTitle.current.value)((value) => {
      onConfirm({ title: value, description: inputCardDescription.current.value })
    })
  }

  return (
    <div className='react-kanban-card-adder-form'>
      <form onSubmit={addCard}>
        <input
          className='react-kanban-card-adder-form__title'
          name='title'
          autoFocus
          defaultValue={(initialValue && initialValue.title) || 'Title'}
          ref={inputCardTitle}
        />
        <input
          className='react-kanban-card-adder-form__description'
          name='description'
          defaultValue={(initialValue && initialValue.description) || 'Description'}
          ref={inputCardDescription}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
          <button className='react-kanban-card-adder-form__button' type='submit'>
            Add
          </button>
          <button className='react-kanban-card-adder-form__button' type='button' onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default CardForm

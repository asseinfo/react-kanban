import { useRef } from 'react'
import { when } from '@services/utils'

// @ts-expect-error TS(7031) FIXME: Binding element 'onConfirm' implicitly has an 'any... Remove this comment to see the full error message
function CardForm({ onConfirm, onCancel }) {
  const inputCardTitle = useRef()
  const inputCardDescription = useRef()

  // @ts-expect-error TS(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  function addCard(event) {
    event.preventDefault()
    // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
    when(inputCardTitle.current.value)((value) => {
      // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
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
          defaultValue='Title'
          // @ts-expect-error TS(2322) FIXME: Type 'MutableRefObject<undefined>' is not assignab... Remove this comment to see the full error message
          ref={inputCardTitle}
        />
        <input
          className='react-kanban-card-adder-form__description'
          name='description'
          defaultValue='Description'
          // @ts-expect-error TS(2322) FIXME: Type 'MutableRefObject<undefined>' is not assignab... Remove this comment to see the full error message
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

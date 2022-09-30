import { useRef } from 'react'
import { when } from '@services/utils'

function CardForm({ onConfirm, onCancel }) {
  const inputCardTitle = useRef()
  const inputCardDescription = useRef()

  function addCard(event) {
    event.preventDefault()
    // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
    when(inputCardTitle.current.value)((value) => {
      // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
      onConfirm({ title: value, description: inputCardDescription.current.value })
    })
  }

  return (
    // @ts-expect-error TS(2686) FIXME: 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
    <div className='react-kanban-card-adder-form'>
      {/* @ts-expect-error TS(2686) FIXME: 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message */}
      <form onSubmit={addCard}>
        {/* @ts-expect-error TS(2686) FIXME: 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message */}
        <input
          className='react-kanban-card-adder-form__title'
          name='title'
          autoFocus
          defaultValue='Title'
          ref={inputCardTitle}
        />
        {/* @ts-expect-error TS(2686) FIXME: 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message */}
        <input
          className='react-kanban-card-adder-form__description'
          name='description'
          defaultValue='Description'
          ref={inputCardDescription}
        />
        {/* @ts-expect-error TS(2686) FIXME: 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
          {/* @ts-expect-error TS(2686) FIXME: 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message */}
          <button className='react-kanban-card-adder-form__button' type='submit'>
            Add
          </button>
          {/* @ts-expect-error TS(2686) FIXME: 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message */}
          <button className='react-kanban-card-adder-form__button' type='button' onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default CardForm

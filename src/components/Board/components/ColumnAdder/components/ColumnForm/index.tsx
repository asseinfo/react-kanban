import { createRef } from 'react'
import { when } from '@services/utils'

// @ts-expect-error TS(7031) FIXME: Binding element 'onConfirm' implicitly has an 'any... Remove this comment to see the full error message
function ColumnForm({ onConfirm, onCancel }) {
  // FIXME use hook
  const inputColumnTitle = createRef()

  // @ts-expect-error TS(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  function addColumn(event) {
    event.preventDefault()

    when((inputColumnTitle.current as any).value)(onConfirm)
  }

  return (
    <div className='react-kanban-column' style={{ minWidth: '230px' }}>
      <form style={{ display: 'flex', justifyContent: 'space-between' }} onSubmit={addColumn}>
        {/* @ts-expect-error TS(2322) FIXME: Type 'RefObject<unknown>' is not assignable to typ... Remove this comment to see the full error message */}
        <input type='text' ref={inputColumnTitle} autoFocus />
        <button type='submit'>Add</button>
        <button type='button' onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  )
}

export default ColumnForm

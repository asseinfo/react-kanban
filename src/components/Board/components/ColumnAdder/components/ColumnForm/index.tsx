import { createRef } from 'react'
import { when } from '@services/utils'

function ColumnForm({ onConfirm, onCancel }) {
  // FIXME use hook
  const inputColumnTitle = createRef()

  function addColumn(event) {
    event.preventDefault()

    when((inputColumnTitle.current as any).value)(onConfirm)
  }

  return (
    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
    <div className='react-kanban-column' style={{ minWidth: '230px' }}>
      {/* @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message */}
      <form style={{ display: 'flex', justifyContent: 'space-between' }} onSubmit={addColumn}>
        {/* @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message */}
        <input type='text' ref={inputColumnTitle} autoFocus />
        {/* @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message */}
        <button type='submit'>Add</button>
        {/* @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message */}
        <button type='button' onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  )
}

export default ColumnForm

import { createRef } from 'react'
import { when } from '@services/utils'

function ColumnForm({ onConfirm, onCancel }: any) {
  // FIXME use hook
  const inputColumnTitle = createRef()

  function addColumn(event: any) {
    event.preventDefault()

    when((inputColumnTitle.current as any).value)(onConfirm)
  }

  return (
    <div className='react-kanban-column' style={{ minWidth: '230px' }}>
      <form style={{ display: 'flex', justifyContent: 'space-between' }} onSubmit={addColumn}>
        {/* @ts-expect-error TS(2322): Type 'RefObject<unknown>' is not assignable to typ... Remove this comment to see the full error message */}
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

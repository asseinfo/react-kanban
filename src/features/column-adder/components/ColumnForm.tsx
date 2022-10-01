import { FC, createRef, MouseEventHandler } from 'react'

import { when } from '@services/utils'

export const ColumnForm: FC<Props> = ({ onConfirm, onCancel }) => {
  // FIXME use hook
  const inputColumnTitle = createRef<HTMLInputElement>()

  function addColumn(event: any) {
    event.preventDefault()

    when((inputColumnTitle.current as any).value)(onConfirm)
  }

  return (
    <div className='react-kanban-column' style={{ minWidth: '230px' }}>
      <form style={{ display: 'flex', justifyContent: 'space-between' }} onSubmit={addColumn}>
        <input type='text' ref={inputColumnTitle} autoFocus />
        <button type='submit'>Add</button>
        <button type='button' onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  )
}

interface Props {
  onConfirm: (title: string) => void
  onCancel: MouseEventHandler<HTMLButtonElement>
}

import { useState } from 'react'

function ColumnTitle({ allowRenameColumn, onClick, children: title }: any) {
  return allowRenameColumn ? (
    <span style={{ cursor: 'pointer' }} onClick={onClick}>
      {title}
    </span>
  ) : (
    <span>{title}</span>
  )
}

function useRenameMode(state: any) {
  const [renameMode, setRenameMode] = useState(state)

  function toggleRenameMode() {
    setRenameMode(!renameMode)
  }

  return [renameMode, toggleRenameMode]
}

export default function ({
  children: column,
  allowRemoveColumn,
  onColumnRemove,
  allowRenameColumn,
  onColumnRename,
}: any) {
  const [renameMode, toggleRenameMode] = useRenameMode(false)
  const [titleInput, setTitleInput] = useState('')

  function handleRenameColumn(event: any) {
    event.preventDefault()

    onColumnRename(column, titleInput)
    toggleRenameMode()
  }

  function handleRenameMode() {
    setTitleInput(column.title)
    toggleRenameMode()
  }

  return (
    <div className='react-kanban-column-header'>
      {renameMode ? (
        <form onSubmit={handleRenameColumn}>
          <span>
            <input
              type='text'
              value={titleInput}
              onChange={({ target: { value } }) => setTitleInput(value)}
              autoFocus
            />
          </span>
          <span>
            <button className='react-kanban-column-header__button' type='submit'>
              Rename
            </button>
            <button className='react-kanban-column-header__button' type='button' onClick={handleRenameMode}>
              Cancel
            </button>
          </span>
        </form>
      ) : (
        <>
          <ColumnTitle allowRenameColumn={allowRenameColumn} onClick={handleRenameMode}>
            {column.title}
          </ColumnTitle>
          {allowRemoveColumn && <span onClick={() => onColumnRemove(column)}>×</span>}
        </>
      )}
    </div>
  )
}

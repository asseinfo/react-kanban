import { useState } from 'react'

function ColumnTitle({ allowRenameColumn, onClick, children: title }) {
  return allowRenameColumn ? (
    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
    <span style={{ cursor: 'pointer' }} onClick={onClick}>
      {title}
    </span>
  ) : (
    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
    <span>{title}</span>
  )
}

function useRenameMode(state) {
  const [renameMode, setRenameMode] = useState(state)

  function toggleRenameMode() {
    setRenameMode(!renameMode)
  }

  return [renameMode, toggleRenameMode]
}

export default function ({ children: column, allowRemoveColumn, onColumnRemove, allowRenameColumn, onColumnRename }) {
  const [renameMode, toggleRenameMode] = useRenameMode(false)
  const [titleInput, setTitleInput] = useState('')

  function handleRenameColumn(event) {
    event.preventDefault()

    onColumnRename(column, titleInput)
    toggleRenameMode()
  }

  function handleRenameMode() {
    setTitleInput(column.title)
    toggleRenameMode()
  }

  return (
    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
    <div className='react-kanban-column-header'>
      {renameMode ? (
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <form onSubmit={handleRenameColumn}>
          {/* @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message */}
          <span>
            {/* @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message */}
            <input
              type='text'
              value={titleInput}
              onChange={({ target: { value } }) => setTitleInput(value)}
              autoFocus
            />
          </span>
          {/* @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message */}
          <span>
            {/* @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message */}
            <button className='react-kanban-column-header__button' type='submit'>
              Rename
            </button>
            {/* @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message */}
            <button className='react-kanban-column-header__button' type='button' onClick={handleRenameMode}>
              Cancel
            </button>
          </span>
        </form>
      ) : (
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <>
          {/* @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message */}
          <ColumnTitle allowRenameColumn={allowRenameColumn} onClick={handleRenameMode}>
            {column.title}
          </ColumnTitle>
          {/* @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message */}
          {allowRemoveColumn && <span onClick={() => onColumnRemove(column)}>×</span>}
        </>
      )}
    </div>
  )
}

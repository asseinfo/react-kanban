import { useState } from 'react'
import ColumnForm from './components/ColumnForm'

function ColumnAdder({ onConfirm }) {
  const [isAddingColumn, setAddingColumn] = useState(false)

  function confirmColumn(title) {
    onConfirm(title)
    setAddingColumn(false)
  }

  return isAddingColumn ? (
    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
    <ColumnForm onConfirm={confirmColumn} onCancel={() => setAddingColumn(false)} />
  ) : (
    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
    <div
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '230px' }}
      className='react-kanban-column-adder-button'
      onClick={() => setAddingColumn(true)}
      role='button'
    >
      ➕
    </div>
  )
}

export default ColumnAdder

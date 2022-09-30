import { useState } from 'react'
import ColumnForm from './components/ColumnForm'

// @ts-expect-error TS(7031) FIXME: Binding element 'onConfirm' implicitly has an 'any... Remove this comment to see the full error message
function ColumnAdder({ onConfirm }) {
  const [isAddingColumn, setAddingColumn] = useState(false)

  // @ts-expect-error TS(7006) FIXME: Parameter 'title' implicitly has an 'any' type.
  function confirmColumn(title) {
    onConfirm(title)
    setAddingColumn(false)
  }

  return isAddingColumn ? (
    <ColumnForm onConfirm={confirmColumn} onCancel={() => setAddingColumn(false)} />
  ) : (
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

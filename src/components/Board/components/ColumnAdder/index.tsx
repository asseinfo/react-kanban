import { useState } from 'react'
import ColumnForm from './components/ColumnForm'

function ColumnAdder({ onConfirm }: any) {
  const [isAddingColumn, setAddingColumn] = useState(false)

  function confirmColumn(title: any) {
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

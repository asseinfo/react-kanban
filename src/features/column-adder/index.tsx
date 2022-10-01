import { FC, useState } from 'react'

import { ColumnForm } from './components'

export const ColumnAdder: FC<Props> = ({ onConfirm }) => {
  const [isAddingColumn, setAddingColumn] = useState(false)

  const confirmColumn = (title: string) => {
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
      +
    </div>
  )
}

interface Props {
  onConfirm: (column: string) => void
}

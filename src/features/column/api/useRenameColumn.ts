import { DOMAttributes, InputHTMLAttributes, useState } from 'react'

import { Column, KanbanBoard } from '@/types'

export const useRenameColumn = ({ onColumnRename, children: column }: Props) => {
  const [canRename, setCanRename] = useState<boolean>(false)

  const toggleCanRename = () => {
    setCanRename((currentCanRename) => !currentCanRename)
  }
  const [titleInput, setTitleInput] = useState('')

  const handleRenameColumn: DOMAttributes<HTMLFormElement>['onSubmit'] = (event) => {
    event.preventDefault()

    onColumnRename(column, titleInput)
    toggleCanRename()
  }

  const handleCanRename = () => {
    setTitleInput(column.title)
    toggleCanRename()
  }

  const handleTitleChange: InputHTMLAttributes<HTMLInputElement>['onChange'] = ({ target: { value } }) =>
    setTitleInput(value)

  return {
    titleBind: {
      value: titleInput,
      onChange: handleTitleChange,
    },
    canRename,
    handleRenameColumn,
    handleCanRename,
  }
}

export interface Props {
  children: Column
  allowRemoveColumn: boolean
  onColumnRemove: (column: Column) => void
  allowRenameColumn: boolean
  onColumnRename: (column: Column, titleInput: string) => void
}

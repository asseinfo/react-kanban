import { DOMAttributes, InputHTMLAttributes, useState } from 'react'

import { Column, Card } from '@/types'

export const useRenameColumn = <TCard extends Card>({ onColumnRename, children: column }: Props<TCard>) => {
  const [canRename, setCanRename] = useState<boolean>(false)

  const toggleCanRename = () => {
    setCanRename((currentCanRename) => !currentCanRename)
  }
  const [titleInput, setTitleInput] = useState('')

  const handleRenameColumn: DOMAttributes<HTMLFormElement>['onSubmit'] = (event) => {
    event.preventDefault()

    onColumnRename?.(column, titleInput)
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

export interface Props<TCard extends Card> {
  children: Column<TCard>
  allowRemoveColumn: boolean
  onColumnRemove?: (column: Column<TCard>) => void
  allowRenameColumn: boolean
  onColumnRename?: (column: Column<TCard>, titleInput: string) => void
}

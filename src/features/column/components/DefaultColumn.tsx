import { FC } from 'react'

import { Props, useRenameColumn } from '../api'
import { ColumnTitle } from './ColumnTitle'

export const DefaultColumn: FC<Props> = (props) => {
  const { children: column, allowRemoveColumn, allowRenameColumn, onColumnRemove } = props
  const { canRename, handleCanRename, titleBind, handleRenameColumn } = useRenameColumn(props)

  return (
    <div className='react-kanban-column-header'>
      {canRename ? (
        <form onSubmit={handleRenameColumn}>
          <span>
            <input type='text' {...titleBind} autoFocus />
          </span>
          <span>
            <button className='react-kanban-column-header__button' type='submit'>
              Rename
            </button>
            <button className='react-kanban-column-header__button' type='button' onClick={handleCanRename}>
              Cancel
            </button>
          </span>
        </form>
      ) : (
        <>
          <ColumnTitle allowRenameColumn={allowRenameColumn} onClick={handleCanRename}>
            {column.title}
          </ColumnTitle>
          {allowRemoveColumn && <span onClick={() => onColumnRemove(column)}>X</span>}
        </>
      )}
    </div>
  )
}

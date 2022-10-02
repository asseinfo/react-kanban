import { Card } from '@/types'
import { Props, useRenameColumn } from '../api'
import { ColumnTitle } from './ColumnTitle'

export const DefaultColumn = function <TCard extends Card>(props: Props<TCard>) {
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
        <div className='react-kanban-column-header__spacer'>
          <ColumnTitle allowRenameColumn={allowRenameColumn} onClick={handleCanRename}>
            {column.title}
          </ColumnTitle>
          {allowRemoveColumn && <span onClick={onColumnRemove ? () => onColumnRemove(column) : undefined}>X</span>}
        </div>
      )}
    </div>
  )
}

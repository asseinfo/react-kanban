import { FC, DOMAttributes } from 'react'

interface ColumnTitleProps {
  allowRenameColumn: boolean
  onClick: DOMAttributes<HTMLSpanElement>['onClick']
  children: string
}

export const ColumnTitle: FC<ColumnTitleProps> = ({ allowRenameColumn, onClick, children: title }) => {
  return allowRenameColumn ? (
    <span style={{ cursor: 'pointer' }} onClick={onClick}>
      {title}
    </span>
  ) : (
    <span>{title}</span>
  )
}

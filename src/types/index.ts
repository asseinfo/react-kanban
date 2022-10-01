export interface KanbanBoard {
  columns: Column[]
}
export interface Card {
  id: string | number
  title: string
  description: string
  content?: JSX.Element
}
export interface Column {
  id: string | number
  title: string
  cards: Card[]
}

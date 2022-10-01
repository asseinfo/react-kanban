export interface KanbanBoard {
  columns: Column[]
}
export interface Card {
  id: string | number
  title: string
  description: string
  content?: JSX.Element // Not sure on this, if card props are different than a card
}
export interface Column {
  id: string | number
  title: string
  cards: Card[]
}
export interface Coordinates {
  fromPosition: number
  toPosition: number
}
export interface DragEvent<TSubject> extends Coordinates {
  subject: TSubject
}
export interface OnCardDragEndEventLocation<TSubject> extends DragEvent<TSubject> {
  fromColumnId: string | number
  toColumnId: string | number
}
export interface OnDragEndEvent<TLocation> {
  board: KanbanBoard
  source: TLocation
  destination: TLocation
}

export interface CardBag {
  /**  It's unavailable when the board is controlled. */
  removeCard?: () => void
  dragging: boolean
}
// export type RenderCard = (card: Card, cardBag: CardBag) => JSX.Element
export type RenderCard = (isDragging: boolean) => JSX.Element

export interface ColumnBag {
  /** It's unavailable when the board is controlled */
  removeColumn?: () => void
  /** It's unavailable when the board is controlled */
  renameColumn?: () => void
  /** As a second argument you can pass an option to define where in the column you want to add the card:


     * It's unavailable when the board is controlled */
  addCard?: (options?: { on: 'top' | 'bottom' }) => void
}
export type RenderColumnHeader = (column: Column, columnBag: ColumnBag) => JSX.Element

export interface RenderColumnAdderColumnBag {
  /** Call this function with a new column to add the new column
   *
   * It's unavailable when the board is controlled.
   */
  addColumn?: () => void
}
export type RenderColumnAdder = (columnBag: RenderColumnAdderColumnBag) => JSX.Element

export type OnColumnRemove = (board: KanbanBoard, column: Column) => void
export type OnCardRemove = (card: Card) => void
// export type OnCardRemove = (board: KanbanBoard, column: Column, card: Card) => void

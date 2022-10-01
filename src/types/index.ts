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

export interface Props {
  allowRemoveLane?: boolean
  /** When using the default header template, when you don't pass a template through the renderColumnHeader, it will allow the user to remove a column. */
  allowRemoveColumn?: boolean
  /** When using the default header template, when you don't pass a template through the renderColumnHeader, it will allow the user to rename a column. */
  allowRenameColumn?: boolean
  /** Allow the user to add a card in the column directly by the board. By default, it adds the card on the bottom of the column, but you can specify whether you want to add at the top or at the bottom of the board by passing an object with 'on' prop. */
  allowAddCard?: boolean | { on: 'top' | 'bottom' }
  allowAddColumn?: boolean
  /** When using the default card template, when you don't pass a template through the renderCard, it will allow the user to remove a card. */
  allowRemoveCard?: boolean

  /** Disallow the user from move a column. */
  disableColumnDrag?: boolean
  /** Disallow the user from move a card. */
  disableCardDrag?: boolean

  /** Required if uncontrolled, otherwise `children` is required.
   *
   * Providing this will put you into **uncontrolled** mode
   * @doc https://github.com/asseinfo/react-kanban#-controlled-and-uncontrolled
   */
  initialBoard: KanbanBoard
  renderCard: RenderCard

  onColumnRename: (board: KanbanBoard, column: Column) => void

  onColumnRemove: OnColumnRemove
  onColumnDragEnd: (card: Card, source: DragEvent, destination: DragEvent) => void
  /** Docs are inconsistent
   * @issue https://github.com/asseinfo/react-kanban/issues/478 */
  onCardDragEnd: (card: Card, source: OnCardDragEndEventLocation, destination: OnCardDragEndEventLocation) => void
  onCardNew: (board: KanbanBoard, card: Card) => void
  /** If your board is uncontrolled you must return the new column with its new id in this callback. */
  onNewColumnConfirm: (column: Column) => void | Column
  onCardRemove: OnCardRemove
  /** When the user adds a new column through the default column adder template, this callback will be called passing the updated board and the new column.
   *
   * This callback will not be called in an uncontrolled board.
   * */
  onColumnNew: (board: KanbanBoard, column: Column) => void
  /** When the user confirms a new card through the default card adder template, this callback will be called with a draft of a card with the title and the description typed by the user.
   *
   * You must return the new card with its new id in this callback.
   */
  onNewCardConfirm: (card: Omit<Card, 'id'>) => Card
  /** This isn't listed in the docs */
  onLaneRemove?: () => void
  /** This isn't listed in the docs */
  onLaneRename?: () => void

  /** Use this if you want to render your own column adder. You have to pass a function and return your column adder component */
  renderColumnAdder: RenderColumnAdder
  /** Use this if you want to render your own column header. You have to pass a function and return your column header component. The function will receive these parameters: */
  renderColumnHeader: RenderColumnHeader
  children?: KanbanBoard
}

/** Helpers
 * moveColumn,
 * addColumn,
 * removeColumn,
 * changeColumn,
 * addCard,
 * removeCard,
 * changeCard
 */

/** */
export type MoveCard = (
  board: KanbanBoard,
  source: OnCardDragEndEventLocation,
  destination: OnCardDragEndEventLocation
) => KanbanBoard

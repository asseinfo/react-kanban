import ReactDOM from 'react-dom'
import { forwardRef } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { List, AutoSizer } from 'react-virtualized'
import Card from './components/Card'
import withDroppable from '../../../withDroppable'
import CardAdder from './components/CardAdder'
import { pickPropOut } from '@services/utils'

const ColumnEmptyPlaceholder = forwardRef((props, ref) => (
  <div ref={ref} style={{ minHeight: 'inherit', height: 'inherit' }} {...props} />
))

const DroppableColumn = withDroppable(ColumnEmptyPlaceholder)

function Column({
  children,
  index: columnIndex,
  renderCard,
  renderColumnHeader,
  disableColumnDrag,
  disableCardDrag,
  onCardNew,
  allowAddCard,
  virtualLists,
  rowHeight,
}) {
  const getRowRender = (cards) => ({ index, style }) => {
    const card = cards[index]

    // We are rendering an extra item for the placeholder
    // To do this we increased our data set size to include one 'fake' item
    if (!card) {
      return null
    }

    return (
      <div style={style} key={card.id}>
        <Card
          key={card.id}
          index={index}
          renderCard={(dragging) => renderCard(children, card, dragging)}
          disableCardDrag={disableCardDrag}
        >
          {card}
        </Card>
      </div>
    )
  }

  return (
    <Draggable draggableId={`column-draggable-${children.id}`} index={columnIndex} isDragDisabled={disableColumnDrag}>
      {(columnProvided) => {
        const draggablePropsWithoutStyle = pickPropOut(columnProvided.draggableProps, 'style')

        return (
          <div
            ref={columnProvided.innerRef}
            {...draggablePropsWithoutStyle}
            style={{
              height: '100%',
              minHeight: '28px',
              display: 'inline-block',
              verticalAlign: 'top',
              ...columnProvided.draggableProps.style,
            }}
            className='react-kanban-column'
            data-testid={`column-${children.id}`}
          >
            <div {...columnProvided.dragHandleProps}>{renderColumnHeader(children)}</div>
            {allowAddCard && <CardAdder column={children} onConfirm={onCardNew} />}

            {/* got sources for virtual lists from this sandbox */}
            {/* https://codesandbox.io/s/react-beautiful-dnd-react-virtualized-forked-ilbde?file=/src/App.js */}
            {virtualLists ? (
              <Droppable
                droppableId={String(children.id)}
                mode='virtual'
                renderClone={(provided, snapshot, rubric) => {
                  // This function is called to get a clone to be rendered while dragging.
                  const card = children.cards[rubric.source.index]

                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{ ...provided.draggableProps.style }}
                    >
                      {renderCard(children, card, snapshot.isDragging)}
                    </div>
                  )
                }}
              >
                {(droppableProvided, snapshot) => {
                  const cardsCount = snapshot.isUsingPlaceholder ? children.cards.length + 1 : children.cards.length

                  return (
                    <div style={{ width: '300px', height: '500px' }} className='virtualized-column'>
                      <AutoSizer>
                        {({ width, height }) => {
                          return (
                            <List
                              width={width}
                              height={height}
                              rowCount={cardsCount}
                              rowHeight={rowHeight}
                              ref={(ref) => {
                                // react-virtualized has no way to get the list's ref that I can so
                                // So we use the `ReactDOM.findDOMNode(ref)` escape hatch to get the ref
                                if (ref) {
                                  // eslint-disable-next-line react/no-find-dom-node
                                  const foundNode = ReactDOM.findDOMNode(ref)
                                  // eslint-disable-next-line no-undef
                                  if (foundNode instanceof HTMLElement) {
                                    droppableProvided.innerRef(foundNode)
                                  }
                                }
                              }}
                              rowRenderer={getRowRender(children.cards)}
                            />
                          )
                        }}
                      </AutoSizer>
                    </div>
                  )
                }}
              </Droppable>
            ) : (
              <DroppableColumn droppableId={String(children.id)}>
                {children.cards.length ? (
                  children.cards.map((card, index) => (
                    <Card
                      key={card.id}
                      index={index}
                      renderCard={(dragging) => renderCard(children, card, dragging)}
                      disableCardDrag={disableCardDrag}
                    >
                      {card}
                    </Card>
                  ))
                ) : (
                  <div className='react-kanban-card-skeleton' />
                )}
              </DroppableColumn>
            )}
          </div>
        )
      }}
    </Draggable>
  )
}

export default Column

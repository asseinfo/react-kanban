// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Draggable } from 'react-beautiful-dnd'

// @ts-expect-error TS(7031) FIXME: Binding element 'children' implicitly has an 'any'... Remove this comment to see the full error message
function Card({ children, index, renderCard, disableCardDrag }) {
  return (
    // @ts-expect-error TS(2552) FIXME: Cannot find name 'draggableId'. Did you mean 'Drag... Remove this comment to see the full error message
    <Draggable draggableId={String(children.id)} index={index} isDragDisabled={disableCardDrag}>
      // @ts-expect-error TS(2349) FIXME: This expression is not callable.
      {(provided, { isDragging }) => {
        return (
          // @ts-expect-error TS(2304) FIXME: Cannot find name 'div'.
          <div
            // @ts-expect-error TS(2304) FIXME: Cannot find name 'ref'.
            ref={provided.innerRef}
            // @ts-expect-error TS(2304) FIXME: Cannot find name 'provided'.
            {...provided.draggableProps}
            // @ts-expect-error TS(2304) FIXME: Cannot find name 'provided'.
            {...provided.dragHandleProps}
            // @ts-expect-error TS(2304) FIXME: Cannot find name 'data'.
            data-testid={`card-${children.id}`}
          >
            // @ts-expect-error TS(2304) FIXME: Cannot find name 'div'.
            <div style={{ display: 'inline-block', whiteSpace: 'normal' }}>{renderCard(isDragging)}</div>
          </div>
        )
      }}
    </Draggable>
  )
}

export default Card

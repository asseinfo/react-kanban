// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Droppable } from 'react-beautiful-dnd'

// @ts-expect-error TS(7006) FIXME: Parameter 'Component' implicitly has an 'any' type... Remove this comment to see the full error message
function withDroppable(Component) {
  // @ts-expect-error TS(2365) FIXME: Operator '<' cannot be applied to types '({ childr... Remove this comment to see the full error message
  return function WrapperComponent({ children, ...droppableProps }) {
    return (
      <Droppable {...droppableProps}>
        // @ts-expect-error TS(2349) FIXME: This expression is not callable.
        {(provided) => (
          // @ts-expect-error TS(2749) FIXME: 'Component' refers to a value, but is being used a... Remove this comment to see the full error message
          <Component ref={provided.innerRef} {...provided.droppableProps}>
            {children}
            // @ts-expect-error TS(2304) FIXME: Cannot find name 'provided'.
            {provided.placeholder}
          </Component>
        )}
      </Droppable>
    )
  }
}

export default withDroppable

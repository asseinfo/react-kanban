import { Droppable } from 'react-beautiful-dnd'

function withDroppable(Component) {
  // @ts-expect-error TS(2365): Operator '<' cannot be applied to types '({ childr... Remove this comment to see the full error message
  return function WrapperComponent({ children, ...droppableProps }) {
    return (
      <Droppable {...droppableProps}>
        // @ts-expect-error TS(2349): This expression is not callable.
        {(provided) => (
          // @ts-expect-error TS(2749): 'Component' refers to a value, but is being used a... Remove this comment to see the full error message
          <Component ref={provided.innerRef} {...provided.droppableProps}>
            {children}
            // @ts-expect-error TS(2304): Cannot find name 'provided'.
            {provided.placeholder}
          </Component>
        )}
      </Droppable>
    )
  }
}

export default withDroppable

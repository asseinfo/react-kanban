import { ForwardRefExoticComponent, RefAttributes, PropsWithChildren } from 'react'
import { Droppable } from 'react-beautiful-dnd'

export const withDroppable = function <TElement extends HTMLElement>(
  Component: ForwardRefExoticComponent<PropsWithChildren<RefAttributes<TElement>>>
) {
  return function WrapperComponent({ children, ...droppableProps }: any) {
    return (
      <Droppable {...droppableProps}>
        {(provided) => (
          <Component ref={provided.innerRef} {...provided.droppableProps}>
            {children}
            {provided.placeholder}
          </Component>
        )}
      </Droppable>
    )
  }
}

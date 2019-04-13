import React from 'react'

function DragDropContext (props) {
  callbacks.onDragEnd = props.onDragEnd

  return <>{props.children}</>
}

const droppableProvide = {
  innerRef: React.createRef(),
  droppableProps: {},
  placeholder: <div id='placeholder' />
}
function Droppable (props) {
  return <>{props.children(droppableProvide)}</>
}

const draggableProvide = {
  innerRef: React.createRef(),
  draggableProps: {},
  dragHandleProps: {}
}
const draggableSnapshot = {
  isDragging: false
}
function Draggable ({ children }) {
  return <>{children(draggableProvide, draggableSnapshot)}</>
}

const callbacks = {
  onDragEnd: jest.fn(),
  isDragging: isDragging => { draggableSnapshot.isDragging = isDragging }
}
export { DragDropContext, Droppable, Draggable, callbacks }

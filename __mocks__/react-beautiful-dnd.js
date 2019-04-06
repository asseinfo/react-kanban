import React from 'react'

function DragDropContext (props) {
  callbacks.onDragEnd = props.onDragEnd

  return <>{props.children}</>
}

const droppableProvide = {
  innerRef: React.createRef(),
  droppableProps: {}
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
function Draggable (props) {
  return <>{props.children(draggableProvide, draggableSnapshot)}</>
}

const callbacks = {
  onDragEnd: jest.fn(),
  isDragging: isDragging => { draggableSnapshot.isDragging = isDragging }
}
export { DragDropContext, Droppable, Draggable, callbacks }

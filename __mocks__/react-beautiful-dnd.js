import React from 'react'

const callbacks = {
  onDragEnd: jest.fn()
}

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
function Draggable (props) {
  return <>{props.children(draggableProvide)}</>
}

export { DragDropContext, Droppable, Draggable, callbacks }

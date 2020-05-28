import React from 'react'
import { render } from '@testing-library/react'
import withDroppable from './'
import { DragDropContext } from 'react-beautiful-dnd'

describe('#withDroppable', () => {
  let subject

  beforeEach(() => {
    const Droppable = withDroppable('span')
    subject = render(
      <DragDropContext>
        <Droppable droppableId='id'>
          <div id='children' />
        </Droppable>
      </DragDropContext>
    )
  })

  afterEach(() => {
    subject = undefined
  })

  it('returns a droppable component', () => {
    expect(subject.container.querySelector('span > #children')).toBeInTheDocument()
    subject.debug()
    expect(subject.container.querySelector('span > #placeholder')).toBeInTheDocument()
  })
})

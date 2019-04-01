import React from 'react'
import { render } from 'react-dom'
import Board from '../src'

const board = {
  lanes: [
    {
      id: 1,
      title: 'Lane Backlog',
      cards: [
        {
          id: 1,
          title: 'Card title',
          description: 'Card content'
        },
        {
          id: 2,
          title: 'Card title',
          description: 'Card content'
        },
        {
          id: 3,
          title: 'Card title',
          description: 'Card content'
        },
        {
          id: 4,
          title: 'Card title',
          description: 'Card content'
        },
        {
          id: 5,
          title: 'Card title',
          description: 'Card content'
        },
        {
          id: 6,
          title: 'Card title',
          description: 'Card content'
        },
        {
          id: 7,
          title: 'Card title',
          description: 'Card content'
        },
        {
          id: 8,
          title: 'Card title',
          description: 'Card content'
        }
      ]
    },
    {
      id: 2,
      title: 'Lane Doing',
      cards: [
        {
          id: 9,
          title: 'Card title',
          description: 'Card content'
        }
      ]
    }

  ]
}

render(<Board>{board}</Board>, document.getElementById('app'))

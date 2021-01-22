import { render } from 'react-dom'
import Board from '../src'
import getUrlParams from './services/getUrlParams'
import '../src/styles.scss'

const board = {
  columns: [
    {
      id: '0206c8d7-4d48-4d97-b867-86fc2d21074d',
      title: 'Column Backlog',
      cards: new Array(400).fill().map((u, i) => ({
        id: i + 100,
        title: `Card title ${i + 100}`,
        description: 'Card content',
      })),
    },
    {
      id: 2,
      title: 'Column Doing',
      cards: new Array(400).fill().map((u, i) => ({
        id: i + 500,
        title: `Card title ${i + 500}`,
        description: 'Card content',
      })),
    },
    {
      id: 3,
      title: 'Column Done',
      cards: new Array(400).fill().map((u, i) => ({
        id: i + 10000,
        title: `Card title ${i + 10000}`,
        description: 'Card content',
      })),
    },
  ],
}

render(
  <Board isVirtualList rowHeight={80} width={300} height={500} {...getUrlParams()}>
    {board}
  </Board>,
  document.getElementById('app')
)

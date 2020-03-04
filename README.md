[![Maintainability](https://api.codeclimate.com/v1/badges/c602758e03850fdb8b64/maintainability)](https://codeclimate.com/github/lourenci/react-kanban/maintainability)
[![Test Coverage](https://codecov.io/gh/lourenci/react-kanban/branch/master/graph/badge.svg)](https://codecov.io/gh/lourenci/react-kanban)
[![Build Status](https://github.com/lourenci/react-kanban/workflows/Test/badge.svg?branch=master)](https://github.com/lourenci/react-kanban/actions?query=branch%3Amaster+workflow%3ATest)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Yet another Kanban/Trello board lib for React.

![Kanban Demo](https://i.imgur.com/yceKUEp.gif)

### ▶️ Demo

[Usage](https://5k7py44kl.codesandbox.io/)

[![Edit react-kanban-demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/5k7py44kl?fontsize=14)

## ❓ Why?

- 👊 Reliable: 100% tested on CI; 100% coverage; 100% SemVer.
- 🎮 Having fun: Play with Hooks 🎣 and Styled Components 💅🏻.
- ♿️ Accessible: Keyboard and mobile friendly.
- 🔌 Pluggable: For use in projects.

## 🛠 Install and usage

Since this project use Hooks and Styled Components, you have to install them:

- `react>=16.8.5`
- `styled-components>=4`

After, Install the lib on your project:

```bash
yarn add @lourenci/react-kanban
```

Import the lib and use it on your project:

```js
import Board from '@lourenci/react-kanban'

const board = {
  columns: [
    {
      id: 1,
      title: 'Backlog',
      cards: [
        {
          id: 1,
          title: 'Add card',
          description: 'Add capability to add a card in a column'
        },
      ]
    },
    {
      id: 2,
      title: 'Doing',
      cards: [
        {
          id: 2,
          title: 'Drag-n-drop support',
          description: 'Move a card between the columns'
        },
      ]
    }
  ]
}

<Board initialBoard={board} />
```

## 🔥 API

### 🕹 Controlled and Uncontrolled

When you need a better control over the board, you should stick with the controlled board.
A controlled board means you need to deal with the board state yourself, you need to keep the state in your hands (component) and pass this state to the `<Board />`, we just reflect this state.
This also means a little more of complexity, although we make available some helpers to deal with the board shape.
You can read more in the React docs, [here](https://reactjs.org/docs/forms.html#controlled-components) and [here](https://reactjs.org/docs/uncontrolled-components.html).

If you go with the controlled one, you need to pass your board through the `children` prop, otherwise you need to pass it through the `initialBoard` prop.

#### Helpers to work with the controlled board

We expose some APIs that you can import to help you to work with the controlled state. Those are the same APIs we use internally to manage the uncontrolled board. We really recommend you to use them, they are 100% unit tested and they don't do any side effect to your board state.

To use them, you just need to import them together with your board:

```js
import Board, { addCard, addColumn, ... } from '@lourenci/react-kanban'
```

**All the helpers you need to pass your board and they will return a new board to pass to your state:**

```js
import Board, { addColumn } from '@lourenci/react-kanban'
...
const [board, setBoard] = useState(initialBoard)
...
const newBoard = addColumn(board, newColumn)
setBoard(newBoard)
...
<Board>{board}</Board>
```

[You can see the list of helpers in the end of the props documentation.](#-helpers-to-be-used-with-an-controlled-board)

### 🔷 Shape of a board

```js
{
  columns: [{
    id: ${unique-required-columnId},
    title: {$required-columnTitle**},
    cards: [{
      id: ${unique-required-cardId},
      title: ${required-cardTitle*}
      description: ${required-description*}
    }]
  }]
}
```

\* The `title` and the `description` are required if you are using the card's default template. You can render your own card template through the [`renderCard`](#rendercard) prop.

\*\* The `title` is required if you are using the column's default template. You can render your own column template through the [`renderColumnHeader`](#rendercolumnheader) prop.

### ⚙️ Props

| Prop                                                                                                                          | Description                                                                                                       | Controlled | Uncontrolled |
| ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ---------- | ------------ |
| [`children`](#children) (required if controlled)                                                                              | The board to render                                                                                               | ✅         | 🚫           |
| [`initialBoard`](#initialboard) (required if uncontrolled)                                                                    | The board to render                                                                                               | 🚫         | ✅           |
| [`onCardDragEnd`](#oncarddragend)                                                                                             | Callback that will be called when the card move ends                                                              | ✅         | ✅           |
| [`onColumnDragEnd`](#oncolumndragend)                                                                                         | Callback that will be called when the column move ends                                                            | ✅         | ✅           |
| [`renderCard`](#rendercard)                                                                                                   | A card to be rendered instead of the default card                                                                 | ✅         | ✅           |
| [`renderColumnHeader`](#rendercolumnheader)                                                                                   | A column header to be rendered instead of the default column header                                               | ✅         | ✅           |
| [`allowAddColumn`](#allowaddcolumn)                                                                                           | Allow a new column be added by the user                                                                           | ✅         | ✅           |
| [`onNewColumnConfirm`](#onnewcolumnconfirm) (required if use the default column adder template)                               | Callback that will be called when a new column is confirmed by the user through the default column adder template | ✅         | ✅           |
| [`onColumnNew`](#oncolumnnew) (required if `allowAddColumn` or when [`addColumn`](#rendercolumnadder) is called)              | Callback that will be called when a new column is added through the default column adder template                 | 🚫         | ✅           |
| [`renderColumnAdder`](#rendercolumnadder)                                                                                     | A column adder to be rendered instead of the default column adder template                                        | ✅         | ✅           |
| [`disableColumnDrag`](#disablecolumndrag)                                                                                     | Disable the column move                                                                                           | ✅         | ✅           |
| [`disableCardDrag`](#disablecarddrag)                                                                                         | Disable the card move                                                                                             | ✅         | ✅           |
| [`allowRemoveColumn`](#allowremovecolumn)                                                                                     | Allow to remove a column in default column header                                                                 | ✅         | ✅           |
| [`onColumnRemove`](#oncolumnremove) (required if `allowRemoveColumn` or when [`removeColumn`](#rendercolumnheader) is called) | Callback that will be called when a column is removed                                                             | ✅         | ✅           |
| [`allowRenameColumn`](#allowrenamecolumn)                                                                                     | Allow to rename a column in default column header                                                                 | ✅         | ✅           |
| [`onColumnRename`](#oncolumnrename) (required if `allowRenameColumn` or when [`renameColumn`](#rendercolumnheader) is called) | Callback that will be called when a column is renamed                                                             | ✅         | ✅           |
| [`allowRemoveCard`](#allowremovecard)                                                                                         | Allow to remove a card in default card template                                                                   | ✅         | ✅           |
| [`onCardRemove`](#oncardremove) (required if `allowRemoveCard`)                                                               | Callback that will be called when a card is removed                                                               | ✅         | ✅           |
| [`allowAddCard`](#allowaddcard)                                                                                               | Allow to add a card. Expect an object with the position to add the card in the column.                            | 🚫         | ✅           |
| [`onCardNew`](#oncardnew) (required if `allowAddCard` or when [`addCard`](#rendercolumnheader) is called)                     | Callback that will be called when a new card is added through the default card adder template                     | 🚫         | ✅           |
| [`onNewCardConfirm`](#onnewcardconfirm) (required if `allowAddCard`)                                                          | Callback that will be called when a new card is confirmed by the user through the default card adder template     | 🚫         | ✅           |

#### `children`

The board. Use this prop if you want to control the board's state.

#### `initialBoard`

The board. Use this prop if you don't want to control the board's state.

#### `onCardDragEnd`

When the user moves a card, this callback will be called passing these parameters:

| Arg           | Description                                                      |
| ------------- | ---------------------------------------------------------------- |
| `board`       | The modified board                                               |
| `card`        | The moved card                                                   |
| `source`      | An object with the card source `{ fromColumnId, fromPosition }`  |
| `destination` | An object with the card destination `{ toColumnId, toPosition }` |

##### Source and destination

| Prop           | Description                                 |
| -------------- | ------------------------------------------- |
| `fromColumnId` | Column source id.                           |
| `toColumnId`   | Column destination id.                      |
| `fromPosition` | Card's index in column source's array.      |
| `toPosition`   | Card's index in column destination's array. |

#### `onColumnDragEnd`

When the user moves a column, this callback will be called passing these parameters:

| Arg           | Description                                            |
| ------------- | ------------------------------------------------------ |
| `board`       | The modified board                                     |
| `column`      | The moved column                                       |
| `source`      | An object with the column source `{ fromPosition }`    |
| `destination` | An object with the column destination `{ toPosition }` |

##### Source and destination

| Prop           | Description                     |
| -------------- | ------------------------------- |
| `fromPosition` | Column index before the moving. |
| `toPosition`   | Column index after the moving.  |

#### `renderCard`

Use this if you want to render your own card. You have to pass a function and return your card component.
The function will receive these parameters:

| Arg       | Description                                                      |
| --------- | ---------------------------------------------------------------- |
| `card`    | The card props                                                   |
| `cardBag` | A bag with some helper functions and state to work with the card |

##### `cardBag`

| function      | Description                                           |
| ------------- | ----------------------------------------------------- |
| `removeCard*` | Call this function to remove the card from the column |
| `dragging`    | Whether the card is being dragged or not              |

\* It's unavailable when the board is controlled.

Ex.:

```js
const board = {
  columns: [{
    id: ${unique-required-columnId},
    title: ${columnTitle},
    cards: [{
      id: ${unique-required-cardId},
      dueDate: ${cardDueDate},
      content: ${cardContent}
    }]
  }]
}

<Board
  renderCard={({ content }, { removeCard, dragging }) => (
    <YourCard dragging={dragging}>
      {content}
      <button type="button" onClick={removeCard}>Remove Card</button>
    </YourCard>
  )}
>
{board}
</Board>
```

#### `renderColumnHeader`

Use this if you want to render your own column header. You have to pass a function and return your column header component.
The function will receive these parameters:

| Arg         | Description                                              |
| ----------- | -------------------------------------------------------- |
| `column`    | The column props                                         |
| `columnBag` | A bag with some helper functions to work with the column |

##### `columnBag`

| function        | Description                                                |
| --------------- | ---------------------------------------------------------- |
| `removeColumn*` | Call this function to remove the column from the board     |
| `renameColumn*` | Call this function with a title to rename the column       |
| `addCard*`      | Call this function with a new card to add it in the column |

**`addCard`**: As a second argument you can pass an option to define where in the column you want to add the card:

- `{ on: 'top' }`: to add on the top of the column.
- `{ on: 'bottom' }`: to add on the bottom of the column (default).

\* It's unavailable when the board is controlled.

Ex.:

```js
const board = {
  columns: [{
    id: ${unique-required-columnId},
    title: ${columnTitle},
    wip: ${wip},
    cards: [{
      id: ${unique-required-cardId},
      title: ${required-cardTitle},
      description: ${required-cardDescription}
    }]
  }]
}

<Board
  renderColumnHeader={({ title }, { removeColumn, renameColumn, addCard }) => (
    <YourColumnHeader>
      {title}
      <button type='button' onClick={removeColumn}>Remove Column</button>
      <button type='button' onClick={() => renameColumn('New title')}>Rename Column</button>
      <button type='button' onClick={() => addCard({ id: 99, title: 'New Card' })}>Add Card</button>
    </YourColumnHeader
  )}
>
  {board}
</Board>
```

#### `allowAddColumn`

Allow the user to add a new column directly by the board.

#### `onNewColumnConfirm`

When the user confirms a new column through the default column adder template, this callback will be called with a draft of a column with the title typed by the user.

If your board is uncontrolled you **must** return the new column with its new id in this callback.

If your board is controlled use this to get the new column title.

Ex.:

```js
function onColumnNew (newColumn) {
  const newColumn = { id: ${required-new-unique-columnId}, ...newColumn }
  return newColumn
}

<Board initialBoard={board} allowAddColumn onColumnNew={onColumnNew} />
```

#### `onColumnNew`

When the user adds a new column through the default column adder template, this callback will be called passing the updated board and the new column.

This callback will not be called in an uncontrolled board.

#### `renderColumnAdder`

Use this if you want to render your own column adder. You have to pass a function and return your column adder component.
The function will receive these parameters:

| Arg         | Description                      |
| ----------- | -------------------------------- |
| `columnBag` | A bag with some helper functions |

##### `columnBag`

| function     | Description                                                |
| ------------ | ---------------------------------------------------------- |
| `addColumn*` | Call this function with a new column to add the new column |

\* It's unavailable when the board is controlled.

Ex.:

```js
const ColumnAdder = ({ addColumn }) {
  return (
    <div onClick={()=> addColumn({id: ${required-new-unique-columnId}, title: 'Title', cards:[]})}>
      Add column
    </div>
  )
}

<Board
  allowAddColumn
  renderColumnAdder={({ addColumn }) => <ColumnAdder addColumn={addColumn} />}
  {board}
</Board>
```

#### `disableColumnDrag`

Disallow the user from move a column.

#### `disableCardDrag`

Disallow the user from move a card.

#### `allowRemoveColumn`

When using the default header template, when you don't pass a template through the `renderColumnHeader`, it will allow the user to remove a column.

#### `onColumnRemove`

When the user removes a column, this callback will be called passing these parameters:

| Arg      | Description                          |
| -------- | ------------------------------------ |
| `board`  | The board without the removed column |
| `column` | The removed column                   |

#### `allowRenameColumn`

When using the default header template, when you don't pass a template through the `renderColumnHeader`, it will allow the user to rename a column.

#### `onColumnRename`

When the user renames a column, this callback will be called passing these parameters:

| Arg      | Description                       |
| -------- | --------------------------------- |
| `board`  | The board with the renamed column |
| `column` | The renamed column                |

#### `allowRemoveCard`

When using the default card template, when you don't pass a template through the `renderCard`, it will allow the user to remove a card.

#### `onCardRemove`

When the user removes a card, this callback will be called passing these parameters:

| Arg      | Description                          |
| -------- | ------------------------------------ |
| `board`  | The board without the removed column |
| `column` | The column without the removed card  |
| `card`   | The removed card                     |

### 🔩 Helpers to be used with an controlled board

#### `moveColumn`

| Arg                | Description                             |
| ------------------ | --------------------------------------- |
| `board`            | Your board                              |
| `{ fromPosition }` | Index of column to be moved             |
| `{ toPosition }`   | Index destination of column to be moved |

#### `moveCard`

| Arg                              | Description                                |
| -------------------------------- | ------------------------------------------ |
| `board`                          | Your board                                 |
| `{ fromPosition, fromColumnId }` | Index and columnId of card to be moved     |
| `{ toPosition, toColumnId }`     | Index and columnId of the card destination |

#### `addColumn`

| Arg      | Description        |
| -------- | ------------------ |
| `board`  | Your board         |
| `column` | Column to be added |

#### `removeColumn`

| Arg      | Description          |
| -------- | -------------------- |
| `board`  | Your board           |
| `column` | Column to be removed |

#### `changeColumn`

| Arg      | Description                                                                                       |
| -------- | ------------------------------------------------------------------------------------------------- |
| `board`  | Your board                                                                                        |
| `column` | Column to be renamed                                                                              |
| `object` | Pass a object to be merged with the column. You can add new props and/or change the existing ones |

#### `addCard`

| Arg                    | Description                                                                         |
| ---------------------- | ----------------------------------------------------------------------------------- |
| `board`                | Your board                                                                          |
| `inColumn`             | Column to add the card be added                                                     |
| `card`                 | Card to be added                                                                    |
| `{ on: 'bottom|top' }` | Whether the card will be added on top or bottom of the column (`bottom` is default) |

#### `allowAddCard`

Allow the user to add a card in the column directly by the board. By default, it adds the card on the bottom of the column, but you can specify whether you want to add at the top or at the bottom of the board by passing an object with 'on' prop.

E.g.:
<Board allowAddCard /> // at the bottom by default
<Board allowAddCard={{ on: 'bottom' }}  /> // in the bottom of the column
<Board allowAddCard={{ on: 'top' }}  /> // at the top of the column

#### `onCardNew`

When the user adds a new card through the default card adder template, this callback will be called passing the updated board and the new card.

#### `onNewCardConfirm`

When the user confirms a new card through the default card adder template, this callback will be called with a draft of a card with the title and the description typed by the user.

You **must** return the new card with its new id in this callback.

Ex.:

```js
function onCardNew (newCard) {
  const newCard = { id: ${required-new-unique-cardId}, ...newCard }
  return newCard
}

<Board initialBoard={board} allowAddCard onNewCardConfirm={onCardNew} onCardNew={console.log} />
```

#### `removeCard`

| Arg          | Description              |
| ------------ | ------------------------ |
| `board`      | Your board               |
| `fromColumn` | Column where the card is |
| `card`       | Card to be removed       |

## 🧪 Tests

### Unit

```shell
yarn test
```

Code coverage is saved in `coverage` folder. Open HTML report for example with

```shell
open coverage/lcov-report/index.html
```

### End-to-end

Using [Cypress](https://www.cypress.io) test runner. Start dev server and open Cypress using

```shell
yarn dev
```

All tests are in the [cypress/integration](cypress/integration) folder. These tests also collect code coverage and save in several formats in the `coverage` folder. Open HTML report

```shell
open coverage/lcov-report/index.html
```

Read [Cypress code coverage guide](https://on.cypress.io/code-coverage)

Note: to avoid inserting `babel-plugin-istanbul` twice during Jest tests, E2E tests run with `NODE_ENV=cypress` environment variable. The `babel-plugin-istanbul` plugin is included in [.babelrc](.babelrc) file only in the `cypress` Node environment, leaving the default Jest configuration during `NODE_ENV=test` the same.

## 🚴‍♀️ Roadmap

You can view the next features [here](https://github.com/lourenci/react-kanban/milestone/1).
Feel welcome to help us with some PRs.

## 🤝 Contributing

PRs are welcome:

- Fork this project.
- Setup it:
  ```
  yarn
  yarn start
  ```
- Make your change.
- Add yourself to the contributors table:
  ```
  yarn contributors:add
  ```
- Open the PR.

### ✍️ Guidelines for contributing

- You need to test your change.
- Try to be clean on your change. CodeClimate will keep an eye on you.
- It has to pass on CI.

## 🤖 Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://blog.lourenci.com/"><img src="https://avatars3.githubusercontent.com/u/2339362?v=4" width="100px;" alt=""/><br /><sub><b>Leandro Lourenci</b></sub></a><br /><a href="#question-lourenci" title="Answering Questions">💬</a> <a href="https://github.com/lourenci/react-kanban/issues?q=author%3Alourenci" title="Bug reports">🐛</a> <a href="https://github.com/lourenci/react-kanban/commits?author=lourenci" title="Code">💻</a> <a href="https://github.com/lourenci/react-kanban/commits?author=lourenci" title="Documentation">📖</a> <a href="#example-lourenci" title="Examples">💡</a> <a href="https://github.com/lourenci/react-kanban/commits?author=lourenci" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://glebbahmutov.com/"><img src="https://avatars1.githubusercontent.com/u/2212006?v=4" width="100px;" alt=""/><br /><sub><b>Gleb Bahmutov</b></sub></a><br /><a href="https://github.com/lourenci/react-kanban/commits?author=bahmutov" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/mathesouza"><img src="https://avatars0.githubusercontent.com/u/20099472?v=4" width="100px;" alt=""/><br /><sub><b>Matheus Sabino</b></sub></a><br /><a href="https://github.com/lourenci/react-kanban/commits?author=mathesouza" title="Code">💻</a> <a href="https://github.com/lourenci/react-kanban/commits?author=mathesouza" title="Documentation">📖</a> <a href="https://github.com/lourenci/react-kanban/commits?author=mathesouza" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/dizzyrobin"><img src="https://avatars0.githubusercontent.com/u/21962999?v=4" width="100px;" alt=""/><br /><sub><b>Pedro Javier Nicolás</b></sub></a><br /><a href="https://github.com/lourenci/react-kanban/commits?author=dizzyrobin" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/MatheusPoliCamilo"><img src="https://avatars3.githubusercontent.com/u/25781749?v=4" width="100px;" alt=""/><br /><sub><b>Matheus Poli</b></sub></a><br /><a href="https://github.com/lourenci/react-kanban/commits?author=MatheusPoliCamilo" title="Code">💻</a> <a href="https://github.com/lourenci/react-kanban/commits?author=MatheusPoliCamilo" title="Tests">⚠️</a> <a href="https://github.com/lourenci/react-kanban/commits?author=MatheusPoliCamilo" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/sousajunior"><img src="https://avatars0.githubusercontent.com/u/17458197?v=4" width="100px;" alt=""/><br /><sub><b>Carlinhos de Sousa Junior</b></sub></a><br /><a href="https://github.com/lourenci/react-kanban/commits?author=sousajunior" title="Code">💻</a> <a href="https://github.com/lourenci/react-kanban/commits?author=sousajunior" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

[![Maintainability](https://api.codeclimate.com/v1/badges/c602758e03850fdb8b64/maintainability)](https://codeclimate.com/github/lourenci/react-kanban/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c602758e03850fdb8b64/test_coverage)](https://codeclimate.com/github/lourenci/react-kanban/test_coverage)
[![Build Status](https://travis-ci.org/lourenci/react-kanban.svg?branch=master)](https://travis-ci.org/lourenci/react-kanban)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Yet another Kanban/Trello board lib for React.

![Kanban Demo](https://i.imgur.com/yceKUEp.gif)

### ▶️ Demo

[Usage](https://5k7py44kl.codesandbox.io/)

[![Edit react-kanban-demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/5k7py44kl?fontsize=14)

## ❓ Why?

  * 👊 Reliable: 100% tested on CI; 100% coverage; 100% SemVer.
  * 🎮 Having fun: Play with Hooks 🎣 and Styled Components 💅🏻.
  * ♿️ Accessible: Keyboard and mobile friendly.
  * 🔌 Pluggable: For use in projects.

## 🛠 Install and usage

Since this project use Hooks and Styled Components, you have to install them:
  * `react>=16.8.5`
  * `styled-components>=4`

After, Install the lib on your project:
  ```bash
  yarn add @lourenci/react-kanban
  ```
Import the lib and use it on your project:
```js
import Board from '@lourenci/react-kanban'

const board = {
  lanes: [
    {
      id: 1,
      title: 'Backlog',
      cards: [
        {
          id: 1,
          title: 'Add card',
          description: 'Add capability to add a card in a lane'
        },
      ]
    }
    {
      id: 2,
      title: 'Doing',
      cards: [
        {
          id: 2,
          title: 'Drag-n-drop support',
          description: 'Move a card between the lanes'
        },
      ]
    }
  ]
}

<Board>{board}</Board>
```

## 🔥 API
### ⚙️ Props

| Prop                                                            | Description                                                     |
|-----------------------------------------------------------------|-----------------------------------------------------------------|
| [`children`](#children) (required)                              | The board to render                                             |
| [`onCardDragEnd`](#oncarddragend)                               | Callback that will be called when the card move ends            |
| [`onLaneDragEnd`](#onlanedragend)                               | Callback that will be called when the lane move ends            |
| [`renderCard`](#rendercard)                                     | A card to be rendered instead of the default card               |
| [`renderLaneHeader`](#renderlaneheader)                         | A lane header to be rendered instead of the default lane header |
| [`allowAddLane`](#allowaddlane)                                 | Allow a new lane be added by the user                           |
| [`onLaneNew`](#onlanenew) (required if use the default lane adder template)  | Callback that will be called when a new lane is added through the default lane adder template           |
| [`renderLaneAdder`](#renderlaneadder)                           | A lane adder to be rendered instead of the default lane adder template |
| [`disableLaneDrag`](#disablelanedrag)                           | Disable the lane move                                           |
| [`disableCardDrag`](#disablecarddrag)                           | Disable the card move                                           |
| [`allowRemoveLane`](#allowremovelane)                           | Allow to remove a lane in default lane header                   |
| [`onLaneRemove`](#onlaneremove) (required if `allowRemoveLane` or when [`removeLane`](#renderlaneheader) is called) | Callback that will be called when a lane is removed |
| [`allowRenameLane`](#allowrenamelane)                           | Allow to rename a lane in default lane header                   |
| [`onLaneRename`](#onlanerename) (required if `allowRenameLane` or when [`renameLane`](#renderlaneheader) is called) | Callback that will be called when a lane is renamed |
| [`allowRemoveCard`](#allowremovecard)                           | Allow to remove a card in default card template                 |
| [`onCardRemove`](#oncardremove) (required if `allowRemoveCard`) | Callback that will be called when a card is removed             |

#### `children`
```js
const board = {
  lanes: [{
    id: ${unique-required-laneId},
    title: {$required-laneTitle},
    cards: [{
      id: ${unique-required-cardId},
      title: ${required-cardTitle},
      description: ${required-cardDescription}
    }]
  }]
}
```
These cards props are required to the card's default template, except the id that is required for your template too. See [`renderCard`](#rendercard).

These lanes props are required to the lane's default template, except the id that is required for your template too. See [`renderLaneHeader`](#renderlaneheader).

#### `OnCardDragEnd`
When the user moves a card, this callback will be called passing these parameters:

| Arg          | Description                                            |
|--------------|------------------------------------------------------- |
| `board`      | The modified board                                     |
| `source`     | An object with the card source `{ laneId, index }`     |
| `destination`| An object with the card destination `{ laneId, index }`|

##### Source and destination

| Prop    | Description                                                            |
|---------|------------------------------------------------------------------------|
| `laneId`| **In source**: lane source id; **In destination**: lane destination id;|
| `index` | **In source**: card's index in lane source's array; **In destination**: card's index in lane destination's array;|


#### `OnLaneDragEnd`
When the user moves a lane, this callback will be called passing these parameters:

| Arg          | Description                                            |
|--------------|------------------------------------------------------- |
| `board`      | The modified board                                     |
| `source`     | An object with the lane source `{ index }`     |
| `destination`| An object with the lane destination `{ index }`|

##### Source and destination

| Prop    | Description                                                            |
|---------|------------------------------------------------------------------------|
| `index` | **In source**: lane index before the moving; **In destination**: lane index after the moving;|

#### `renderCard`
Use this if you want to render your own card. You have to pass a function and return your card component.
The function will receive these parameters:

| Arg          | Description                                                      |
|--------------|----------------------------------------------------------------- |
| `card`       | The card props                                                   |
| `cardBag`    | A bag with some helper functions and state to work with the card |

##### `cardBag`
| function     | Description                                            |
|--------------|------------------------------------------------------- |
| `removeCard` | Call this function to remove the card from the lane    |
| `dragging`   | Whether the card is being dragged or not               |

Ex.:
```js
const board = {
  lanes: [{
    id: ${unique-required-laneId},
    title: ${laneTitle},
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

#### `renderLaneHeader`
Use this if you want to render your own lane header. You have to pass a function and return your lane header component.
The function will receive these parameters:

| Arg          | Description                                            |
|--------------|------------------------------------------------------- |
| `lane`       | The lane props                                         |
| `laneBag`    | A bag with some helper functions to work with the lane |

##### `laneBag`
| function     | Description                                            |
|--------------|------------------------------------------------------- |
| `removeLane` | Call this function to remove the lane from the board   |
| `renameLane` | Call this function with a title to rename the lane     |

Ex.:
```js
const board = {
  lanes: [{
    id: ${unique-required-laneId},
    title: ${laneTitle},
    wip: ${wip},
    cards: [{
      id: ${unique-required-cardId},
      title: ${required-cardTitle},
      description: ${required-cardDescription}
    }]
  }]
}

<Board
  renderLaneHeader={({ title }, { removeLane, renameLane }) => (
    <YourLaneHeader>
      {title}
      <button type='button' onClick={removeLane}>Remove Lane</button>
      <button type='button' onClick={() => renameLane('New title')}>Rename Lane</button>
    </YourLaneHeader
  )}
>
{board}
</Board>
```

#### `allowAddLane`
Allow the user to add a new lane directly by the board.

#### `onLaneNew`
When the user adds a new lane through the default lane adder template, this callback will be called passing the lane title typed by the user.

You **must** return the new lane with its new id in this callback.

Ex.:
```js
function onLaneNew (newLane) {
  const newLane = { id: ${required-new-unique-laneId}, ...newLane }
  return newLane
}

<Board allowAddLane onLaneNew={onLaneNew}>{board}</Board>
```

#### `renderLaneAdder`
Use this if you want to render your own lane adder. You have to pass a function and return your lane adder component.
The function will receive these parameters:

| Arg          | Description                                            |
|--------------|------------------------------------------------------- |
| `laneBag`    | A bag with some helper functions                       |

##### `laneBag`
| function     | Description                                            |
|--------------|------------------------------------------------------- |
| `addLane`    | Call this function with a new lane to add the new lane |


Ex.:
```js
const LaneAdder = ({ addLane }) {
  return (
    <div onClick={()=> addLane({id: ${required-new-unique-laneId}, title: 'Title', cards:[]})}>
      Add lane
    </div>
  )
}

<Board
  allowAddLane
  renderLaneAdder={({ addLane }) => <LaneAdder addLane={addLane} />}
  {board}
</Board>
```

#### `disableLaneDrag`
Disallow the user from move a lane.

#### `disableCardDrag`
Disallow the user from move a card.

#### `allowRemoveLane`
When using the default header template, when you don't pass a template through the `renderLaneHeader`, it will allow the user to remove a lane.

#### `onLaneRemove`
When the user removes a lane, this callback will be called passing these parameters:

| Arg          | Description                                            |
|--------------|------------------------------------------------------- |
| `board`      | The board without the removed lane                     |
| `lane`       | The removed lane                                       |

#### `allowRenameLane`
When using the default header template, when you don't pass a template through the `renderLaneHeader`, it will allow the user to rename a lane.

#### `onLaneRename`
When the user renames a lane, this callback will be called passing these parameters:

| Arg          | Description                                            |
|--------------|------------------------------------------------------- |
| `board`      | The board with the renamed lane                        |
| `lane`       | The renamed lane                                       |

#### `allowRemoveCard`
When using the default card template, when you don't pass a template through the `renderCard`, it will allow the user to remove a card.

#### `onCardRemove`
When the user removes a card, this callback will be called passing these parameters:

| Arg          | Description                                            |
|--------------|------------------------------------------------------- |
| `board`      | The board without the removed lane                     |
| `lane`       | The lane without the removed card                      |
| `card`       | The removed card                                       |

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
  * Fork this project.
  * Setup it:
      ```
      yarn
      yarn start
      ```
  * Make your change.
  * Add yourself to the contributors table:
      ```
      yarn contributors:add
      ```
  * Open the PR.

### ✍️ Guidelines for contributing
  * You need to test your change.
  * Try to be clean on your change. CodeClimate will keep an eye on you.
  * It has to pass on CI.

## 🤖 Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://blog.lourenci.com/"><img src="https://avatars3.githubusercontent.com/u/2339362?v=4" width="100px;" alt="Leandro Lourenci"/><br /><sub><b>Leandro Lourenci</b></sub></a><br /><a href="#question-lourenci" title="Answering Questions">💬</a> <a href="https://github.com/lourenci/react-kanban/issues?q=author%3Alourenci" title="Bug reports">🐛</a> <a href="https://github.com/lourenci/react-kanban/commits?author=lourenci" title="Code">💻</a> <a href="https://github.com/lourenci/react-kanban/commits?author=lourenci" title="Documentation">📖</a> <a href="#example-lourenci" title="Examples">💡</a> <a href="https://github.com/lourenci/react-kanban/commits?author=lourenci" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://glebbahmutov.com/"><img src="https://avatars1.githubusercontent.com/u/2212006?v=4" width="100px;" alt="Gleb Bahmutov"/><br /><sub><b>Gleb Bahmutov</b></sub></a><br /><a href="https://github.com/lourenci/react-kanban/commits?author=bahmutov" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/mathesouza"><img src="https://avatars0.githubusercontent.com/u/20099472?v=4" width="100px;" alt="Matheus Sabino"/><br /><sub><b>Matheus Sabino</b></sub></a><br /><a href="https://github.com/lourenci/react-kanban/commits?author=mathesouza" title="Code">💻</a> <a href="https://github.com/lourenci/react-kanban/commits?author=mathesouza" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/dizzyrobin"><img src="https://avatars0.githubusercontent.com/u/21962999?v=4" width="100px;" alt="Pedro Javier Nicolás"/><br /><sub><b>Pedro Javier Nicolás</b></sub></a><br /><a href="https://github.com/lourenci/react-kanban/commits?author=dizzyrobin" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/MatheusPoliCamilo"><img src="https://avatars2.githubusercontent.com/u/25781749?s=460&v=4" width="100px;" alt="Matheus Poli"/><br /><sub><b>Matheus Poli</b></sub></a><br /><a href="https://github.com/lourenci/react-kanban/commits?author=matheuspolicamilo" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

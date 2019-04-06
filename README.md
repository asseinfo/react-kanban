[![Maintainability](https://api.codeclimate.com/v1/badges/c602758e03850fdb8b64/maintainability)](https://codeclimate.com/github/lourenci/react-kanban/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c602758e03850fdb8b64/test_coverage)](https://codeclimate.com/github/lourenci/react-kanban/test_coverage)
[![Build Status](https://travis-ci.org/lourenci/react-kanban.svg?branch=master)](https://travis-ci.org/lourenci/react-kanban)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Yet another Kanban/Trello board like lib for React.

## ❓ Why?

  * 👊 Reliable: 100% tested on CI; 100% coverage; 100% SemVer.
  * 🎮 Having fun: Play with Hooks 🎣 and Styled Components 💅🏻.

## 🛠 Install and usage

Install the lib and the dependency on your project:
  ```bash
  yarn add @lourenci/react-kanban styled-components
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

<Board
  onCardDragEnd={() => {}}
>
  {board}
</Board>
```

## 🔥 API
### ⚙️ Props

| Prop                  | Description                                          |
|-----------------------|------------------------------------------------------|
| `children` (required) | The board to render                                  |
| `onCardDragEnd`       | Callback that will be called when the card move ends |

#### `children`
```js
const board = {
  lanes: {
    id: ${laneId},
    cards: {
      id: ${cardId},
      title: ${cardTitle},
      description: ${cardDescription}
    }
  }
}
```

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

## 🤝 Contributing

PRs are welcome. Just fork this project, setup it:
  ```bash
  $ yarn
  $ yarn start
  ```
and open the PR.

### Guidelines for contributing
  * You need to test your change.
  * Try to be clean on your change. CodeClimate will keep an eye on you.
  * It has to pass on CI.

## 🤖 Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://blog.lourenci.com/"><img src="https://avatars3.githubusercontent.com/u/2339362?v=4" width="100px;" alt="Leandro Lourenci"/><br /><sub><b>Leandro Lourenci</b></sub></a><br /><a href="#question-lourenci" title="Answering Questions">💬</a> <a href="https://github.com/lourenci/react-kanban/issues?q=author%3Alourenci" title="Bug reports">🐛</a> <a href="https://github.com/lourenci/react-kanban/commits?author=lourenci" title="Code">💻</a> <a href="https://github.com/lourenci/react-kanban/commits?author=lourenci" title="Documentation">📖</a> <a href="#example-lourenci" title="Examples">💡</a> <a href="https://github.com/lourenci/react-kanban/commits?author=lourenci" title="Tests">⚠️</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

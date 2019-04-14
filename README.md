[![Maintainability](https://api.codeclimate.com/v1/badges/c602758e03850fdb8b64/maintainability)](https://codeclimate.com/github/lourenci/react-kanban/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c602758e03850fdb8b64/test_coverage)](https://codeclimate.com/github/lourenci/react-kanban/test_coverage)
[![Build Status](https://travis-ci.org/lourenci/react-kanban.svg?branch=master)](https://travis-ci.org/lourenci/react-kanban)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Yet another Kanban/Trello board like lib for React.

![Kanban Demo](https://imgur.com/xyOoy2N.gif)

### ▶️ Demo

[Usage](https://5k7py44kl.codesandbox.io/)

[![Edit react-kanban-demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/5k7py44kl?fontsize=14)

## ❓ Why?

  * 👊 Reliable: 100% tested on CI; 100% coverage; 100% SemVer.
  * 🎮 Having fun: Play with Hooks 🎣 and Styled Components 💅🏻.
  * ♿️ Acessible: Keyboard and mobile friendly.

## 🛠 Install and usage

Since this project use Hooks and Styled Components, you have to install them:
  * `react>=16.8.0`
  * `styled-components>=3`

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

<Board
  onCardDragEnd={() => {}}
  onLaneDragEnd={() => {}}
  renderCard={() => {}}
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
| `onLaneDragEnd`       | Callback that will be called when the lane move ends |
| `renderCard`          | A card to be rendered instead of the default card    |

#### `children`
```js
const board = {
  lanes: {
    id: ${unique-required-laneId},
    cards: {
      id: ${unique-required-cardId},
      title: ${cardTitle},
      description: ${cardDescription}
    }
  }
}
```
These cards props are required to the card's default template, except the id that is required for your template too. See [`renderCard`](#rendercard)

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

| Arg          | Description                                            |
|--------------|------------------------------------------------------- |
| `card`       | The card props                                         |
| `isDragging` | Whether the card is being dragged                      |

Ex.:
```js
const board = {
  lanes: {
    id: ${unique-required-laneId},
    cards: {
      id: ${unique-required-cardId},
      dueDate: ${cardDueDate},
      content: ${cardContent}
    }
  }
}

<Board
  renderCard={({ dueDate, content }, isDragging) => (
    <YourCard dueDate={dueDate} content={content} isDragging={isDragging} />
  )}
>
{board}
</Board>
```

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
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://blog.lourenci.com/"><img src="https://avatars3.githubusercontent.com/u/2339362?v=4" width="100px;" alt="Leandro Lourenci"/><br /><sub><b>Leandro Lourenci</b></sub></a><br /><a href="#question-lourenci" title="Answering Questions">💬</a> <a href="https://github.com/lourenci/react-kanban/issues?q=author%3Alourenci" title="Bug reports">🐛</a> <a href="https://github.com/lourenci/react-kanban/commits?author=lourenci" title="Code">💻</a> <a href="https://github.com/lourenci/react-kanban/commits?author=lourenci" title="Documentation">📖</a> <a href="#example-lourenci" title="Examples">💡</a> <a href="https://github.com/lourenci/react-kanban/commits?author=lourenci" title="Tests">⚠️</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

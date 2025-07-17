import { createMachine } from 'xstate';

const game = createMachine({
  id: 'game',
  initial: 'menu',
  states: {
    menu: {
      on: {
        START: 'playing',
        SETTINGS: 'settings'
      }
    },
    settings: {
      on: {
        BACK: 'menu'
      }
    },
    playing: {
      on: {
        PAUSE: 'paused',
        GAME_OVER: 'gameOver',
        WIN: 'victory'
      }
    },
    paused: {
      on: {
        RESUME: 'playing',
        QUIT: 'menu'
      }
    },
    gameOver: {
      on: {
        RETRY: 'playing',
        QUIT: 'menu'
      }
    },
    victory: {
      on: {
        PLAY_AGAIN: 'playing',
        QUIT: 'menu'
      }
    }
  }
});

export default game;
import './sass/App.scss';
import './sass/FirstScreen.scss';

import Game from './classes/Game';

window.addEventListener('DOMContentLoaded', (e) => {
  const game = new Game();
  game.init();
});

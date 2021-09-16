import '../sass/Game.scss';

class Game {
  constructor() {
    this.firstScreen = document.querySelector('.first-screen');
    this.gameElement = document.querySelector('.game');
    this.playButton = document.querySelector('.first-screen__play');
  }

  #showBoard() {
    this.firstScreen.classList.add('first-screen--hidden');
    this.gameElement.classList.add('game--active');
    this.playButton.disabled = true;
  }

  init() {
    this.playButton.addEventListener('click', this.#showBoard.bind(this));
  }
}

export default Game;

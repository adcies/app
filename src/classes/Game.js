import '../sass/Game.scss';
import images from '../images';

import Statistics from './Statistics';

class Game {
  constructor() {
    this.firstScreen = document.querySelector('.first-screen');
    this.gameElement = document.querySelector('.game');
    this.playButton = document.querySelector('.first-screen__play');
    this.restartButton = document.querySelector('.game__play-again');
    this.tiles = [...document.querySelectorAll('.game__tile')];
    this.images = [];
    this.tilesClicked = [];
    this.tilesGuessed = [];
    this.statistics = new Statistics();

    this.time = 5;
  }

  #resetTiles() {
    [...this.tilesClicked, ...this.tilesGuessed].forEach((tile) => {
      tile.style.animation = 'rotateTileClose 0.5s linear 0s 1 both';
      setTimeout(() => {
        tile.style.backgroundImage = `none`;
      }, 250);
    });
    this.tiles.forEach((tile) => {
      tile.style.pointerEvents = 'auto';
    });
  }

  #restartGame() {
    this.#resetTiles();
    this.statistics.resetAttempts();
    this.images = [];
    this.#drawImages();
    this.tilesClicked = [];
    this.tilesGuessed = [];
  }

  #checkIfGameOver() {
    if (this.tilesGuessed.length === this.tiles.length) {
      this.statistics.addWin();
      alert('Game is over. Congratulations!');
    }
  }

  #drawImages() {
    const doubleImages = [...images, ...images];
    while (doubleImages.length) {
      const index = Math.floor(Math.random() * doubleImages.length);
      this.images.push(doubleImages.splice(index, 1)[0]);
    }
  }

  #handleCompareTiles() {
    if (
      this.tilesClicked[0].style.backgroundImage ===
      this.tilesClicked[1].style.backgroundImage
    ) {
      this.tilesGuessed.push(this.tilesClicked[0], this.tilesClicked[1]);
      this.tilesClicked = [];
    } else {
      this.tilesClicked[0].style.animation =
        'rotateTileClose 0.5s linear 0s 1 both';
      this.tilesClicked[1].style.animation =
        'rotateTileClose 0.5s linear 0s 1 both';
      setTimeout(() => {
        this.tilesClicked[0].style.backgroundImage = `none`;
        this.tilesClicked[1].style.backgroundImage = `none`;
        this.tilesClicked = [];
      }, 250);
    }
  }

  #checkIfToCompare() {
    if (this.tilesClicked.length === 2) {
      this.statistics.addAttempt();
      this.#handleCompareTiles();
    }
    setTimeout(() => {
      const tilesDisabled =
        this.tilesClicked.length === 2
          ? this.tilesGuessed
          : [...this.tilesGuessed, ...this.tilesClicked];
      this.tiles
        .filter((tile) => !tilesDisabled.includes(tile))
        .forEach((tile) => (tile.style.pointerEvents = 'auto'));
      this.#checkIfGameOver();
    }, 250);
  }

  #handleClickOnTile(e, index) {
    this.tilesClicked.push(e.target);
    this.tiles.forEach((tile) => {
      tile.style.pointerEvents = 'none';
    });
    e.target.style.animation = 'rotateTile 0.5s linear 0s 1 both';
    setTimeout(() => {
      e.target.style.backgroundImage = `url(${this.images[index]})`;
      setTimeout(() => {
        this.#checkIfToCompare();
      }, 250);
    }, 250);
  }

  #addClickListenerToTiles() {
    this.tiles.forEach((tile, index) => {
      tile.addEventListener('click', (e) =>
        this.#handleClickOnTile.call(this, e, index)
      );
    });
  }

  #startGame() {
    this.#drawImages();
    this.statistics.renderStatistics();
    this.#addClickListenerToTiles();
  }

  #showBoard() {
    this.#startGame();
    this.firstScreen.classList.add('first-screen--hidden');
    this.gameElement.classList.add('game--active');
    this.playButton.disabled = true;
  }

  init() {
    this.playButton.addEventListener('click', this.#showBoard.bind(this));
    this.restartButton.addEventListener('click', this.#restartGame.bind(this));
  }
}

export default Game;

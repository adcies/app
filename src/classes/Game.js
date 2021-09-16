import '../sass/Game.scss';
import images from '../images';

class Game {
  constructor() {
    this.firstScreen = document.querySelector('.first-screen');
    this.gameElement = document.querySelector('.game');
    this.playButton = document.querySelector('.first-screen__play');
    this.tiles = [...document.querySelectorAll('.game__tile')];
    this.images = [];
    this.tilesClicked = [];
    this.tilesGuessed = [];
  }

  #disableTilesClick() {
    this.tiles.forEach((tile) => (tile.style.pointerEvents = 'none'));
  }

  #drawImages() {
    const doubleImages = [...images, ...images];
    while (doubleImages.length) {
      const index = Math.floor(Math.random() * doubleImages.length);
      this.images.push(doubleImages.splice(index, 1));
    }
  }

  #checkIfToCompare() {}

  #handleClickOnTile(e, index) {
    this.tilesClicked.push(e.target);
    e.target.classList.add('game__tile--active');
    e.target.style.pointerEvents = 'none';
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
  }
}

export default Game;

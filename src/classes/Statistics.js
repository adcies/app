import '../sass/Statistics.scss';

class Statistics {
  constructor() {
    this.wins = 0;
    this.attempts = 0;
    this.winsElement = document.querySelector('.statistics__wins-number');
    this.attemptsElement = document.querySelector(
      '.statistics__attempts-number'
    );
  }

  resetAttempts() {
    this.attempts = 0;
    this.attemptsElement.textContent = this.attempts;
  }

  addAttempt() {
    this.attemptsElement.textContent = ++this.attempts;
  }

  addWin() {
    this.winsElement.textContent = ++this.wins;
  }

  renderStatistics() {
    this.winsElement.textContent = this.wins;
    this.attemptsElement.textContent = this.attempts;
  }
}

export default Statistics;

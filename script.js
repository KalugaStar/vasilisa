const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start-btn');
let score = 0;
let timeLeft = 30;
let gameRunning = false;
let moleTimer;
let timer;
// Создаём ячейки для кротов (4x4 = 16 ячеек)
function createHoles() {
 gameBoard.innerHTML = '';
 const totalCells = 9;
 for (let i = 0; i < totalCells; i++) {
 const hole = document.createElement('div');
 hole.className = 'hole';
 const mole = document.createElement('div');
 mole.className = 'mole';
 mole.addEventListener('click', hitMole);
 hole.appendChild(mole);
 gameBoard.appendChild(hole);
 }
}
// Показываем крота в случайной ячейке
function showMole() {
 if (!gameRunning) return;
 const holes = document.querySelectorAll('.hole');
 const randomHole = holes[Math.floor(Math.random() * holes.length)];
 const mole = randomHole.querySelector('.mole');
 mole.classList.add('visible');
 // Убираем крота через случайное время (500–1500 мс)
 setTimeout(() => {
 mole.classList.remove('visible');
 }, Math.random() * 1000 + 500);
}
// Обработка удара по кроту
function hitMole(e) {
 if (e.target.classList.contains('visible')) {
 score++;
 scoreDisplay.textContent = score;
 e.target.classList.remove('visible'); // убираем крота сразу после удара
 }
}
// Запуск игры
function startGame() {
 if (gameRunning) return;
 gameRunning = true;
 score = 0;
 timeLeft = 30;
 scoreDisplay.textContent = score;
 timerDisplay.textContent = timeLeft;
 startButton.disabled = true;
 createHoles();
 // Запускаем появление кротов каждые 600 мс (увеличили частоту для большего количества ячеек)
 moleTimer = setInterval(showMole, 600);
 // Таймер игры
 timer = setInterval(() => {
 timeLeft--;
 timerDisplay.textContent = timeLeft;
 if (timeLeft <= 0) {
 endGame();
 }
 }, 1000);
}
// Завершение игры
function endGame() {
 gameRunning = false;
 clearInterval(moleTimer);
 clearInterval(timer);
 alert(`Игра окончена! Ваш счёт: ${score}`);
 startButton.disabled = false;
}
// Обработчик кнопки старта
startButton.addEventListener('click', startGame);

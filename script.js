let isVip = false;

function checkUser() {
    const username = document.getElementById('username').value;
    if (username.toLowerCase() === 'klimlox') {
        showVipContent();
        isVip = true;
    } else {
        alert('Access Denied');
    }
}

function showVipContent() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('vip-content').style.display = 'block';
    document.getElementById('vip-content').innerHTML = '<h3>Admin Panel</h3>';
}

const FIELD_SIZE = 5;
const MINES_COUNT = 3;
let mines = [];
let gameOver = false;

function startNewGame() {
    const field = document.getElementById('mine-field');
    field.innerHTML = '';
    mines = [];
    gameOver = false;
    document.getElementById('game-status').innerText = '';
    
    for(let i = 0; i < FIELD_SIZE * FIELD_SIZE; i++) {
        const cell = document.createElement('div');
        cell.classList.add('mine-cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        field.appendChild(cell);
    }
    placeMines();
}

function placeMines() {
    while(mines.length < MINES_COUNT) {
        const r = Math.floor(Math.random() * (FIELD_SIZE * FIELD_SIZE));
        if(!mines.includes(r)) mines.push(r);
    }
}

function handleCellClick(event) {
    if(gameOver) return;
    const cell = event.target;
    const idx = parseInt(cell.dataset.index);
    
    if(mines.includes(idx)) {
        gameOver = true;
        showMines();
        document.getElementById('game-status').innerText = 'Game Over';
    } else {
        cell.style.backgroundColor = '#eee';
        cell.innerText = '💎';
    }
}

function showMines() {
    const cells = document.querySelectorAll('.mine-cell');
    mines.forEach(i => {
        cells[i].style.backgroundColor = '#f00';
        cells[i].innerText = '💣';
    });
}

window.onload = startNewGame;

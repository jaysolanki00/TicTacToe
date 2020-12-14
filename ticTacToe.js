let isSinglePlayer = true;
let squares = [];
let tableEl = [];
let isNextPerson = false;
let isDark = false;
const appCosnstants = {
  bgLight: "bg-light",
  bgDark: "bg-dark",
  textLight: "text-light",
  textDark: "text-dark",
};
const player = () => {
  return isNextPerson ? "X" : "O";
};
let winner = null;
const lightTheme = () => {
  const themeTarget = document.getElementById("theme-applier");
  themeTarget.classList.remove(appCosnstants.bgDark);
  themeTarget.classList.remove(appCosnstants.textLight);
  themeTarget.classList.add(appCosnstants.bgLight);
  themeTarget.classList.add(appCosnstants.textDark);
};
const darkTheme = () => {
  const themeTarget = document.getElementById("theme-applier");
  themeTarget.classList.remove(appCosnstants.bgLight);
  themeTarget.classList.remove(appCosnstants.textDark);
  themeTarget.classList.add(appCosnstants.bgDark);
  themeTarget.classList.add(appCosnstants.textLight);
};
const setTheme = (event) => {
  isDark = !isDark;
  event.target.checked = isDark;
  isDark ? darkTheme() : lightTheme();
};

const setMultiPlayer = () => {
  isSinglePlayer = false;
  document.getElementById("game-mode").innerText = "Multi Player Mode";
  newGame();
};

const setSinglePlayer = () => {
  isSinglePlayer = true;
  document.getElementById("game-mode").innerText = "Single Player Mode";
  newGame();
};
const newGame = () => {
  squares = Array(9).fill(null);
  isNextPerson = false;

  winner = null;
  document.getElementById("currentPlayer").innerText =
    "Current player - " + player();
  const table = document.getElementById("table-canvas");
  Array.from(table.children).forEach((tbody) => {
    Array.from(tbody.children).forEach((tr) => {
      Array.from(tr.children).forEach((td) => {
        tableEl.push(td);
      });
    });
  });
  tableEl.forEach((td) => {
    td.innerText = "";
    td.classList.remove("green-border");
  });
};

const calculateWinner = () => {
  let gameDone = false;
  const list = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  list.forEach((l) => {
    const [a, b, c] = l;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      gameDone = true;
      tableEl[a].classList.add("green-border");
      tableEl[b].classList.add("green-border");
      tableEl[c].classList.add("green-border");
    }
  });

  return gameDone;
};

const automatedMove = () => {
  const emptyIndexes = [];
  squares.forEach((_, idx) => {
    !_ && emptyIndexes.push(idx);
  });
  const randomPlace = Math.floor(Math.random() * emptyIndexes.length);
  console.log(randomPlace);
  const index = emptyIndexes[randomPlace];
  makeMove(null, index, tableEl[index]);
};

const makeMove = (event, i, tableElement = null) => {
  if (!squares[i] && !calculateWinner()) {
    if (tableElement) {
      tableElement.innerText = player();
    } else {
      event.target.innerText = player();
    }
    squares[i] = player();
    const done = calculateWinner();
    winner = done ? player() : null;
    if (!done) isNextPerson = !isNextPerson;
    if (isSinglePlayer && isNextPerson) {
      automatedMove();
    }
    if (winner) {
      document.getElementById("winner").innerText =
        "winner is player - " + player();
    } else if (!winner && squares.filter((s) => !s).length === 0) {
      document.getElementById("winner").innerText = "Draw";
    } else {
      document.getElementById("currentPlayer").innerText =
        "Current player - " + player();
    }
  }
};

newGame();
setMultiPlayer();
const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js', {scope: '.'}).then((reg) => {
      console.log('[Service Worker] Registered!');
    }).catch(err => console.log('Registration failed with: ', err))
  }
}
registerServiceWorker();

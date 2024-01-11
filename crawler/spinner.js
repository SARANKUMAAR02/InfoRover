const Color = require('ansi-colors')

function spinner(a="Loading") {
  let frames = [
    "🕛",
    "🕐",
    "🕑",
    "🕒",
    "🕓",
    "🕔",
    "🕕",
    "🕖",
    "🕗",
    "🕘",
    "🕙",
    "🕚",
  ];

  let i = 0;

  const spinnerInterval = setInterval(() => {
    process.stdout.write(`\r${Color.magentaBright.bold(a)} ${frames[i]} `);
    i = (i + 1) % frames.length;
  }, 200);

  // Simulating a task that takes some time
  setTimeout(() => {
    clearInterval(spinnerInterval);
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
  }, 3000);
}


module.exports = {spinner}
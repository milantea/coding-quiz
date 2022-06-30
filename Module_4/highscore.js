const highScoreList = document.querySelector("#highScoreList");

//parsing through json to save data to local storage
const highScore = JSON.parse(localStorage.getItem("highScores") || []);

highScoreList.innerHTML = highScoreList.map((score) => {
  return `
    <li class="high-score">
      ${score.name} - ${score.score}
    </li>`;
}).join;

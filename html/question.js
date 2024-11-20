const answersList = document.querySelectorAll("ol.answers li");

answersList.forEach((li) => li.addEventListener("click", checkClickedAnswer));

// 正しい答え
const correctAnswers = {
  1: "B",
  2: "A",
  3: "B",
  4: "C",
  5: "D",
  6: "B",
};
function checkClickedAnswer(event) {
  // クリックした要素
  const ClickedAnswerElement = event.currentTarget;

  // 選択した答え
  const selectedAnswer = ClickedAnswerElement.dataset.answer;
  // 正しい答え
  const questionId = ClickedAnswerElement.closest("ol.answers").dataset.id;
  const correctAnswer = correctAnswers[questionId];
  // メッセージの変数を用意
  let message;
  // カラーコードの変数を用意
  let answerColorCode;

  if (selectedAnswer === correctAnswer) {
    // 正解した時
    message = "正解です！おめでとう";
    answerColorCode = "";
  } else {
    // 間違えた時
    message = "残念。不正解です！";
    answerColorCode = "#f05959";
  }

  alert(message);
  // 色を変更
  document.querySelector("span#correct-answer").style.color = answerColorCode;

  // 答えを表示
  document.querySelector("div#section-corrent-answer").style.display = "block";
}

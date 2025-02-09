const answersList = document.querySelectorAll("ol.answers li");

answersList.forEach((li) => li.addEventListener("click", checkClickedAnswer));

// // 正しい答え(Javascriptで実装したので不要)
// const correctAnswers = {
//   1: "B",
//   2: "A",
//   3: "B",
//   4: "C",
//   5: "D",
//   6: "B",
// };

function checkClickedAnswer(event) {
  // クリックした要素
  const ClickedAnswerElement = event.currentTarget;

  // 選択した答え
  const selectedAnswer = ClickedAnswerElement.dataset.answer;
  // 問題Noを取得する
  const questionId = ClickedAnswerElement.closest("ol.answers").dataset.id;

  // 正しい答え(Javascriptで実装したので不要)
  // const correctAnswer = correctAnswers[questionId];

  // フォームデータの入れ物を作る
  const formData = new FormData();

  // 送信したい値を追加
  formData.append("id", questionId);
  formData.append("selectedAnswer", selectedAnswer);

  // xhr = XMLHttpRequestの頭文字です
  const xhr = new XMLHttpRequest();

  // HTTPメソッドをPOSTに指定、送信するURLを指定
  xhr.open("POST", "answer.php");

  // フォームデータを送信
  xhr.send(formData);

  // loadendはリクエストが完了したときにイベントが発生する
  xhr.addEventListener("loadend", function (event) {
    /** type {XMLHttpsRequest} */
    const xhr = event.currentTarget;

    // リクエストが成功したかステータスコードで確認
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.response);
      // 答えが正しいか判定
      const result = response.result;

      const correctAnswer = response.correctAnswer;
      const correctAnswerValue = response.correctAnswerValue;
      const explanation = response.explanation;

      // 画面表示
      displayResult(result, correctAnswer, correctAnswerValue, explanation);
    } else {
      alert("ERROR:回答データの取得に失敗しました。");
    }
  });

  // 画面表示
  function displayResult(
    result,
    correctAnswer,
    correctAnswerValue,
    explanation
  ) {
    // メッセージの変数を用意
    let message;
    // カラーコードの変数を用意
    let answerColorCode;

    // 答えを判定
    if (result) {
      // 正解した時
      message = "正解です！おめでとう";
      answerColorCode = "";
    } else {
      // 間違えた時
      message = "残念。不正解です！";
      answerColorCode = "#f05959";
    }

    alert(message);

    // 正解の内容をHTMLに組み込む
    document.querySelector("span#correct-answer").innerHTML =
      correctAnswer + ". " + correctAnswerValue;
    document.querySelector("span#explanation").innerHTML = explanation;

    // 色を変更
    document.querySelector("span#correct-answer").style.color = answerColorCode;

    // 答えを表示
    document.querySelector("div#section-corrent-answer").style.display =
      "block";
  }
}

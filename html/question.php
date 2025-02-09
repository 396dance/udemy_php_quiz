<?php

require __DIR__.'../../lib/functions.php';

// 入力値を変数に入れる
$id = escape($_GET['id'] ?? '');

// クイズの問題情報を取得
$data = fetchById($id);

if (!$data) {
  error404();
}
$formattedData = generateFormattedData($data);

// htmlspecialcharsをつけない場合、スクリプト処理が実行されてしまう
// $question = nl2br($data[1]);
// $question = nl2br(htmlspecialchars($data[1]));
// $question = $formattedData['question'];
// $answers =  $formattedData['answers'];

// $correctAnswer = $formattedData['correctAnswer'];
// $correctAnswerValue = $answers[$correctAnswer];
// $explanation = $formattedData['explanation'];

$assignData = [
  'id' => $formattedData['id'],
  'question' =>$formattedData['question'],
  'answers' => $formattedData['answers'],
];

loadTemplate('question', $assignData);


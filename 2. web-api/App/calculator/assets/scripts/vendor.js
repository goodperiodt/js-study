// vendor.js 문서에는 요소를 취득하는 코드를 작성하는 곳
// 프로그램에서 전역적으로 사용할 변수, (주 함수가 아닌 보조적?인) 함수 정의하는 곳

// 사용자가 계산하고자 하는 피연산자를 입력하는 요소를 얻어 $userInput 에 담는다.
//$userInput 에는 사용자가 입력한 피연산자의 값이 담겨 있다.
const $userInput = document.getElementById('input-number');

const $addBtn = document.getElementById('btn-add');
const $subtractBtn = document.getElementById('btn-subtract');
const $multiplyBtn = document.getElementById('btn-multiply');
const $divideBtn = document.getElementById('btn-divide');

const $currentResultOutput = document.getElementById('current-result');

const $currentCalculationOutput = document.getElementById('current-calculation');

const $logEntries = document.querySelector('.log-entries');

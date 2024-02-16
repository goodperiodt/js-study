// app.js 문서에는 기능을 작성하는 곳



// 계산기 처음에 on했을 때, 계산기에 처음 나오는 값이자
// 사용자가 계산기 사용시 계산기에 나타날 숫자들
// 초기 값으로 0을 준다. 바뀌기 때문에 let으로 선언
let currentResult = 0;

// 계산기를 사용했던 기록들을 모아 둘 배열
// 3번째 section에 목록으로 뿌려줄 배열
const logEntries = [];

// 로그 번호
let seq = 0;

// 1. 사용자가 입력창에 입력한 숫자를 얻자
// input.value는 타입이 기본적으로 string 이다. + 또는 parseInt() 로 형을 변환해준다.
const getUserNumberInput = () => parseInt($userInput.value);

// 계산 기능을 담당하는 함수
const calculate = type => {

    //계산 전 값을 기억하자
    const originalResult = currentResult;
    const enteredNumber = getUserNumberInput();

    let mark;

    if (type === 'ADD') {
        mark = '+';
        currentResult += enteredNumber;
    } else if (type === 'SUB') {
        mark = '-';
        currentResult -= enteredNumber;
    } else if (type === 'MULTI') {
        mark = '*';
        currentResult *= enteredNumber;
    } else if (type === 'DIVIDE') {
        mark = '/';
        currentResult /= enteredNumber;
    }

    $currentCalculationOutput.textContent = `${originalResult} ${mark} ${enteredNumber}`;
    $currentResultOutput.textContent = currentResult;

    // 로그 이력 쌓기
    writeToLog(mark, originalResult, enteredNumber, currentResult);

}

//로그 이력을 만드는 함수
const writeToLog = (operation, prevResult, number, result) => {
    // 하나의 로그 객체 (연산 타입, 이전 결과, 연산 숫자, 연산 결과)
    const logObject = {
        operation,
        prevResult,
        number,
        result
    };
    logEntries.push(logObject);
    console.log(logEntries);

    
    //화면에 로그를 li로 렌더링하는 함수 호출
    renderToLog(logObject);
}

// 로그 이력을 화면에 렌더링하는 함수
// 매개변수로 객체가 전달된다면 매개변수 위치에서 디스트럭쳐링이 가능하다.
const renderToLog = ({operation: mark, prevResult, number, result}) => {
    //li태그 생성
    const $newLi = document.createElement('li');

    // 생성된 li 태그에 클래스 부여하기
    $newLi.classList.add('log-entries-item');

    // 출력할 때 seq값을 올려서 출력해라 
    $newLi.textContent = `#${++seq}. ${prevResult} ${mark} ${number} = ${result}`;

    // ul에 추가
    $logEntries.appendChild($newLi);

}


// 더하기 버튼 이벤트 핸들러
const addHandler = () => {
    calculate('ADD');
}

const subHandler = () => {
    calculate('SUB');
}
const multiHandler = () => {
    calculate('MULTI');
}
const divdeHandler = () => {
    calculate('DIVIDE');
}




// ================이벤트 핸들러 바인딩===========
$addBtn.addEventListener('click', addHandler);

$subtractBtn.addEventListener('click', subHandler);

$multiplyBtn.addEventListener('click', multiHandler);

$divideBtn.addEventListener('click', divdeHandler);
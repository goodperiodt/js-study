function correctAnswer($icon) {
    //1. #finish 박스에 class 'show' 부여
    const $finish = document.getElementById('finish');
    $finish.classList.add('show');

    // 2. #numbers 클릭 이벤트 해제
    // start.js에 defined된 #numbers
    // checkAswer.js에서는 #numbers 인식을 못한다.
    document.getElementById('numbers').onclick = null;

    // 3. 사용자가 선택한 아이콘에  id 'move' 추가
    //    setAttribute('속성명','속성값');
    //    $icon(사용자가 선택한 특정 아이콘(요소))에 
    //    속성  id를 부여하는데, id의 값은 move다.
    $icon.setAttribute('id', 'move');
}
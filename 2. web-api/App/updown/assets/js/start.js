// 게임이 시작되면 해야할 일을 정의하는 함수

/*
    특정 클래스, 함수, 변수 등을 독립적으로 구성한 후에 import하는 쪽에서 식별자로 바로 import 하게 하려면 export default를 선언합니다.

    선언된 함수들, 클래스들, 변수들을 모듈화 시켜서 객체 형태로 전달할 때는 export만 붙인다. import를 받는 쪽에서는 디스트럭쳐링 문법을 이용하여 받아 사용합니다.
*/

// import하는 입장(app.js)에서 특정함수만 import할 수 있게 설정하는 export default function 함수명() {}
export default function gameStart() {
    // console.log('gameStart 함수가 호출됨!');

    // 숫자 아이콘을 담을 박스 요소 얻기
    const $numbers = document.getElementById('numbers');

    // 아이콘 박스를 생성하는 함수
    const makeIcon = () => {
        // 가상 DOM 컨테이너 생성
        const $frag = document.createDocumentFragment();
        console.log($frag);

        for(let n=1; n <=100; n++) {
            //<div class='icon'>1</icon>
            const $icon = document.createElement('div');
            $icon.classList.add('icon');
            $icon.textContent = n;

            //data-icon-number = 1
            $icon.dataset.iconNumber = n;
            $frag.appendChild($icon);
        }
        $numbers.appendChild($frag);
    }

    makeIcon();

    // 아이콘에 클릭 이벤트를 부여하기

    // 아이콘이 아닌 곳을 클릭하면 이벤트가 발생하지 않도록 처리하는 코드
    $numbers.addEventListener('click', e => {
        if(!e.target.matches('#numbers .icon')) return;

        console.log(`사용자가 클릭한 아이콘 번호: ${e.target.dataset.iconNumber}번`);
    });
}


/* 정답을 검증하는 함수를 선언할 것이다.

 gameStart() 함수가 checkNumber() 함수를 부를 것이고, app.js에게는 checkNumber() 이 함수를 주고 싶지 않다. 그래서 import는 적절하지 않다.
*/

// export let x = 0;
// export const name = '박성주';
// 또는 let x와 const name 앞에 export를 각각 붙이지 말고 let x와 const name 선언 후, export {x, name} 선언 후 사용도 가능하다.
function checkNumber() {

}
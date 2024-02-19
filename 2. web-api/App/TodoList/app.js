// 일정 데이터(할 일 정보 객체)가 들어 있는 배열 선언
const todos = [{
        id: 1,
        text: '할 일 1',
        done: false // checkbox를 클리해서 할 일을 마쳤는지의 여부
    },
    {
        id: 2,
        text: '할 일 2',
        done: false // checkbox를 클리해서 할 일을 마쳤는지의 여부
    },
    {
        id: 3,
        text: '할 일 3',
        done: false // checkbox를 클리해서 할 일을 마쳤는지의 여부
    }
];

// 화면에 표현할 li.todo-list item 노드를 생성하는 함수 정의
function makeNewTodoNode(newTodo) {
    const $li = document.createElement('li');
    const $label = document.createElement('label');
    const $divMod = document.createElement('div');
    const $divRem = document.createElement('div');

    $label.classList.add('checkbox');
    const $check = document.createElement('input');
    $check.setAttribute('type', 'checkbox');
    const $span = document.createElement('span');
    $span.classList.add('text');
    $span.textContent = newTodo.text;
    $label.appendChild($check);
    $label.appendChild($span);

    // 수정 div 태그 작업
    $divMod.classList.add('modify');
    const $modIcon = document.createElement('span');

    // 클래스 이름을 두 개 이상 add할 때, 각각 지정해야 한다.
    // 한번에 공백 포함 두 개 이상 설정하면 에러다.
    // $modIcon.classList.add('lnr lnr-undo');
    $modIcon.classList.add('lnr', 'lnr-undo');
    $divMod.appendChild($modIcon);

    // 삭제 div태그 작업
    $divRem.classList.add('remove');
    const $remIcon = document.createElement('span');
    $remIcon.className = 'lnr lnr-cross-circle';
    $divRem.appendChild($remIcon);

    // li 태그 작업
    $li.dataset.id = newTodo.id;
    $li.classList.add('todo-list-item');

    // $li.appendChild($label);
    // $li.appendChild($divMod);
    // $li.appendChild($divRem);
    for (let $ele of [$label, $divMod, $divRem]) {
        $li.appendChild($ele);
    }

    // [$label, $divMod, $divRem].forEach($ele => $li.appendChild($ele));

    // ul 태그를 지목해서 $li를 자식 노드로 추가
    document.querySelector('.todo-list').appendChild($li);
}

// 추가될 할 일 객체의 id를 생성해 주는 함수 정의
function makeNewId() {
    if (todos.length > 0) {
        // 배열 내의 할 일 객체 중 마지막 객체의 id보다 하나 크게
        return todos[todos.length - 1].id + 1;
    } else {
        // 할 일 객체가 하나도 없는 경우에 1을 반환한다.
        return 1;
    }
}


// 할 일 추가 처리 함수 정의
function insertTodoDate() {

    // 사용자가 작성할 할 일 input 요소 얻기
    const $todoText = document.getElementById('todo-text');

    // 1. 입력값이 없다면 추가 처리하지 않겠습니다.
    // 공백이 들어갈 가능성이 있기 때문에 공백을 제거하고 비교.
    // 공백 제거 함수: trim() === '';
    // 입력값이 공백이다? -> background: orangered, placeholder: 필수 입력사항입니다!, 이벤트 강제 종료
    // console.log($todoText);
    if ($todoText.value.trim() === '') {
        $todoText.style.background = 'orangered';
        $todoText.setAttribute('placeholder', '필수 입력사항입니다!');

        // 다시 작성하게 하기 전 입력란을 비워두기
        $todoText.value = '';
        return;
    } else {
        $todoText.setAttribute('placeholder', '할 일을 입력하세요');
        $todoText.style.background = '';
    }

    //2. todos 배열에 객체를 생성한 후 추가 (id 추가 순서대로 잘 진행하세요.)
    const newTodo = {
        id: makeNewId(), //todos.length+1,
        text: $todoText.value,
        done: false
    }

    todos.push(newTodo);


    //3. 추가된 데이터를 화면에 표현 (li 태그를 추가)
    makeNewTodoNode(newTodo);

    //4. 입력 완료 후 input에 존재하는 문자열을 제거.
    $todoText.value = '';

};

// 할 일 완료 처리를 수행할 함수를 정의
function changeCheckState($label) {
    // 할 일 완료된 노드의 클래스 이름을 추가
    // checked라는 클래스 이름을 추가하기,
    // 근데 할 일 완료는 껐다 켰다 할 수 있어야 함 toggle?
    // -> 체크 여부에 따라 클래스 이름이 추가됐다, 제거 됐다 할 수 있어야 함
    $label.lastElementChild.classList.toggle('checked');


    // 전역 변수로 선언한 배열 안의 객체의 done 값을 수정해야 한다.
    // data-id를 얻어서, 그와 일치하는 객체의 done 값을 true로 바꾸어야 한다.
    // 만약, 기존의 값이 true였다? 그럼 false로 바뀐다.
    const dataId = +$label.parentNode.dataset.id;
    const index = findIndexByDataId(dataId);

    todos[index].done = !todos[index].done;
    // for (let i = 0; i < todos.length; i++) {
    //     if (dataId === todos[i].id) {
    //         todos[i].done = !todos[i].done;
    //         console.log(todos);
    //     }
    // }
}

// data-id값으로 배열을 탐색하여 일치하는 객체가 들어있는 인덱스 반환
function findIndexByDataId(dataId) {
    for (let i = 0; i < todos.length; i++) {
        if (dataId === todos[i].id) {
            return i;
        }
    }
}

// 할 일 삭제 처리 함수 정의
function removeTodoData($delTarget) {
    // $delTarget은 ul안의 li

    // 애니메이션 적용을 위해 클래스 이름을 추가(delMoving)
    $delTarget.classList.add('delMoving');

    // ul 안에 있는 li를 removeChild로 제거하기 전에 애니메이션 발동 및 배열 내부 객체 삭제가 진행될 수 있도록 시간을 일부러 지연.
    // setTimeout()
    // 시간 지연은 1.5초 진행해주세요 (시간을 지연하는 window 함수가 있었습니다.)
    setTimeout(() => {
        //document.querySelector('.todo-list').removeChild($delTarget);
        $delTarget.parentNode.removeChild($delTarget);

        // 배열 내에 있는 객체도 삭제를 진행.
        // --> 할 일 완료 처리 함수쪽에 비슷한 로직이 있는데,
        //     함수화 처리할 것.
        // pop()이 아닌 splice() -> 삭제되고자 하는 객체가 배열의 몇 번째 인덱스에 있는지의 여부를 알아야 한다.
        // let result = findIndexByDataId(dataId);
        const index = findIndexByDataId(+$delTarget.dataset.id);
        //알려준 인덱스부터 1개만 지우세요.
        todos.splice(index, 1);
        console.log(todos);
    }, 1500);
};

// 수정 모드 진입 이벤트 함수
function enterModifyMode($modSpan) {
    // 수정 모드 진입 버튼을 교체 (lnr-undo -> lnr-checkmark-circle)
    // 클래스 이름만 교체해도 아이콘 모양이 바뀐다.
    // $modSpan.classList.remove('lnr-undo');
    // $modSpan.classList.add('lnr-checkmark-circle');
    $modSpan.classList.replace('lnr-undo', 'lnr-checkmark-circle');

    const $label = $modSpan.parentNode.previousElementSibling;
    // console.log($modSpan.parentNode);

    const $textSpan = $label.lastElementChild;
    const $modInput = document.createElement('input');

    $modInput.classList.add('modify-input');
    $modInput.setAttribute('value', $textSpan.textContent);

    $label.replaceChild($modInput, $textSpan);
}

// 수정 완료 이벤트 처리 함수
function modifyTodoData($modCompleteSpan) {
    // 버튼을 원래대로 돌립니다. (lnr-undo)
    $modCompleteSpan.classList.replace('lnr-checkmark-circle','lnr-undo');

    // input을 다시 span.txt로 변경
    const $label = $modCompleteSpan.parentNode.previousElementSibling;

    const $modInput =  $label.lastElementChild;

    const $textSpan = document.createElement('span');
    $textSpan.textContent = $modInput.value;
    $textSpan.classList.add('text');

    $label.replaceChild($textSpan, $modInput);

    // 배열 내의 id가 일치하는 객체를 찾아서 text 프로퍼티의 값을 수정된 값으로 변경
    const idx = findIndexByDataId(+$label.parentNode.dataset.id);
    todos[idx].text = $textSpan.textContent;
    console.log($textSpan.textContent);
    // $textSpan.textContent = $textSpan.setAttribute(value);

    // 배열 내의 id가 일치하는 객체를 찾아서
    // text 프로퍼티 값을 수정된 값으로 변경해야 한다.
    // const index = findIndexByDataId(dataId);
    

}

// main 역할을 하는 즉시 실행 함수를 정의한다. 선언하자마자 바로 실행되는 함수다.
(function () {
    //할 일 추가 이벤트 등록
    const $addBtn = document.getElementById('add');
    $addBtn.addEventListener('click', e => {
        //form 태그 안의 button은 type을 명시하지 않으면 자동 submit이 동작합니다.
        // html에서 button 태그에 속성 type="button"을 추가하지 않았으면, js에서 버튼요소를 얻어 버튼에 버튼의 고유기능을 중지하는 메서드를 정의한다.
        // e.preventDefault(); 버튼의 고유기능(submit)을 중지
        insertTodoDate();
    });

    //할 일 완료(체크박스) 이벤트: 사용자가 체크박스 누르면 줄 그어지는 것
    const $todoList = document.querySelector('ul.todo-list');

    $todoList.addEventListener('click', e => {
        if (!e.target.matches('input[type=checkbox]'))
            return; // checkbox에서만 이벤트가 동작하도록 처리.

        changeCheckState(e.target.parentNode); // label을 함수의 매개값으로 전달.

    });




    //할 일 삭제 이벤트
    $todoList.addEventListener('click', e => {
        if (!e.target.matches('.todo-list .remove span')) {
            return;
        }
        // console.log(e.target);
        // console.log(e.target.parentNode.parentNode);

        removeTodoData(e.target.parentNode.parentNode);
    });

    //할 일 수정 이벤트(수정 모드 진입 및 수정 완료)
    $todoList.addEventListener('click', e => {
        if (e.target.matches('.todo-list .modify span.lnr-undo')) {
            enterModifyMode(e.target); // 수정모드 진입
            
        } else if(e.target.matches('.todo-list .modify span.lnr-checkmark-circle')) {
            modifyTodoData(e.target); // 수정모드에서 수정을 확정지으려는 이벤트
        } else {
            return;
        }
    });
})();
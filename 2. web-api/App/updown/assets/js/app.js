
// index.html에는 app.js(현재파일) 이 import 되어 있습니다.
// 현재 파일을 실행부로 취급해서 각각의 기능은 파일별로 따로 구현해 보겠습니다.

// 자바스크립트 파일들끼리 import가 가능하다.
// import start from './start.js';

// ./start.js 에서 gameStrart함수가 export 로만 설정되어 있는 경우,
//->import {gameStart} from "./start.js";



// ./start.js 에서 gameStrart함수가 export default로 설정되어 있는 경우,
import gameStart from "./start.js";


(function() {
    gameStart();
    // console.log(`import로 전달받은 값: ${x}, ${name}`);
})();
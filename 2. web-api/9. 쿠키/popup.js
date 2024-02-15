function createCookie(name) {
  const date = new Date();
  date.setDate(date.getDate+1); // 쿠키의 수명을 하루로 설정
  const cookie = `${name}=true;expries=${date.toUTCString()}`; // 중간에 세미콜론 꼭 찍으세요!
  
  // 쿠키 생성
  document.cookie = cookie;
  
}
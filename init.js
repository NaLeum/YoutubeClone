import app from './app';


const PORT = 4000;

// 원래는 바벨을 통해 arrow function을 사용했지만, nodejs의 버전업으로 그냥도 읽힌다.
const handleListening = () => {
    console.log(`Listening on: http://localhost:${PORT}`);
} // listen의 콜백함수

app.listen(PORT, handleListening); // PORT에 설정된 포트를 listen해라, 그리고 listening을 시작할 떄 handleListing함수를 호출해라
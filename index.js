// const express = require('express');
// // require는 기본적으로 node module 을 어딘가에서 가져오는것이다.
// // 기본적인 파일에서 찾고 없으면 node_modules로 들어가찾는다. 
import express from "express";
// 바벨을 사용함으로서 require를 import로 대체할 수 있게된다.
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
const app = express();

const PORT = 4000;

// 원래는 바벨을 통해 arrow function을 사용했지만, nodejs의 버전업으로 그냥도 읽힌다.
const handleListening = () => {
    console.log(`Listening on: http://localhost:${PORT}`);
} // listen의 콜백함수

const handleHome = (req,res) => {
    res.send('hello world'); // 웹사이트가 브라우저에 요청에 대한 답을 해준다. 보통은 html과 css로 답을 한다. 혹은 데이타베이스..
}

const handleProfile = (req,res) => {
    res.send('hello profile')
}
// express 에서 middleware는 연결이 끝날때 까지 기다리는것
// request의 시작은 브라우저에서! 
// 그럼 index파일이 실행되고 route가 존재하는지 찾아본다. home을 찾아 handleHome을 호출하고 handlehome은 응답을 한다. 
// 하지만 이렇게 간단하지 않고 유저와 마지막 응답 사이에 존재하는 것이 있다. 그것이 middleware

// const betweenHome = (req,res,next) => {
//     console.log('between');
//     // express의 모든 route와 connection을 다루는 것들은 next를 가지고 있다.
//     next(); // 이제 다음 middleware를 호출할것인데 그게 handleHome이야!
// };
// // 전체적인 route에 midleware를 적용하겠다.
// app.use(betweenHome);
// app.get('/', betweenHome ,handleHome); // 특정 route에 middleware를 적용하겠다.


app.use(cookieParser()); // cookie에 유저정보를 저장할 것인데 그것을 가능하게 해준다.
app.use(bodyParser.urlencoded({ extended: true })); // body로부터 정보를 얻을 수 있게 해준다
app.use(bodyParser.json({ extended: true })); // urlencode와 json으로 부터 정보를 받을 수 있도록 설정한다.
app.use(helmet()); // helmet은 우리 어플리케이션의 보안을 높여준다
app.use(morgan("dev"));// morgan은 로그를 찍는 middleware

app.get('/', handleHome); 
app.get('/profile',handleProfile)


app.listen(PORT, handleListening); // PORT에 설정된 포트를 listen해라, 그리고 listening을 시작할 떄 handleListing함수를 호출해라
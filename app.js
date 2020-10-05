// const express = require('express');
// // require는 기본적으로 node module 을 어딘가에서 가져오는것이다.
// // 기본적인 파일에서 찾고 없으면 node_modules로 들어가찾는다. 
import express from "express";
// 바벨을 사용함으로서 require를 import로 대체할 수 있게된다.
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import globalRouter from './routers/globalRouter';
import routes from './routes';
import { localsMiddleware } from "./middlewares";

const app = express();

// const handleHome = (req,res) => {
//     res.send('hello world'); // 웹사이트가 브라우저에 요청에 대한 답을 해준다. 보통은 html과 css로 답을 한다. 혹은 데이타베이스..
// }

// const handleProfile = (req,res) => {
//     res.send('hello profile')
// }
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

app.use(helmet()); // helmet은 우리 어플리케이션의 보안을 높여준다
app.set("view engine", "pug"); 
// view engine으로 pug를 사용하겠다. // pug와 express에는 view파일의 기본 설정이 있는데 디렉토리는 /views이다.


// express.static : directory에서 file을 보내주는 미들웨어
app.use('/uploads',express.static("uploads"));
app.use('/static',express.static("static"));


app.use(cookieParser()); // cookie에 유저정보를 저장할 것인데 그것을 가능하게 해준다.
app.use(bodyParser.urlencoded({ extended: true })); // body로부터 정보를 얻을 수 있게 해준다
app.use(bodyParser.json()); // urlencode와 json으로 부터 정보를 받을 수 있도록 설정한다.
app.use(morgan("dev"));// morgan은 로그를 찍는 middleware


app.use(localsMiddleware) //라우터들에서 local에 접근해야하기 떄문에 위에 둔다

// app.get('/', handleHome); 
// app.get('/profile',handleProfile)
app.use(routes.home,globalRouter);
app.use(routes.users, userRouter); // 누가 user로 접속하면 userRouter로 보내겠다.
app.use(routes.videos, videoRouter);

export default app; // app을 모듈화 해서 다른 파일에서도 사용 할 수 있게 한다.
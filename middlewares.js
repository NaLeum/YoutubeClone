import routes from "./routes";
import multer from 'multer';

export const localsMiddleware = (req,res,next) => {
    res.locals.siteName = 'NaleumTube';
    res.locals.routes = routes;
    res.locals.user = {
        isAuthenticated: true,
        id:1
    }
    next();
} // locals는 로컬변수응답을 포함하는 객체입니다. 
// locals에 있는것은 템플릿에 변수명처럼 존재한다.

const multerVideo = multer({ dest: "uploads/videos/" });

export const uploadVideo = multerVideo.single('videoFile');
import routes from "./routes";
import multer from 'multer';

export const localsMiddleware = (req,res,next) => {
    res.locals.siteName = 'NaleumTube';
    res.locals.routes = routes;
    res.locals.user = req.user || null;
    next();
} // locals는 로컬변수응답을 포함하는 객체입니다. 
// locals에 있는것은 템플릿에 변수명처럼 존재한다.

const multerVideo = multer({ dest: "uploads/videos/" });

export const uploadVideo = multerVideo.single('videoFile');

export const onlyPublic = (req, res, next) => {
    if (req.user) {
      res.redirect(routes.home);
    } else {
      next();
    }
  };

export const onlyPrivate = (req, res, next) => {
    if (req.user){
        next();
    } else {
        res.redirect(routes.home);
    }
}
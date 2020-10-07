import passport from 'passport';
import User from './models/User';

// localStrategy를 사용하라 : username password
passport.use(User.createStrategy());

// serialization : 어떤 정보를 쿠키에게 주느냐
// deserizlization : 어느 사용자인지 어떻게 찾느냐 쿠키의 정보를 누구에게 주느냐
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
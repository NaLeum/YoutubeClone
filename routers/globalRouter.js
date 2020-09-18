import express from 'express';
import routes from '../routes';
import { home, search } from '../controllers/videoController';
import { join, login, logout } from '../controllers/userController';

const globalRouter = express.Router();

globalRouter.get(routes.home, (req,res) => home);
globalRouter.get(routes.join, (req,res) => join);
globalRouter.get(routes.login, (req,res) => login);
globalRouter.get(routes.logout, (req,res) => logout);
globalRouter.get(routes.search, (req,res) => search);


export default globalRouter;
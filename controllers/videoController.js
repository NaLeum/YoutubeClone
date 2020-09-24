// export const home = (req,res) => res.send("Home");
// home을 찾아 렌더링해라 view engine을 사용하는 방법

import { query } from "express";

// render 함수의 첫번째 인자는 템플릿, 두번째 인자는 템플릿에 추가할 정보가 담긴 객체
export const home = (req, res) => res.render("home", { pageTitle: 'Home' });

export const search = (req, res) => {
    // console.log(req.query);
    // const searchingBy = req.query.term; //es6이전의 예전문법
    const {query: { term : searchingBy }} = req;
    res.render("search", { pageTitle: 'Search' , searchingBy });
}

export const upload = (req, res) => res.render("upload", { pageTitle: 'Upload' });

export const videoDetail = (req, res) => res.render("videoDetail", { pageTitle: 'Video Detail' });

export const editVideo = (req, res) => res.render("editVideo", { pageTitle: 'Edit Video' });

export const deleteVideo = (req, res) => res.render("deleteVideo", { pageTitle: 'Delete Video' });
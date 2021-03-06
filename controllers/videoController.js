// import {videos} from "../db"
import routes from "../routes";
import Video from '../models/Video';

// export const home = (req,res) => res.send("Home");
// home을 찾아 렌더링해라 view engine을 사용하는 방법

// render 함수의 첫번째 인자는 템플릿, 두번째 인자는 템플릿에 추가할 정보가 담긴 객체
export const home = async(req, res) => {
    try{
        const videos = await Video.find({}).sort({_id:-1});
        res.render("home", { pageTitle: 'Home' , videos});

    }catch(error){
        console.log(error);
        res.render("home", { pageTitle: 'Home' , videos:[]});
    }
}
export const search = async(req, res) => {
    // console.log(req.query);
    // const searchingBy = req.query.term; //es6이전의 예전문법
    const {query: { term : searchingBy }} = req;
    let videos = [];

    try {
        videos = await Video.find({
            $or:[
            {title: { $regex: searchingBy, $options:'i' }},
            {description :{ $regex: searchingBy, $options:'i' }} 
            ]
        });
    } catch (error) {
        console.log(error);
    }
    res.render("search", { pageTitle: 'Search' , searchingBy, videos });
}

export const getUpload = (req, res) => {
    res.render("upload", { pageTitle: 'Upload' });
}
export const postUpload = async(req, res) => {
    const{
        body:{
         title, description
        },
        file:{path}
    }=req;
    const newVideo = await Video.create({
        fileUrl:path,
        title,
        description
    });
    res.redirect(routes.videoDetail(newVideo.id))
}

export const videoDetail = async(req, res) => {
    // console.log(req.params);
    const {
        params:{id}
    } = req;
    try{
        const video = await Video.findById(id);
        // console.log(video)
        res.render("videoDetail", { pageTitle: video.title,video })
    }catch(error){
        console.log(error);
        res.redirect(routes.home);
    }

};

export const getEditVideo = async(req, res) => {
    const {
        params: { id }
    } = req;
    try{
        const video = await Video.findById(id);
        res.render('editVideo', {pageTitle: `Edit ${video.title}`,video})
    }catch(error){
        res.redirect(routes.home);
    }
};
export const postEditVideo = async(req, res) => {
    const {
        params: { id },
        body:{title,description}
    } = req;
    try {
       await Video.findOneAndUpdate({_id: id},{title,description});
       res.redirect(routes.videoDetail(id));
    } catch (error) {
        res.redirect(routes.home); 
    }
}

export const deleteVideo = async(req, res) => {
    const {
        params : { id }
    }=req;
    try {
        await Video.findOneAndRemove({_id:id})
    } catch (error) {
        console.log(error);
    }
    res.redirect(routes.home);
};
// export const videos = [
//     {
//       id: 324393,
//       title: "Video awesome",
//       description: "This is something I love",
//       views: 24,
//       videoFile: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
//       creator: {
//         id: 121212,
//         name: "Nicolas",
//         email: "nico@las.com"
//       }
//     },
//     {
//       id: 1212121,
//       title: "Video super",
//       description: "This is something I love",
//       views: 24,
//       videoFile:  "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
//       creator: {
//         id: 121212,
//         name: "Nicolas",
//         email: "nico@las.com"
//       }
//     },
//     {
//       id: 55555,
//       title: "Video nice",
//       description: "This is something I love",
//       views: 24,
//       videoFile:  "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
//       creator: {
//         id: 121212,
//         name: "Nicolas",
//         email: "nico@las.com"
//       }
//     },
//     {
//       id: 11111,
//       title: "Video perfect",
//       description: "This is something I love",
//       views: 24,
//       videoFile:  "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
//       creator: {
//         id: 121212,
//         name: "Nicolas",
//         email: "nico@las.com"
//       }
//     }
//   ];

// mongodb 는 데이터베이스 mogoose는 어뎁터
// nosql database이고 규칙이 적고 엄청 유연
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_URL,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    }
);

const db = mongoose.connection;

const handleOpen = () => {
    console.log("Connected to DB")
};

const handleError = error => console.log(`Error on DB Connection:${error}`)

db.once('open',handleOpen);
db.on('error',handleError);
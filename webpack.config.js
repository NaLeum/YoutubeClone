// 100퍼센트 클라이언트 코드
// 바벨 사용 불가능

const path = require("path");
const ExtractCSS = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");

const MODE = process.env.WEBPACK_ENV;

// 파일을 가져오기 위함
const ENTRY_FILE = path.resolve(__dirname,"assets","js","main.js");

// 파일을 보내기 위함
const OUTPUT_DIR = path.join(__dirname,"static");

const config = {
    entry: ENTRY_FILE,
    mode:MODE,
    module: {
        rules:[
            {
                test: /\.(scss)$/,
                use: ExtractCSS.extract([
                    {
                        // webpack이 css를 사용할 수 있게 해준다.
                        loader:"css-loader"
                    },
                    {
                        // css를 받아서 plugin을 가지고 css를 변환.
                        // 호환성!
                        loader:"postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins() {
                                        return [autoprefixer({ overrideBrowserslist: "cover 99.5%" })]
                                        }    
                                    }     
                                }
                    },
                    {
                        // Sass or Scss를 받아서 css로 바꿔줄수있다.
                        loader:"sass-loader"
                    }
                ])
            }
        ]
    },
    output: {
        path: OUTPUT_DIR,
        filename: "[name].js"
    },
    plugins: [new ExtractCSS("styles.css")]
};

module.exports = config;
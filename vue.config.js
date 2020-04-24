const autoprefixer = require('autoprefixer');
const pxtoviewport = require('postcss-px-to-viewport');
module.exports = {
    publicPath:'/mall',
    outputDir: 'mall',
    productionSourceMap: false,
    devServer: {
        // host: "192.168.1.104",
        port: '8888',
        open: true, //是否自动弹出浏览器页面
    },
    css: {
        loaderOptions: {
            // 给 sass-loader 传递选项
            sass: {
                // @/ 是 src/ 的别名
                // 所以这里假设你有 `src/variables.scss` 这个文件
                prependData: `@import "src/assets/css/mixins.scss";@import "src/assets/css/variables.scss";`
            },
            postcss: {
                plugins: [
                    autoprefixer(),
                    pxtoviewport({
                        viewportWidth: 375
                    })
                ]
            }
        }
    },
}
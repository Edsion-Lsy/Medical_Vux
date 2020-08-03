'use strict'
// Template version: 1.2.4
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',  
    //assetsPublicPath: '/',  
   // 3、其中dev是开发环境，build是构建版本，找到build下面的assetsPublicPath: '/',
   //然后修改为assetsPublicPath: './',即“/”前加点。
    //proxyTable: {},
    proxyTable: {
                  '/api': {
                    // 服务器地址为HTTPS
                    //target:'https://www.xxxx.com', 
                    //secure: false, 
                    
                    // 服务器地址为HTTP
                    target:'http://localhost:20406', // 服务器地址
                    changeOrigin: true, // 是否跨域
                    secure: true, // 允许https请求
                    pathRewrite: {
                      '^/api': ''
                    }
                  },
                  '/fa': {
                  
                    
                    // 服务器地址为HTTP
                    target:'http://localhost:5918', // 服务器地址
                    changeOrigin: true, // 是否跨域
                    secure: true, // 允许https请求
                    pathRewrite: {
                      '^/fa': ''
                    }
                  }

          },




    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST//localhost修改为本机ipv4地址后 192.168.1.111:8083可通过手机调试
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */
    productionSourceMap: false,
    //productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}

const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = function (app) {
    app.use("/movie/fetchAllMovieList",
        createProxyMiddleware({
            target: `${'https://portfolio-blog-spring.herokuapp.com'}`,
            changeOrigin: true
        })
    );
};

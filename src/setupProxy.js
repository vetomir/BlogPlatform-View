const {API_URL} = require("./controllers/Config");
const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = function (app) {
    app.use("/movie/fetchAllMovieList",
        createProxyMiddleware({
            target: `${API_URL}`,
            changeOrigin: true
        })
    );
};

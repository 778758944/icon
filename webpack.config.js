var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var IconLoadPlugin = require("./plugin");
const IconHtmlWebpackLoaderPlugin = require("./plugin/icon-html-loader-plugin");

module.exports = {
    mode: "development",
    entry: ["./src/index.tsx"],
    output: {
        filename: "./build/app.js"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.(css|less)$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {loader: "postcss-loader"},
                    {loader: "less-loader"},
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "TestIcon",
            filename: "./index.html",
            template: "./template/index-temp.html"
        }),
        /*
        new IconLoadPlugin(),
        */
        new IconHtmlWebpackLoaderPlugin()
    ],
    resolve: {
        // 引入文件可以省略后缀
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.web.js', '.json'],
    }
}
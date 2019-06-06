const path = require("path");

module.exports = {
    entry: {
        partyVibes: "./src/index.js",
    },
    output: {
        path: path.join(__dirname, "/public/dist"),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [{
                    loader: "babel-loader"
                },
                {
                    loader: "ts-loader"
                }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            modules: true,
                            localIdentName: "[local]"
                        }
                    },
                    {
                        loader: "less-loader"
                    }
                ]
            },
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx']
    },
    externals: {
    }
};
const webpack = require("webpack");

module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "/LolStat_dist/" : "/",
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery",
            }),
        ],
    },
};

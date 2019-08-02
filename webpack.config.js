module.exports = (env, arg) => {
    return {
        entry: './src/app.js',
        output: {
            path: __dirname + '/public',
            filename: 'bundle.js',
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                }

            ]
        },
        // permite la recarga en caliente
        watch: arg.mode === 'production' ? false : true,
        performance: {
            hints: false
        },
        optimization: {
            minimize: false
        }
    }
};
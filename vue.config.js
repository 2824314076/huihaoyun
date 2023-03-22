module.exports = ({
    filenameHashing: true,
    assetsDir: 'assets',
    parallel: false,
    publicPath: process.env.NODE_ENV === "development" ? '/' : './',
    outputDir: 'transportation',
    devServer: {
        port: 8082,
        host: '0.0.0.0',
        proxy: {
            '/': {
                target: 'http://43.142.179.198:8082',
                changeOrigin: true,
                ws: false
            },
        },
    },
})

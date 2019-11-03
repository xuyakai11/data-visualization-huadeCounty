module.exports = {
  // 基本路径
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : './',
  productionSourceMap: false,
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  chainWebpack: config => {
    
  }
}
module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    port: process.env.BACK_PORT || 8081
  }
}

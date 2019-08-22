const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

module.exports = isDev => {
  return [
    new HappyPack({
      id: 'ts-loader',
      threadPool: happyThreadPool,
      use: [
        {
          loader: 'ts-loader',
          options: {
            happyPackMode: true,
          },
        },
      ],
    }),
    new HappyPack({
      id: 'postcss-loader',
      threadPool: happyThreadPool,
      use: [
        isDev && 'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
          },
        },
        'postcss-loader',
      ].filter(Boolean),
    }),
  ]
}

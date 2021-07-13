const path = require('path')

function resolve(dir) {
  return path.resolve(__dirname, '..', dir)
}

const config = {
  projectName: 'meiYuanJun',
  date: '2021-1-26',
  designWidth: 375,
  deviceRatio: {
    320: 2.34 / 4,
    375: 1 / 2,
    414: 1.81 / 4
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  alias: {
    '@': resolve('src'),
    '@assets': resolve('src/assets')
  },
  framework: 'vue',
  sass: {
    resource: [
      // resolve('src/styles/mixin.scss'),
      // resolve('src/styles/variable.scss')
    ]
  },
  copy: {
    patterns: [
      { from: 'src/components/vant/wxs', to: 'dist/components/vant/wxs' },
      {
        from: 'src/components/vant/common/style',
        to: 'dist/components/vant/common/style'
      },
      {
        from: 'src/components/vant/button/index.wxs',
        to: 'dist/components/vant/button/index.wxs'
      },
      {
        from: 'src/components/vant/cell/index.wxs',
        to: 'dist/components/vant/cell/index.wxs'
      },
      {
        from: 'src/components/vant/icon/index.wxs',
        to: 'dist/components/vant/icon/index.wxs'
      },
      {
        from: 'src/components/vant/image/index.wxs',
        to: 'dist/components/vant/image/index.wxs'
      },
      {
        from: 'src/components/vant/loading/index.wxs',
        to: 'dist/components/vant/loading/index.wxs'
      },
      {
        from: 'src/components/vant/cell/index.wxml',
        to: 'dist/components/vant/cell/index.wxml'
      },
      {
        from: 'src/components/vant/search/index.wxml',
        to: 'dist/components/vant/search/index.wxml'
      },
      {
        from: 'src/components/vant/picker/index.wxs',
        to: 'dist/components/vant/picker/index.wxs'
      },
      {
        from: 'src/components/vant/popup/index.wxs',
        to: 'dist/components/vant/popup/index.wxs'
      },
      {
        from: 'src/components/vant/picker-column/index.wxs',
        to: 'dist/components/vant/picker-column/index.wxs'
      },
      {
        from: 'src/components/vant/picker-column/index.wxml',
        to: 'dist/components/vant/picker-column/index.wxml'
      },
      {
        from: 'src/components/vant/field/index.wxs',
        to: 'dist/components/vant/field/index.wxs'
      },
      {
        from: 'src/components/vant/switch/index.wxs',
        to: 'dist/components/vant/switch/index.wxs'
      },
      {
        from: 'src/components/vant/transition/index.wxs',
        to: 'dist/components/vant/transition/index.wxs'
      },
      {
        from: 'src/components/vant/tree-select/index.wxs',
        to: 'dist/components/vant/tree-select/index.wxs'
      },
      {
        from: 'src/components/vant/common/index.wxss',
        to: 'dist/components/vant/common/index.wxss'
      },
      {
        from: 'src/components/vant/dropdown-menu/index.wxs',
        to: 'dist/components/vant/dropdown-menu/index.wxs'
      },
      {
        from: 'src/components/vant/checkbox/index.wxs',
        to: 'dist/components/vant/checkbox/index.wxs'
      },
      {
        from: 'src/components/vant/sticky/index.wxs',
        to: 'dist/components/vant/sticky/index.wxs'
      },
      {
        from: 'src/components/vant/tabs/index.wxs',
        to: 'dist/components/vant/tabs/index.wxs'
      },
      {
        from: 'src/components/vant/calendar/index.wxs',
        to: 'dist/components/vant/calendar/index.wxs'
      },
      {
        from: 'src/components/vant/calendar/utils.wxs',
        to: 'dist/components/vant/calendar/utils.wxs'
      },
      {
        from: 'src/components/vant/calendar/calendar.wxml',
        to: 'dist/components/vant/calendar/calendar.wxml'
      },
      {
        from: 'src/components/vant/calendar/components/month/index.wxs',
        to: 'dist/components/vant/calendar/components/month/index.wxs'
      },
      {
        from: 'src/components/vant/uploader/index.wxs',
        to: 'dist/components/vant/uploader/index.wxs'
      }
    ],
    options: {}
  },
  mini: {
    baseLevel: 8,
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          selectorBlackList: [/van-/]
        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {}
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}

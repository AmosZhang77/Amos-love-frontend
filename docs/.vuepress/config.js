module.exports = {
  // base:'/index2/', // 在作为子网站的时候需要设置，所有路由都回家前缀地址。非子网站不用设置，对build生效，dev不生效
  title: 'amos-love-frontend',
  head: [
    ['link', { rel: 'icon', href: '/img/logo.jpg' }]
  ],
  port: 8076,
  // cache: false,
  // 指定额外的需要被监听的文件。
  // 你可以监听任何想监听的文件，文件变动将会触发 vuepress 重新构建，并实时更新。
  extraWatchFiles: [
    // '.vuepress/config.js', // 使用相对路径
    // '/path/to/bar.js'   // 使用绝对路径
  ],
  themeConfig: {
    // 导航栏 Logo
    logo: '/img/logo.jpg',

    head: [
      ['link', { rel: 'icon', href: '/img/logo.jpg' }]
    ],

    // 导航栏链接
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Notes', link: '/html/' },
      { text: 'Guide', link: '/guide/' },
    ],
    sidebar: [
      {
        title: '给作者一个认可',
        path: '/sponsor/',
        collapsable: false,
        sidebarDepth: 1,
      },
      {
        title: 'HTML',   // 必要的
        path: '/html/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          {
            title: 'HTML1',   // 必要的
            path: '/html/html1/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2   // 可选的, 默认值是 1
          }
        ]
      },
      {
        title: 'CSS',
        path: '/css/',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          {
            title: 'base',
            path: '/css/base/',
            collapsable: true,
            sidebarDepth: 2,
            children: [
              {
                title: 'dimensions',
                path: '/css/base/dimensions/',
                collapsable: true,
                sidebarDepth: 3
              }
            ]
          },
          {
            title: 'font',
            path: '/css/font/',
            collapsable: true,
            sidebarDepth: 2,
            children: [
              {
                title: 'em',
                path: '/css/font/em/',
                collapsable: true,
                sidebarDepth: 3
              }
            ]
          },
          {
            title: 'sass',
            path: '/css/sass/',
            collapsable: true,
            sidebarDepth: 2,
            children: [
              {
                title: 'base',
                path: '/css/sass/base/',
                collapsable: true,
                sidebarDepth: 3
              },
              {
                title: 'other',
                path: '/css/sass/other/',
                collapsable: true,
                sidebarDepth: 3
              }
            ]
          },
          {
            title: 'less',
            path: '/css/less/',
            collapsable: true,
            sidebarDepth: 2,
            children: [
              {
                title: 'other',
                path: '/css/less/other/',
                collapsable: true,
                sidebarDepth: 3
              }
            ]
          },
          {
            title: 'css fn',
            path: '/css/css_fn/',
            collapsable: true,
            sidebarDepth: 2,
          }
        ]
      },
      {
        title: 'JS',
        path: '/js/',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          {
            title: 'js',
            path: '/js/base/',
            collapsable: false,
            sidebarDepth: 2,
            children: [
              {
                title: 'date type',
                path: '/js/base/data_type/',
                collapsable: false,
                sidebarDepth: 3
              },
              {
                title: 'object',
                path: '/js/base/object/',
                collapsable: false,
                sidebarDepth: 3
              },
              {
                title: 'array',
                path: '/js/base/array/',
                collapsable: false,
                sidebarDepth: 3
              },
              {
                title: 'set',
                path: '/js/base/set/',
                collapsable: false,
                sidebarDepth: 3
              },
              {
                title: 'base api',
                path: '/js/base/base_api/',
                collapsable: false,
                sidebarDepth: 3
              },
              {
                title: 'request',
                path: '/js/base/request/',
                collapsable: false,
                sidebarDepth: 3
              },
              {
                title: 'coding',
                path: '/js/base/coding/',
                collapsable: false,
                sidebarDepth: 3
              }
            ]
          },
          {
            title: 'dom',
            path: '/js/dom/',
            collapsable: false,
            sidebarDepth: 2,
            children: [
              {
                title: 'input',
                path: '/js/dom/input/',
                collapsable: false,
                sidebarDepth: 3
              },
              {
                title: 'window',
                path: '/js/dom/window/',
                collapsable: false,
                sidebarDepth: 3
              },
              {
                title: 'video',
                path: '/js/dom/video/',
                collapsable: false,
                sidebarDepth: 3
              }

            ]
          },
          {
            title: 'function collection',
            path: '/js/function_collection/',
            collapsable: false,
            sidebarDepth: 2,
            children: [
              {
                title: 'input',
                path: '/js/function_collection/input/',
                collapsable: false,
                sidebarDepth: 3
              },
              {
                title: 'date',
                path: '/js/function_collection/date/',
                collapsable: false,
                sidebarDepth: 3
              },
            ]
          }
        ]
      },

      {
        title: 'react',
        path: '/react/',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          {
            title: 'base',
            path: '/react/base/',
            collapsable: true,
            sidebarDepth: 2,
            children: [
              {
                title: 'api',
                path: '/react/base/api/',
                collapsable: true,
                sidebarDepth: 3
              },
            ]
          },
          {
            title: 'source code',
            path: '/react/source_code/',
            collapsable: true,
            sidebarDepth: 2,
            children: [
              {
                title: 'base',
                path: '/react/source_code/base/',
                collapsable: true,
                sidebarDepth: 3
              },
              {
                title: 'useful fn',
                path: '/react/source_code/useful_fn/',
                collapsable: true,
                sidebarDepth: 3
              }
            ]
          },
        ]
      },
      {
        title: 'engineering',
        path: '/engineering/',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          {
            title: 'npm',
            path: '/engineering/npm/',
            collapsable: true,
            sidebarDepth: 2
          },
          {
            title: 'webpack',
            path: '/engineering/webpack/',
            collapsable: true,
            sidebarDepth: 2
          }
        ]
      },
      {
        title: 'third party',
        path: '/third_party/',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          {
            title: 'EChart',
            path: '/third_party/echart/',
            collapsable: true,
            sidebarDepth: 2
          },
          {
            title: 'jquery',
            path: '/third_party/jquery/',
            collapsable: true,
            sidebarDepth: 2
          }
        ]
      },
      {
        title: 'MARKDOWN',
        path: '/markdown/',
        collapsable: false,
        sidebarDepth: 1,
      },
      {
        title: 'editor',
        path: '/editor/',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          {
            title: 'webstorm',
            path: '/editor/webstorm/',
            collapsable: true,
            sidebarDepth: 2,
          },
          {
            title: 'vscode',
            path: '/editor/vscode/',
            collapsable: true,
            sidebarDepth: 2,
          },
        ]
      },
      {
        title: 'EN',
        path: '/en/',
        collapsable: false,
        sidebarDepth: 1,
      },
      {
        title: 'Group 2',
        children: [ /* ... */],
        initialOpenGroupIndex: -1
      },
    ],
    lastUpdated: 'Last Updated', // string | boolean
  },
  plugins: {
    '@vuepress/medium-zoom': {},
    '@vuepress/back-to-top': {},
    '@vuepress/nprogress': true, // 默认为true，设置为false可以关闭进度条
    '@vuepress/active-header-links': {
      sidebarLinkSelector: '.sidebar-link',
      headerAnchorSelector: '.header-anchor'
    }
  }
}

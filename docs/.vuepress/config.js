module.exports = {
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
      { text: 'Guide', link: '/guide/' },
      { text: 'Guide', link: '/guide2/' },
    ],
    sidebar: [
      {
        title: 'HTML',   // 必要的
        path: '/html/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          {
            title: 'HTML1',   // 必要的
            path: '/html/html1/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: false, // 可选的, 默认值是 true,
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
            title: 'font',
            path: '/css/font/',
            collapsable: false,
            sidebarDepth: 2,
            children: [
              {
                title: 'em',
                path: '/css/font/em/',
                collapsable: false,
                sidebarDepth: 3
              }
            ]
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
              }
            ]
          }
        ]
      },
      {
        title: 'Group 2',
        children: [ /* ... */],
        initialOpenGroupIndex: -1 // 可选的, 默认值是 0
      }
    ],
    lastUpdated: 'Last Updated', // string | boolean
  },
  plugins: {
    '@vuepress/medium-zoom': {},
    '@vuepress/back-to-top': {},
    '@vuepress/active-header-links': {
      sidebarLinkSelector: '.sidebar-link',
      headerAnchorSelector: '.header-anchor'
    }
  }
}
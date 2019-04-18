module.exports = {
  title: '组件文档', // 设置网站标题
  base: '/dataCom/',
  description: '公司组件文档', //描述
  dest: './dist',   // 设置输出目录
  port: 9527, //端口
  themeConfig: { //主题配置
    // 添加导航栏
    nav: [
      { text: '主页', link: '/' }, // 导航条
      { text: '组件文档', link: '/baseComponents/base/test1' },
      { text: '知识库', link: '/knowledge/' },
      {
        text: 'github',
        // 这里是下拉列表展现形式。
        items: [
          { text: 'focus-outside', link: 'https://github.com/TaoXuSheng/focus-outside' },
          { text: 'stylus-converter', link: 'https://github.com/TaoXuSheng/stylus-converter' },
        ]
      }
    ],
    // 为以下路由添加侧边栏
    sidebar:{
      '/baseComponents/': [
        {
          title: '基础组件',
          collapsable: true,
          children: [
            'base/test1',
            'base/test2',
            'base/test3',
            'base/test4',
          ]
        },
        {
          title: '业务控件',
          collapsable: true,
          children: [
          ]
        },
        {
          title: '业务系统',
          collapsable: true,
          children: [
          ]
        }
      ],
      '/knowledge/': [
        {
          title: 'CSS知识库',
          collapsable: false,
          children: [
          ]
        },
        {
          title: 'JS知识库',
          collapsable: false,
          children: [
          ]
        },
        {
          title: 'node知识库',
          collapsable: false,
          children: [
          ]
        },
        {
          title: 'vue知识库',
          collapsable: false,
          children: [
          ]
        }
      ]
    }
  }
}
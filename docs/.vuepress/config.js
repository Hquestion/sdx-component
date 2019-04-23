module.exports = {
    title: '组件文档', // 设置网站标题
    base: '/',
    description: 'SDX组件库文档', //描述
    dest: './dist',   // 设置输出目录
    port: 3200, //端口
    themeConfig: { //主题配置
        // 添加导航栏
        nav: [
            {text: '主页', link: '/'}, // 导航条
            {text: '组件文档', link: '/baseComponents/base/test1'}
        ],
        // 为以下路由添加侧边栏
        sidebar: {
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
                    children: []
                },
                {
                    title: '业务系统',
                    collapsable: true,
                    children: []
                },
                {
                    title: '工具集',
                    collapsable: true,
                    children: [
                        'utils/error-handler'
                    ]
                }
            ]

        }
    }
};

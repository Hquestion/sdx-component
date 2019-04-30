const path = require('path');

module.exports = {
    title: 'SDX Component', // 设置网站标题
    base: '/',
    description: 'SDX组件库文档', //描述
    dest: './dist',   // 设置输出目录
    port: 3200, //端口
    themeConfig: { //主题配置
        // 添加导航栏
        nav: [
            {text: '主页', link: '/'}, // 导航条
            {text: '组件文档', link: '/baseComponents/ui/button'}
        ],
        // 为以下路由添加侧边栏
        sidebar: {
            '/baseComponents/': [
                {
                    title: '基础组件',
                    collapsable: true,
                    children: [
                        'ui/button',
                        'ui/dialog',
                        'ui/tab-radio'
                    ]
                },
                {
                    title: '业务控件',
                    collapsable: true,
                    children: [
                        'widget/breadcrumb'
                    ]
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
                        'utils/error-handler',
                        'utils/http-service',
                        'utils/国际化'
                    ]
                }
            ]

        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@sdx': path.resolve(__dirname, '../../packages')
            }
        }
    }
};

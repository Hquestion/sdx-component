const webpack = require('webpack') ;
const path = require('path');

console.log(process.env.NODE_ENV);

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
                        'ui/pagination',
                        'ui/table',
                        'ui/tab-radio',
                        'ui/input',
                        'ui/messagebox',
                        'ui/transfer',
                        'ui/content-panel',
                        'ui/iconbutton',
                        'ui/iconbutton-group',
                        'ui/empty',
                        'ui/placeholder',
                        'ui/user-avatar',
                        'ui/layout',
                        'ui/scroll',
                        'ui/lazyList',
                        'ui/radial-progress'
                    ]
                },
                {
                    title: '业务控件',
                    collapsable: true,
                    children: [
                        'widget/breadcrumb',
                        'widget/projectcard',
                        'widget/userInfoDialog',
                        'widget/changePassword',
                        'widget/fold-label',
                        'widget/user-picker',
                        'widget/search-layout',
                        'widget/fileselect',
                        'widget/select-group-user',
                        'widget/share-setting',
                        'widget/log-detail'
                    ]
                },
                {
                    title: '业务系统',
                    collapsable: true,
                    children: [
                        'view/rolemanage',
                        'view/authorizemanage',
                        'view/usermanage',
                        'view/resource-manage',
                        'view/privilege',
                        'view/project-management',
                        'view/image-management'
                    ]
                },
                {
                    title: '工具集',
                    collapsable: true,
                    children: [
                        'utils/api',
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
        },
        devServer: {
            proxy: {
                '/api': {
                    target: 'https://easy-mock.com',
                    ws: true,
                    changeOrigin: true,
                    pathRewrite: {
                        '/mock': '/mock/5cd04685adb0973be6a3d969/api/'
                    }
                }
            }
        },
        plugins: [
            new webpack.IgnorePlugin({
                resourceRegExp: /\/iconfont\/iconfont.js/,
                contextRegExp: /^@sdx/
            })
        ]
    },
    chainWebpack: config => {
        config.module
            .rule('js')
            .exclude
            .add(
                path.resolve(__dirname, '../../packages/utils/src/theme-common/iconfont/iconfont.js')
            )
            .add(/node_modules/)
            .end()
    }
};

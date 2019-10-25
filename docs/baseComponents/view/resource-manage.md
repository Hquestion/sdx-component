# 资源管理
---

资源管理组件，包括资源模板管理/全局资源配置管理/用户特权资源配置管理

## Examples

![resourceManage](/view/resourcemanage.png)


## Usage

```js
import ResourceManage from '@sdx/view/lib/resource-manage';

ResourceManage.viewRouter.register(router, '/home');
```

::: warning 注意

当前官方的Vue-router库不支持将路由添加到父路由下面，上面的应用中如果想要再父路由下挂载
此组件，需引用修改过的vue-router替换官方Vue-router， 目前已在SDX-UI项目中集成。

:::


## API


```js

import ResourceManage from './src/Home';

// 路由配置，与Vue-router配置方式一致
const routeCfg = [
    {
        path: '/sdxv-resource-manage',
        name: 'SdxvResourceManage',
        component: ResourceManage,
        meta: {
            breadcrumb: '资源管理', // 面包屑名称
            system: 'manage' // 属于管理系统
        }
    }
];

// 路由注册方法
const register = (router, parentPath) => {
    return router.addRoutes(viewRouter.routes, parentPath);
};

// 路由配置和路由注册函数
const viewRouter = {
    routes: routeCfg,
    register
};

// 最终会暴露ResourceManage组件，应用中可以引用该组件自定义嵌入到页面中，
// 也可以使用viewRouter直接将应用挂载到当前应用路由上
export default { ResourceManage, viewRouter };

```
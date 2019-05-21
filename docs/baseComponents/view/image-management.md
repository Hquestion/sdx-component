# 镜像管理
---

镜像管理组件

## Examples

<Common-BasicUsage>
  <view-image-management-index />
</Common-BasicUsage>


## Usage

```js
import ImageManagement from '@sdx/view/lib/image-management';

ImageManagement.viewRouter.register(router, '/');
```


## API


```js

import ImageManagement from './src/Index';

ImageManagement.install = vue => {
    vue.component(ImageManagement.name, ImageManagement);
};

// 路由配置
const routeCfg = [
    {
        path: 'sdxv-image-manage',
        name: 'SdxvImageManagement',
        component: ImageManagement,
        redirect: '/sdxv-image-manage/imageList',
        meta: {
            breadcrumb: '镜像管理'
        },
        children: [
            {
                path: 'imageList',
                name:'imageList',
                component: ImageManagementList,
            },
            {
                path: 'filebuild',
                name:'filebuild',
                component:  ImageFileBuild,
                meta: {
                    breadcrumb: '基于文件构建',
                }
            },
            {
                path: 'basicbuild',
                name:'basicbuild',
                component:  ImageBasicBuild,
                meta: {
                    breadcrumb: '基于此构建',
                }
            }]
    }
];

// 注册到应用路由的方法
const register = (router, parentPath) => {
    return router.addRoutes(routeCfg, parentPath);
};

const viewRouter = {
    routes: routeCfg,
    register
};

// 把组件及路由注册方法暴露，暴露路由配置的目的是为了给外部应用修改配置
export default { ImageManagement, viewRouter };

```
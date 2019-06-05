# 模型管理
---

模型管理组件

## Examples

<Common-BasicUsage>
  <view-model-manage-index />
</Common-BasicUsage>


## Usage

```js
import ModelManage from '@sdx/view/lib/model-manage';

ModelManage.viewRouter.register(router, '/');
```


## API


```js

import ModelManage from './src/Index';

ModelManage.install = vue => {
    vue.component(ModelManage.name, ModelManage);
};

// 路由配置
const routeCfg = [
    {
        path: 'model-manage',
        name: 'ModelManage',
        component: ModelManage,
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
export default { ModelManage, viewRouter };

```
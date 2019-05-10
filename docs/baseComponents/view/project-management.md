# 项目管理
---

项目管理组件

## Examples

<Common-BasicUsage>
  <view-project-management-index />
</Common-BasicUsage>


## Usage

```js
import ProjectManagement from '@sdx/view/components/project-management';

ProjectManagement.viewRouter.register(router, '/');
```


## API


```js

import ProjectManagement from './src/Index';

ProjectManagement.install = vue => {
    vue.component(ProjectManagement.name, ProjectManagement);
};

// 路由配置
const routeCfg = [
    {
        path: 'project-management',
        name: 'ProjectManagement',
        component: ProjectManagement,
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
export default { ProjectManagement, viewRouter };

```
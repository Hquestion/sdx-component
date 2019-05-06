# API 请求接口列表
---

所有与后端API的交互皆通过此utils实现

## Usage

<br>

```js

import {userApi, projectApi} from '@sdx/utils/src/api/index';

// 根据不同模块的不同功能调用方法, 实现与后端API交互
// 具体每个模块所支持的方法见下表
userApi.changePassword(params).then(res => {
    console.log('res', res);
})

projectApi.getProjectList(params).then(res => {
    console.log('res', res);
})


```

::: tip mock请求转发

所有后端API均以'/api/v1/'开头, 配置mock转发时可据此进行配置

:::

## 功能模块与methods

<utils-api-index />
# UserInfoDialog 用户信息
---
用户信息查看详情，支持传入用户信息（直接渲染）展示用户信息页面

## Example

<Common-BasicUsage>
<widget-userInfoDialog-index></widget-userInfoDialog-index>
  <highlight-code slot="codeText" lang="vue">
        <template>
            <sdxw-userInfoDialog 
                :visible.sync="dialogVisible"
                :userInfoData="userInfoData"
            />
        </template>
  </highlight-code>
</Common-BasicUsage>

::: tip 
dialog弹框引用的是基础业务组件中的dialog对话框
:::

## Usage

<br>

```js

// 按需加载的方式引入
import Vue from 'vue';
import { UserInfoDialog } from '@sdx/widget';

Vue.use(UserInfoDialog);

// 也可以全量引入使用
import UserInfoDialog from '@sdx/UserInfoDialog';

Vue.use(UserInfoDialog);
```

同时，还需引入scss文件:

```scss

// 全量加载直接引用index.scss文件即可
@import '~@sdx/ui/lib/theme/index.scss';

// 按需加载时，需要引用两个文件：
@import '~@sdx/ui/lib/theme/base.scss';
@import '~@sdx/ui/lib/theme/userInfoDialog.scss';

```
<br>



## API

<widget-userInfoDialog-api slot="api" />
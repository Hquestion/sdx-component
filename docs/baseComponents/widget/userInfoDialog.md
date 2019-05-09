# UserInfoDialog 用户信息
---
用户信息查看详情，支持传入用户信息（直接渲染）或通过传入用户id（调接口获取数据）展示用户信息页面；分为两种主题，一种是用户管理里面的查看用户详情，另一种是dashboard中用户信息的查看。

## Example


#### 直接渲染代码如下：
<Common-BasicUsage>
  <highlight-code slot="codeText" lang="vue">
        <template>
            <sdxw-userInfoDialog 
                :visible.sync="dialogVisible"
                :userInfoData="userInfoData"
                :theme="theme"
            />
        </template>
  </highlight-code>
  </Common-BasicUsage>


 

<!-- <widget-userInfoDialog-userManageInfo></widget-userInfoDialog-userManageInfo> -->
#### 传入ID代码如下：
<Common-BasicUsage>
  <highlight-code slot="codeText" lang="vue">
        <template>
            <sdxw-userInfoDialog 
                :visible.sync="dialogVisible"
                :theme="theme"
                :id="id"
            />
        </template>
  </highlight-code>
  </Common-BasicUsage>
  


::: tip 
dialog弹框引用的是基础业务组件中的dialog对话框,两种主题的theme值分别为"dashboard"和"user",dashboard主题中显示名鼠标滑过显示input框可进行信息的修改。
:::

## Usage

<br>

```js

// 按需加载的方式引入
import Vue from 'vue';
import { UserInfoDialog } from '@sdx/widget';

Vue.use(UserInfoDialog);

// 也可以全量引入使用
import UserInfoDialog from '@sdx/widget';

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
# UserPicker 输入联想用户/角色/用户组

根据输入的内容，自动联想用户/用户组/角色，并列表展示供用户选择

## Examples

<Common-BasicUsage>
<widget-userpicker-index></widget-userpicker-index>
  <highlight-code slot="codeText" lang="vue">
    <template>
      <UserPicker v-model="data"></UserPicker>
    </template>
  </highlight-code>
  </Common-BasicUsage>
  
::: warning 注意

因为封装的http-service的原因，文档里没有对请求做代理转发，故这边的接口请求会404。可以到example里查看效果
:::

## Usage

```js
import Vue from 'vue';
import { UserPicker } from '@sdx/widget';

Vue.use(UserPicker);

// 也可以全量引入使用
import SdxWidget from '@sdx/widget';

Vue.use(SdxWidget);

```

同时，还需引入scss文件:

```scss

// 全量加载直接引用index.scss文件即可
@import '~@sdx/widget/lib/theme/index.scss';

// 按需加载时，需要引用两个文件：
@import '~@sdx/widget/lib/theme/base.scss';
@import '~@sdx/widget/lib/theme/user-picker.scss';

```

## API

<widget-userpicker-api></widget-userpicker-api>
# ChangePassword 修改密码
---
修改密码组件, 提供密码必填验证, 格式验证, 以及提供默认修改接口或者也可由用户自定义保存接口。

## Example

<Common-BasicUsage>
<widget-change-password-index></widget-change-password-index>
  <highlight-code slot="codeText" lang="vue">
    <sdxw-change-password
        :visible.sync="dialogVisible"
        @on-success="successHandler"
        @on-error="errorHandler"
        @close="closeHandler"
    />
  </highlight-code>
  </Common-BasicUsage>

## Usage

```js
import Vue from 'vue';
import { ChangePassword } from '@sdx/widget';

Vue.use(ChangePassword);

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
@import '~@sdx/widget/lib/theme/changePassword.scss';

```


## API

 <widget-change-password-api />
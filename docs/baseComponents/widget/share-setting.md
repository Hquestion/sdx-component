# ShareSetting 共享设置
---
共享设置组件

## Example

<Common-BasicUsage>
<widget-share-setting-index></widget-share-setting-index>
  <highlight-code slot="codeText" lang="vue">
    <sdxw-share-setting
        :visible.sync="dialogVisible"
        :default-users="shareForm.users"
        :default-groups="shareForm.groups"
        :share-type="shareForm.shareType"
        @confirm-edit="confirmEdit"
    />
  </highlight-code>
  </Common-BasicUsage>

## Usage

```js
import Vue from 'vue';
import { ShareSetting } from '@sdx/widget';

Vue.use(ShareSetting);

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
@import '~@sdx/widget/lib/theme/share-setting.scss';

```


## API

 <widget-share-setting-api />
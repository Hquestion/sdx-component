# Transfer 穿梭框
---

基础transfer组件

## Examples

<Common-BasicUsage>
  <ui-transfer-transfer></ui-transfer-transfer>
  <highlight-code slot="codeText" lang="vue">
    <template>
      <div class="demo-table">
        <SdxuTransfer
            :data="data"
            :tags.sync="tags"
            :default-keys.sync="defaultKeys"
        />
      </div>
    </template>
  </highlight-code>
</Common-BasicUsage>

## Usage

```js

// 按需加载的方式引入
import Vue from 'vue';
import {Transfer} from '@sdx/ui';

Vue.use(Transfer);

// 也可以全量引入使用
import SdxUI from '@sdx/ui';

Vue.use(SdxUI);
```

同时，还需引入scss文件:

```scss

// 全量加载直接引用index.scss文件即可
@import '~@sdx/ui/lib/theme/index.scss';

// 按需加载时，需要引用两个文件：
@import '~@sdx/ui/lib/theme/base.scss';
@import '~@sdx/ui/lib/theme/transfer.scss';

```

## API

<ui-transfer-api slot="api" />

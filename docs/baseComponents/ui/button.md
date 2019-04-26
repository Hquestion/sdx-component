# Button 按钮
---

基础按钮组件

## Examples

<Common-BasicUsage>
  <ui-button-button></ui-button-button>
  <highlight-code slot="codeText" lang="vue">
    <template>
      <div class="demo-button">
        <SdxuButton type="default">默认</SdxuButton>
        <SdxuButton type="primary">primary</SdxuButton>
        <SdxuButton type="primary" size="small">small</SdxuButton>
        <SdxuButton type="primary" size="regular" :invert="true">invert</SdxuButton>
        <SdxuButton type="primary" size="regular" :loading="true">loading</SdxuButton>
        <SdxuButton type="primary" size="regular" :plain="true">文字按钮</SdxuButton>
        <SdxuButton type="primary" size="regular" :disabled="true">禁用</SdxuButton>
        <SdxuButton type="default" size="regular" :shadow="true">投影</SdxuButton>
        <SdxuButton type="primary" size="regular" :block="true">block</SdxuButton>
      </div>
    </template>
  </highlight-code>
</Common-BasicUsage>

## Usage

```js

// 按需加载的方式引入
import Vue from 'vue';
import {Button} from '@sdx/ui';

Vue.use(Button);

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
@import '~@sdx/ui/lib/theme/button.scss';

```

## API

<ui-button-api slot="api" />

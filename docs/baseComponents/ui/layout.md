# Layout 简单的布局组件

目前仅支持水平布局（左中右）和垂直布局（上中下），后面如有其他需求再做调整

## Examples

<Common-BasicUsage>
  <ui-layout-index></ui-layout-index>
  <highlight-code slot="codeText" lang="vue">
    <template>
      <SdxuLayout>
                  <SdxuButton>按钮一</SdxuButton>
                  <SdxuButton>按钮二</SdxuButton>
              </SdxuLayout>
              <SdxuLayout align="left">
                  <SdxuButton>按钮一</SdxuButton>
                  <SdxuButton>按钮二</SdxuButton>
              </SdxuLayout>
              <SdxuLayout align="right">
                  <SdxuButton>按钮一</SdxuButton>
                  <SdxuButton>按钮二</SdxuButton>
              </SdxuLayout>
              <SdxuLayout align="right" valign="top" style="height: 60px;background: #dedede">
                  <SdxuButton>按钮一</SdxuButton>
                  <SdxuButton>按钮二</SdxuButton>
              </SdxuLayout>
              <SdxuLayout align="right" valign="bottom" style="height: 60px;background: #dedede">
                  <SdxuButton>按钮一</SdxuButton>
                  <SdxuButton>按钮二</SdxuButton>
              </SdxuLayout>
    </template>
  </highlight-code>
</Common-BasicUsage>

## Usage

```js

// 按需加载的方式引入
import Vue from 'vue';
import {Layout} from '@sdx/ui';

Vue.use(Layout);

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
@import '~@sdx/ui/lib/theme/layout.scss';

```

## API

<ui-layout-api></ui-layout-api>

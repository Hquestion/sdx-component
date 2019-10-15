# PlaceholderBlock 空白占位块

以此组件替换margin-top等

## Examples

<Common-BasicUsage>
  <ui-placeholder-index></ui-placeholder-index>
  <highlight-code slot="codeText" lang="vue">
    <template>
      <SdxuPlaceholderBlock></SdxuPlaceholderBlock>
              <SdxuPlaceholderBlock size="small" color="#f00"></SdxuPlaceholderBlock>
              <SdxuPlaceholderBlock size="large" color="#0f0"></SdxuPlaceholderBlock>
    </template>
  </highlight-code>
</Common-BasicUsage>

## Usage

```js

// 按需加载的方式引入
import Vue from 'vue';
import {PlaceholderBlock} from '@sdx/ui';

Vue.use(PlaceholderBlock);

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
@import '~@sdx/ui/lib/theme/placeholder-block.scss';

```

## SCSS定制

无，根据默认主题

## API

<ui-placeholder-api></ui-placeholder-api>

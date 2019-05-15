# Empty 空内容占位

当内容为空时，可用此组件作为默认的替换组件。

## Examples

<Common-BasicUsage>
  <ui-empty-index></ui-empty-index>
  <highlight-code slot="codeText" lang="vue">
    <template>
      <SdxuEmpty></SdxuEmpty>
              <SdxuEmpty>自定义的什么内容都没有</SdxuEmpty>
    </template>
  </highlight-code>
</Common-BasicUsage>

## Usage

```js

// 按需加载的方式引入
import Vue from 'vue';
import {Empty} from '@sdx/ui';

Vue.use(Empty);

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
@import '~@sdx/ui/lib/theme/empty.scss';

```

## SCSS定制

无，根据默认主题

## API

<ui-empty-api></ui-empty-api>

# LazyList 动态渲染的懒加载列表

动态渲染的懒加载列表

## Examples

<Common-BasicUsage>

  <ui-lazylist-index></ui-lazylist-index>

</Common-BasicUsage>

## Usage

```js

// 按需加载的方式引入
import Vue from 'vue';
import {LazyList} from '@sdx/ui';

Vue.use(LazyList);

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
@import '~@sdx/ui/lib/theme/lazy-list.scss';

```

## API
   
   <ui-lazylist-api></ui-lazylist-api>

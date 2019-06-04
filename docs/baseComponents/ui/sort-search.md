# SortSearch 排序搜索
---

基础sortSearch组件

## Examples

<Common-BasicUsage>
  <ui-sort-search-sortSearch></ui-sort-search-sortSearch>
  <highlight-code slot="codeText" lang="vue">
    <template>
        <div class="sdxui-sort-search">
            <SdxuSortSearch
                title="按创建时间排序"
                @sortChange="sortChange"
                :order="order"
            />
        </div>
    </template>
  </highlight-code>
</Common-BasicUsage>

## Usage

```js

// 按需加载的方式引入
import Vue from 'vue';
import {SortSearch} from '@sdx/ui';

Vue.use(SortSearch);

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
@import '~@sdx/ui/lib/theme/sort-search.scss';

```


## SCSS定制

可以通过变量修改默认的scss样式。

```scss

// sort-search
$sdx-sort-icon-width: 10px !default;
$sdx-sort-icon-color-normal: #C8CFD9 !default;
$sdx-sort-icon-color-active: #457FF6 !default;

```

## API

<ui-sort-search-api slot="api" />

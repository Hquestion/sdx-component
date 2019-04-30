# Pagination 分页
---
当数据量过多时，使用分页分解数据。

## Example

<Common-BasicUsage>
<ui-pagination-general></ui-pagination-general>
  <highlight-code slot="codeText" lang="vue">
        <template>
            <sdxu-pagination
                :current-page.sync="current"
                :page-size="pageSize"
                :total="total"
                @current-change="currentChange"
            />
        </template>
  </highlight-code>
</Common-BasicUsage>

::: tip 
虽然该组件是对Element pagination组件的二次封装, 并不是所有原组件的属性和方法在这里都支持。
具体属性参考下方列表。
:::

## Usage

<br>

```js

// 按需加载的方式引入
import Vue from 'vue';
import { Pagination } from '@sdx/ui';

Vue.use(Pagination);

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
@import '~@sdx/ui/lib/theme/pagination.scss';

```
<br>
## SCSS定制

可以通过变量修改默认的scss样式。

```scss

// 当前激活pager背景色
$sdxu-pagination-active-background-color: #4781F8 !default;
// pager字体颜色
$sdxu-pagination-text-color: #4781F8 !default;
// 非激活pager背景
$sdxu-pagination-background: rgba(88,147,240,0.10) !default;
// pager之间间距
$sdxu-pagination-pager-space: 3px !default;
```

## API

<ui-pagination-api slot="api" />
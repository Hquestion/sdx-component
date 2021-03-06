# Breadcrumb 面包屑
---
显示当前页面的路径，快速返回之前的任意页面。该组件仅能显示依赖于页面路由配置的面包屑, 并不支持记录操作路径并且返回之前操作。

## Example

<Common-BasicUsage>
<widget-breadcrumb-index></widget-breadcrumb-index>
  <highlight-code slot="codeText" lang="vue">
    <template>
      <sdxw-breadcrumb></sdxw-breadcrumb>
    </template>
  </highlight-code>
  </Common-BasicUsage>

## Usage

```js
import Vue from 'vue';
import { Breadcrumb } from '@sdx/widget';

Vue.use(Breadcrumb);

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
@import '~@sdx/widget/lib/theme/breadcrumb.scss';

```

::: tip 

<br>

引入后使用前提条件:
1. 配置路由时, 如果该路由需要显示面包屑, 那么需要在该路由添加meta.breadcrumb属性
   例如:
   ```js
       {
           path: 'index',
           component: Products,
           name: '活动管理',
           meta: {
               breadcrumb: '活动管理'
           }
       }
   ```
   
2. 进行路由页面跳转时必须使用name跳转, 否则可能造成返回上级时参数丢失
   例如:
   
   ```js
        this.$router.push({
            name: '活动列表'
        });
    ```

3. 路由跳转传参时必须使用params, 而不能使用query传参
   例如:
   
   ```js
    this.$router.push({
                name: '活动列表',
                params: {
                    id: 'xxxxx'
                }
            });
    ```
        
:::

## SCSS定制

可以通过变量修改默认的scss样式。

```scss

// 面包屑可跳转层级字体颜色
$sdxw-breadcrumb-previous-text-color: $sdx-primary-color !default;
// 当前层级字体颜色
$sdxw-breadcrumb-current-text-color: #00002A !default;
// 分隔符颜色
$sdxw-breadcrumb-seperator-color: $sdx-primary-color !default;
// 分隔符margin
$sdxw-breadcrumb-seperator-margin: 4px !default;
```

## API

 <widget-breadcrumb-api slot="api" />
# SearchLayout 可折叠搜索组件

使用场景：搜索条件很多时可折叠

## Examples

<Common-BasicUsage>
<widget-search-layout-index></widget-search-layout-index>
  <highlight-code slot="codeText" lang="vue">
    <template>
      <sdxw-search-layout
            @search="search"
            @reset="reset"
        >
            <sdxw-search-item lable="镜像名称:">
                <Input
                    type="search"
                    :searchable="true"
                    size="small"
                />
            </sdxw-search-item>
            <sdxw-search-item lable="镜像名称:">
                <Input
                    type="search"
                    :searchable="true"
                    size="small"
                />
            </sdxw-search-item>
            <sdxw-search-item lable="镜像名称:">
                <Input
                    type="search"
                    :searchable="true"
                    size="small"
                />
            </sdxw-search-item>
            <sdxw-search-item lable="镜像名称:">
                <Input
                    type="search"
                    :searchable="true"
                    size="small"
                />
            </sdxw-search-item>
        </sdxw-search-layout>
    </template>
  </highlight-code>
  </Common-BasicUsage>
  
## Usage

```js
import Vue from 'vue';
import { SearchLayout } from '@sdx/widget';

Vue.use(SearchLayout);

// 也可以全量引入使用
import SdxWidget from '@sdx/widget';

Vue.use(SdxWidget);

// 如果在组件中以components选项注册组件
import { SearchLayout } from '@sdx/widget';

{
    components: {
       [SearchLayout.SearchLayout.name]: SearchLayout.SearchLayout,
       [SearchLayout.SearchItem.name]: SearchLayout.SearchItem,
    }
}
```

同时，还需引入scss文件:

```scss

// 全量加载直接引用index.scss文件即可
@import '~@sdx/widget/lib/theme/index.scss';

// 按需加载时，需要引用两个文件：
@import '~@sdx/widget/lib/theme/base.scss';
@import '~@sdx/widget/lib/theme/search-layout.scss';

```

::: warning 注意：

SearchLayout组件由两部分组成：SearchLayout和SearchItem;

:::

## SCSS定制

```scss
$sdxw-search-background: rgba(245,245,245,1) !default;
$sdxw-search-padding-right: 100px !default;
```

## API

<widget-search-layout-api />



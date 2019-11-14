# Appender 追加器
---

适用于在主内容前/后追加其他内容，如按钮，图标等，常用于表单

## Examples

<Common-BasicUsage>
  <ui-appender-index></ui-appender-index>
  <highlight-code slot="codeText" lang="vue">
    <template>
      <div>
         <p>
                 <SdxuAppender style="width: 500px;">
                     <SdxuInput v-model="val" style="flex:1"></SdxuInput>
                     <SdxuButton type="default" slot="postfix">创建项目</SdxuButton>
                 </SdxuAppender>
             </p>
             <p>
                 <SdxuAppender postfix="sdx-tiaofutishi" style="width: 500px">
                     <SdxuInput v-model="val" style="flex:1"></SdxuInput>
                 </SdxuAppender>
             </p>
             <p>
                 <SdxuAppender prefix="sdx-tiaofutishi" style="width: 500px;">
                     <SdxuInput v-model="val" style="flex: 1"></SdxuInput>
                 </SdxuAppender>
             </p>
      </div>
    </template>
  </highlight-code>
</Common-BasicUsage>

## Usage

```js

// 按需加载的方式引入
import Vue from 'vue';
import {Appender} from '@sdx/ui';

Vue.use(Appender);

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
@import '~@sdx/ui/lib/theme/appender.scss';

```

## SCSS定制

可以通过变量修改默认的scss样式。

```scss
// 暂无

```

## API

<ui-appender-api slot="api" />

# UserAvatar 用户头像/显示名展示组件

用户头像/显示名展示组件，暂不支持修改头像

## Examples

<Common-BasicUsage>
  <ui-useravatar-index></ui-useravatar-index>
  <highlight-code slot="codeText" lang="vue">
    <template>
      <SdxuUserAvatar name="张三"></SdxuUserAvatar>
    </template>
  </highlight-code>
</Common-BasicUsage>

## Usage

```js

// 按需加载的方式引入
import Vue from 'vue';
import {UserAvatar} from '@sdx/ui';

Vue.use(UserAvatar);

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
@import '~@sdx/ui/lib/theme/user-avatar.scss';

```

## SCSS定制

无，根据默认主题

## API

<ui-useravatar-api></ui-useravatar-api>

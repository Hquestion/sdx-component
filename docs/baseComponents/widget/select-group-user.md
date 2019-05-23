# SelectGroupUser 选择用户和用户组

使用场景：利用Transfer选择用户和用户组

## Examples

<Common-BasicUsage>
<widget-select-group-user-index></widget-select-group-user-index>
  <highlight-code slot="codeText" lang="vue">
    <template>
      <sdxw-select-group-user
            :users.sync="selectedUsers"
            :groups.sync="selectedGroups"
        />
    </template>
  </highlight-code>
</Common-BasicUsage>

<Common-BasicUsage>
<widget-select-group-user-select-user></widget-select-group-user-select-user>
  <highlight-code slot="codeText" lang="vue">
    <template>
      <sdxw-select-group-user
            :users.sync="selectedUsers"
            :groups.sync="selectedGroups"
            mode="user"
        />
    </template>
  </highlight-code>
</Common-BasicUsage>

<Common-BasicUsage>
<widget-select-group-user-select-group></widget-select-group-user-select-group>
  <highlight-code slot="codeText" lang="vue">
    <template>
      <sdxw-select-group-user
            :users.sync="selectedUsers"
            :groups.sync="selectedGroups"
            mode="group"
        />
    </template>
  </highlight-code>
</Common-BasicUsage>
  
## Usage

```js
import Vue from 'vue';
import { SelectGroupUser } from '@sdx/widget';

Vue.use(SelectGroupUser);

// 也可以全量引入使用
import SdxWidget from '@sdx/widget';

Vue.use(SdxWidget);

// 如果在组件中以components选项注册组件
import { SelectGroupUser } from '@sdx/widget';

{
    components: {
        [SelectGroupUser.name]: SelectGroupUser
    }
}
```

同时，还需引入scss文件:

```scss

// 全量加载直接引用index.scss文件即可
@import '~@sdx/widget/lib/theme/index.scss';

// 按需加载时，需要引用两个文件：
@import '~@sdx/widget/lib/theme/base.scss';
@import '~@sdx/widget/lib/theme/select-group-user.scss';

```

## API

<widget-select-group-user-api />

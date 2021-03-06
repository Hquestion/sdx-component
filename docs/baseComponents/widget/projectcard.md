# ProjectCard 项目卡片
---
项目卡片组件 / 项目卡片组件列表

## Example

<Common-BasicUsage>
<widget-projectcard-index></widget-projectcard-index>
  <highlight-code slot="codeText" lang="vue">
    <template>
        <div class="sdx-projectcard">
            <SdxwProjectCardList>
                <SdxwProjectCard @operate="handleOperate"  v-for="(meta, i) in list" :key="i" :meta="meta" :operateType="i === 3 ? 'project' : i === 4 ? 'template' : 'rud'"></SdxwProjectCard>
            </SdxwProjectCardList>
        </div>
    </template>

    <script>
    import SdxwProjectCard from '@sdx/widget/components/projectcard/src/ProjectCard';
    import SdxwProjectCardList from '@sdx/widget/components/projectcard/src/ProjectCardList';
    export default {
        name: 'ProjectCardDemo',
        data() {
            return {
                list: [{
                    uuid: 1,
                    name: '我是标题',
                    owner: '张三',
                    createdAt: '2019-01-02 12:12:12',
                    isTemplate: false,
                    users: [],
                    groups: [],
                    description: '我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情'
                }, {
                    uuid: 2,
                    name: '我是标题我是标题我是标题我是标题我是标题我是标题',
                    owner: '张三',
                    createdAt: '2019-01-02 12:12:12',
                    isTemplate: true,
                    users: [],
                    groups: [],
                    description: '我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情'
                }, {
                    uuid: 3,
                    name: '我是标题我是标题我是详情我是详情我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题',
                    owner: '张三',
                    createdAt: '2019-01-02 12:12:12',
                    isTemplate: false,
                    users: ['dfdf'],
                    groups: [],
                    description: '我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情'
                }, {
                    uuid: 4,
                    name: '我是标题',
                    owner: '张三',
                    createdAt: '2019-01-02 12:12:12',
                    isTemplate: false,
                    users: ['dfdf'],
                    groups: [],
                    description: '我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情'
                }, {
                    uuid: 5,
                    name: '我是标题',
                    owner: '张三',
                    createdAt: '2019-01-02 12:12:12',
                    isTemplate: false,
                    users: ['dfdf'],
                    groups: [],
                    description: '我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情'
                }]
            };
        },
        components: {
            SdxwProjectCard,
            SdxwProjectCardList
        },
        methods: {
            handleOperate(data) {
                console.error(data);
            }
        }
    }
    </script>

    <style lang="scss">
        .sdx-projectcard {
            background: #f7f7f7;
        }
    </style>

  </highlight-code>
</Common-BasicUsage>

## Usage

```js
import Vue from 'vue';
import { ProjectCard } from '@sdx/widget';

Vue.use(ProjectCard);

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
@import '~@sdx/widget/lib/theme/projectcard.scss';

```

## SCSS定制

可以通过变量修改默认的scss样式。

```scss
// 卡片宽度
$sdxw-project-card-width: 280px !default;
// 卡片高度
$sdxw-project-card-height: 184px !default;
// 卡片阴影
$sdxw-project-card-box-shadow: 0 0 22px 0 rgba(206,213,221,0.27) !default;
// 卡片背景
$sdxw-project-card-background: #FFF !default;
// 模板卡片图标颜色
$sdxw-project-card-template-color: $sdx-success-color !default;
// 协作卡片图标颜色
$sdxw-project-card-cooperation-color: $sdx-warning-color !default;
// 自建卡片图标颜色
$sdxw-project-card-self-color: $sdx-primary-color !default;
// 自建卡片悬浮遮罩背景
$sdxw-project-card-self-detail: linear-gradient(180deg,rgba(94,104,251,0.9) 0%,rgba(61,118,239,1) 100%) !default;
// 协作卡片悬浮遮罩背景
$sdxw-project-card-cooperation-detail: linear-gradient(180deg,rgba(253,158,43,0.9) 0%,rgba(255,136,43,1) 100%) !default;
// 模板卡片悬浮遮罩背景
$sdxw-project-card-template-detail: linear-gradient(180deg,rgba(38,200,169,0.9) 0%,rgba(20,184,154,1) 100%) !default;
// 操作按钮基色
$sdxw-project-card-operation-base-color: #C0C4CC !default;
// 操作按钮鼠标悬停颜色
$sdxw-project-card-operation-hover-color: $sdx-primary-color !default;
// 卡片标题显示行数
$sdxw-project-card-name-show-line-count: 2 !default;
// 卡片遮罩描述文字显示行数
$sdxw-project-card-mask-text-show-line-count: 4 !default;
// 卡片文字大小
$sdxw-project-card-font-size: $sdx-content-font-size !default;
// 卡片操作图标大小
$sdxw-project-card-operate-icon-size: 16px !default;
// 卡片类型图标大小
$sdxw-project-card-type-icon-size: 32px !default;
// 卡片遮罩高度
$sdxw-project-card-mask-height: 128px !default;

```

## API

 <widget-projectcard-api slot="api" />
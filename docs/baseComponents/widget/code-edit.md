# CodeEditor 代码编辑器

代码编辑器弹框组件

## Examples

<Common-BasicUsage>
<widget-code-editor-index></widget-code-editor-index>
  <highlight-code slot="codeText" lang="vue">
    <template>
     <sdxu-button>打开代码编辑器</sdxu-button>
             <SdxwCodeEditor
                 :visible.sync="editorVisible"
                 title="组件代码编辑"
                 v-model="code"
                 :save-handler="handleSave"
             />
    </template>
    <script>
    import SdxwCodeEditor from '@sdx/widget/components/code-editor'
    import SdxuButton from '@sdx/ui/components/button';
    export default {
        name: 'index',
        data() {
            return {
                editorVisible: false,
                code: 'import os\n' +
                    'from typing import Callable, Dict\n' +
                    '\n' +
                    'from celery import Celery\n' +
                    '\n' +
                    'from api.management.dockerBuilderManager import DockerBuilderManager'
            };
        },
        components: {
            SdxwCodeEditor,
            SdxuButton
        },
        methods: {
            handleSave() {
                alert('开始保存');
                return Promise.resolve();
            }
        }
    }
    </script>
  </highlight-code>
</Common-BasicUsage>

## Usage

```js
import Vue from 'vue';
import { CodeEditor } from '@sdx/widget';
// 也可以这么引入
import CodeEditor from '@sdx/widget/lib/code-editor';

// 注册到全局
Vue.use(CodeEditor);

// 组件components选项中注册,其中FileSelectMix为主组件，本地文件/本地文件夹/平台文件三合一
{
    components: {
        SdxwCodeEditor: CodeEditor
    }
}


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
@import '~@sdx/widget/lib/theme/code-editor.scss';

```

## SCSS定制

无

## API

<widget-code-editor-api></widget-code-editor-api>

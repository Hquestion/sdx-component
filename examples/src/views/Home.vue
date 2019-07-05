<template>
    <div class="home">
        <img
            alt="Vue logo"
            src="../assets/logo.png"
        >
        <SdxFilePop v-model="myfile" />
        <SdxwFileSelectMain
            check-type="file"
            v-model="files"
            :string-model="true"
            accept=".py"
        />
        <!--        <SdxuLazyList :load="loadData" item-key="uuid" store-name="file" store-keys="uuid,name" :item-height="50" style="height: 400px;">-->
        <!--            <template #default="{data}">-->
        <!--                <div >{{data.name}}</div>-->
        <!--            </template>-->
        <!--        </SdxuLazyList>-->
        <SdxuButton @click="editorVisible = true" v-auth.user.button="'USER:ACCESxS'" auth="USER:ACCESS">打开代码编辑器</SdxuButton>
        <SdxwCodeEditor
            :visible.sync="editorVisible"
            title="组件代码编辑"
            v-model="code"
            :save-handler="handleSave"
        />
        <HelloWorld  v-auth.user.button="'USER:ACCESxS'" auth="USER:ACCESS"></HelloWorld>
        <SdxuTextTooltip content="1111111111111111111111"></SdxuTextTooltip>
        <el-tooltip content="1111111111111111">
            <el-button>222</el-button>
        </el-tooltip>
        <div>
            <el-tooltip content="Bottom center" placement="bottom" effect="light">
                <el-button>Light</el-button>
                <div slot="content">woshineirong</div>
            </el-tooltip>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import SdxFilePop from '@sdx/widget/components/file-select/src/FileSelectPop';
import SdxwFileSelectMain from '@sdx/widget/components/file-select/src/FileSelectMix';
// import SdxuLazyList from '@sdx/ui/components/lazy-list/src/LazyList';
import SdxwCodeEditor from '@sdx/widget/components/code-editor/src/CodeEditor';

import SdxuButton from '@sdx/ui/components/button';
import SdxuTextTooltip from '@sdx/ui/components/text-tooltip';
import HelloWorld from '../components/HelloWorld';
import ElTooltip from 'element-ui/packages/tooltip';

export default {
    name: 'Home',
    components: {
        HelloWorld,
        SdxuButton,
        SdxwCodeEditor,
        // SdxuLazyList,
        SdxFilePop,
        SdxwFileSelectMain,
        SdxuTextTooltip,
        ElTooltip
    },
    data() {
        return {
            checkedNodes: [],
            searchCheckedNodes: [],
            files: '',
            myfile: [],
            editorVisible: false,
            code: 'import os\n' +
                'from typing import Callable, Dict\n' +
                '\n' +
                'from celery import Celery\n' +
                '\n' +
                'from api.management.dockerBuilderManager import DockerBuilderManager',
            visible: true
        };
    },
    methods: {
        loadData(pageIndex) {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve({
                        data: [
                            { uuid: Math.ceil(Math.random() * 1000000), name: Math.ceil(Math.random() * 1000000)},
                            { uuid: Math.ceil(Math.random() * 1000000), name: Math.ceil(Math.random() * 1000000)},
                            { uuid: Math.ceil(Math.random() * 1000000), name: Math.ceil(Math.random() * 1000000)},
                            { uuid: Math.ceil(Math.random() * 1000000), name: Math.ceil(Math.random() * 1000000)},
                            { uuid: Math.ceil(Math.random() * 1000000), name: Math.ceil(Math.random() * 1000000)},
                            { uuid: Math.ceil(Math.random() * 1000000), name: Math.ceil(Math.random() * 1000000)},
                            { uuid: Math.ceil(Math.random() * 1000000), name: Math.ceil(Math.random() * 1000000)},
                            { uuid: Math.ceil(Math.random() * 1000000), name: Math.ceil(Math.random() * 1000000)},
                        ],
                        total: 100
                    });
                }, 3000);
            });
        },
        handleSave() {
            return Promise.resolve();
        },
        authFn() {
            console.log(arguments);
            return this.authFn;
        }
    },
    mounted() {
        setTimeout(() => {
            this.visible = false;
        }, 10000);
    }
};
</script>

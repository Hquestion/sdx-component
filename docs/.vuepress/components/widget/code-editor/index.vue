<template>
    <div class="index">
        <sdxu-button @click="editorVisible=true">打开代码编辑器</sdxu-button>
        <SdxwCodeEditor
            :visible.sync="editorVisible"
            title="组件代码编辑"
            v-model="code"
            :save-handler="handleSave"
        />
    </div>
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

<style lang="scss" scoped>
    .index {
        width: 400px;
    }
</style>

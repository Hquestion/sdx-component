<template>
    <div class="demo-button">
        <CommonApi :apiData="attrData" title="Attributes"/>
    </div>
</template>

<script>
    import CommonApi from '../../Common/BasicApi'
    export default {
        name: 'ButtonApi',
        data() {
            return {
                attrData: [
                    {
                        params: 'v-model',
                        describe: '代码字符串',
                        type: 'string',
                        optionValue: '—',
                        defaultValue: '空',
                    }, {
                        params: 'visible',
                        describe: '代码编辑器是否显示，可使用sync修饰符',
                        type: 'boolean',
                        optionValue: '—',
                        defaultValue: 'false',
                    }, {
                        params: 'title',
                        describe: '编辑器Dialog标题',
                        type: 'string',
                        optionValue: '—',
                        defaultValue: '—',
                    }, {
                        params: 'saveHandler',
                        describe: '保存的回调函数',
                        type: 'Function',
                        optionValue: '—',
                        defaultValue: '—',
                    }
                ]
            }
        },
        components: {
            CommonApi
        }
    }
</script>

<style lang="less" scoped>

</style>


<template>
    <div class="api">
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
                        params: 'data',
                        describe: '显示的数据',
                        type: 'array',
                        optionValue: '--',
                        defaultValue: '--',
                    },
                    {
                        params: 'highlight-key',
                        describe: '高亮key',
                        type: 'string',
                        optionValue: '--',
                        defaultValue: '--',
                    },
                    {
                        params: 'highlight-key',
                        describe: '高亮key',
                        type: 'string',
                        optionValue: '--',
                        defaultValue: '--',
                    },
                    {
                        params: 'row-id',
                        describe: '行的id,与highlight-key搭配使用，当row-id与highlight-key相同时高亮',
                        type: 'string',
                        optionValue: '--',
                        defaultValue: 'uuid',
                    },
                    {
                        params: '',
                        describe: 'element-ui table组件属性和事件',
                        type: '',
                        optionValue: '--',
                        defaultValue: '--',
                    },
                    {
                        params: 'light',
                        describe: '轻量模式',
                        type: 'Boolean',
                        optionValue: '--',
                        defaultValue: 'false',
                    }
                ],
            }
        },
        components: {
            CommonApi
        }
    }
</script>

<style lang="scss" scoped>

</style>

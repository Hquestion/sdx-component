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
                        describe: '树展示数据',
                        type: 'array',
                        optionValue: '--',
                        defaultValue: '--',
                    },
                    {
                        params: 'tags',
                        describe: 'tags 展示数据 sync| 可传递',
                        type: 'array',
                        optionValue: '--',
                        defaultValue: '--',
                    },
                    {
                        params: 'default-keys',
                        describe: '默认勾选节点  sync| 可传递',
                        type: 'array',
                        optionValue: '--',
                        defaultValue: '--',
                    },
                    {
                        params: 'tree-node-key',
                        describe: '每个树节点用来作为唯一标识的属性，整棵树应该是唯一的',
                        type: 'String',
                        optionValue: '--',
                        defaultValue: '--',
                    },
                    {
                        params: 'placeholder',
                        describe: '输入框的placeholder',
                        type: 'String',
                        optionValue: '--',
                        defaultValue: '--',
                    },
                    {
                        params: 'need-show-tags',
                        describe: '是否需要展示tags',
                        type: 'Boolean',
                        optionValue: '--',
                        defaultValue: 'false',
                    },
                    {
                        params: 'loading',
                        describe: 'tree loading',
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

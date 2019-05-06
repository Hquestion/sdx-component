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

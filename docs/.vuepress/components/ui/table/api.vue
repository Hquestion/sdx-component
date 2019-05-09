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
                        params: 'highlight-key',
                        describe: '高亮key',
                        type: 'string',
                        optionValue: '--',
                        defaultValue: '--',
                    },
                    {
                        params: '',
                        describe: 'element-ui table组件属性和事件',
                        type: 'Object',
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

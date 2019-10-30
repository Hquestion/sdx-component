<template>
    <div class="api">
        <CommonApi :apiData="attrData" title="Attributes"/>
        <CommonApi :apiData="slotData" title="Slots" type="slot"/>
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
                        params: 'width',
                        describe: '下拉框宽度',
                        type: 'string',
                        optionValue: '--',
                        defaultValue: '200px',
                    }, {
                        params: 'title',
                        describe: '标题',
                        type: 'string',
                        optionValue: '--',
                        defaultValue: '空',
                    }
                ],
                slotData: [
                    {
                        params: 'default',
                        describe: '默认插槽，主体内容'
                    },
                    {
                        params: 'ref',
                        describe: '触发下拉框的元素插槽'
                    },
                    {
                        params: 'title',
                        describe: '标题插槽，将覆盖title属性'
                    }
                ]
            }
        },
        components: {
            CommonApi
        }
    }
</script>

<style lang="scss" scoped>

</style>

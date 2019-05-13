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
                        params: 'title',
                        describe: '标题',
                        type: 'string',
                        optionValue: '— ',
                        defaultValue: '',
                    }, {
                        params: 'subtitle',
                        describe: '副标题',
                        type: 'string',
                        optionValue: '—',
                        defaultValue: '',
                    }
                ],
                slotData: [
                    {
                        params: 'default',
                        describe: '默认插槽，panel内容'
                    },
                    {
                        params: 'title',
                        describe: '标题插槽，传入会覆盖通过props设置的title及subtitle'
                    },
                    {
                        params: 'right',
                        describe: '标题右边内容定制'
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

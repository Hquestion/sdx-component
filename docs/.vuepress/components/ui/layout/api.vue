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
                        params: 'align',
                        describe: '水平对齐方式',
                        type: 'string',
                        optionValue: 'left / center / right ',
                        defaultValue: 'center',
                    }, {
                        params: 'valign',
                        describe: '垂直对齐方式',
                        type: 'string',
                        optionValue: 'top / center / bottom',
                        defaultValue: '',
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


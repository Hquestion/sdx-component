<template>
    <div class="api">
        <CommonApi :apiData="attrData" title="Attributes" />
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
                        params: 'empty-type',
                        describe: 'icon类型',
                        type: 'string',
                        optionValue: 'noData / noSearchResult / noNetwork /noFound / 支持icon类名',
                        defaultValue: 'noData',
                    },
                    {
                        params: 'empty-content',
                        describe: 'icon对应内容',
                        type: 'string',
                        optionValue: '四种对应内容不需要传 / 传icon类名，需要传内容',
                        defaultValue: '暂无数据哦',
                    },
                    {
                        params: 'size',
                        describe: '尺寸',
                        type: 'string',
                        optionValue: 'small / normal / large',
                        defaultValue: 'normal',
                    },
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

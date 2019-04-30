<template>
    <div class="api">
        <CommonApi :apiData="attrData" title="Attributes"/>
        <CommonApi :apiData="eventData" title="Events" type="event"/>
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
                        params: 'page-size',
                        describe: '每页显示条目个数',
                        type: 'number',
                        optionValue: '—',
                        defaultValue: '10',
                    }, {
                        params: 'total',
                        describe: '总条目数',
                        type: 'number',
                        optionValue: '—',
                        defaultValue: '—',
                    }, {
                        params: 'pager-count',
                        describe: '页码按钮的数量，当总页数超过该值时会折叠',
                        type: 'number',
                        optionValue: '大于等于 5 且小于等于 21 的奇数',
                        defaultValue: '7',
                    }, {
                        params: 'current-page',
                        describe: '当前页数，支持 .sync 修饰符',
                        type: 'number',
                        optionValue: '—',
                        defaultValue: '1',
                    }, {
                        params: 'disabled',
                        describe: '是否禁用',
                        type: 'boolean',
                        optionValue: '—',
                        defaultValue: 'false',
                    }
                ],
                eventData: [
                    {
                        params: 'current-change',
                        describe: 'currentPage 改变时会触发',
                        cbparams: '当前页',
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

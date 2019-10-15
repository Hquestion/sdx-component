<template>
    <div class="demo-resource">
        <CommonApi :apiData="attrData" title="Attributes"/>
    </div>
</template>

<script>
    import CommonApi from '../../Common/BasicApi'
    export default {
        name: 'ResourceApi',
        data() {
            return {
                attrData: [
                    {
                        params: 'type',
                        describe: '资源类型',
                        type: 'string',
                        optionValue: 'onlycpu/cpu/gpu',
                        defaultValue: 'onlycpu',
                    }, {
                        params: 'value',
                        describe: '资源对象',
                        type: 'Object',
                        optionValue: '—',
                        defaultValue: '-',
                    }, {
                        params: 'cpulabel',
                        describe: 'cpulabel',
                        type: 'string',
                        optionValue: '—',
                        defaultValue: 'CPU/内存',
                    }, {
                        params: 'gpulabel',
                        describe: 'gpulabel',
                        type: 'string',
                        optionValue: '—',
                        defaultValue: 'GPU',
                    }, {
                        params: 'readOnly',
                        describe: '是否只读',
                        type: 'Boolean',
                        optionValue: 'false/true',
                        defaultValue: 'false',
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


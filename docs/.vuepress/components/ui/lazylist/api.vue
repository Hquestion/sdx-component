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
                        params: 'load',
                        describe: '分页加载数据的函数',
                        type: 'Function',
                        optionValue: '—',
                        defaultValue: 'undefined',
                    }, {
                        params: 'itemKey',
                        describe: '唯一标识列表中项目的key，为空时默认以index作为key',
                        type: 'string',
                        optionValue: '—',
                        defaultValue: '',
                    }, {
                        params: 'itemClass',
                        describe: '列表项的类名',
                        type: 'string',
                        optionValue: '—',
                        defaultValue: '',
                    }, {
                        params: 'itemHeight',
                        describe: '列表项高度',
                        type: 'number',
                        optionValue: '—',
                        defaultValue: '',
                    }, {
                        params: 'storeKeys',
                        describe: '存储到indexedDB的列表项的key列表，逗号分割',
                        type: 'string',
                        optionValue: '—',
                        defaultValue: '',
                    }, {
                        params: 'storeName',
                        describe: '存储到indexedDB的table名',
                        type: 'string',
                        optionValue: '—',
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


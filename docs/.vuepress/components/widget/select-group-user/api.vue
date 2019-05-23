<template>
    <div class="demo-button">
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
                        params: 'mode',
                        describe: '选择模式, 默认选择用户和用户组, 传入group则只选择用户组',
                        type: 'string',
                        optionValue: 'group/user',
                        defaultValue: '空',
                    }, {
                        params: 'groups',
                        describe: '由用户组id组成的数组, 支持sync操作符',
                        type: 'array',
                        optionValue: '-',
                        defaultValue: '-',
                    }, {
                        params: 'users',
                        describe: '由用户id组成的数组, 支持sync操作符',
                        type: 'array',
                        optionValue: '-',
                        defaultValue: '-',
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


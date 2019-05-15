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
                        params: 'type',
                        describe: '用于筛选搜索用户/用户组/角色/所有',
                        type: 'string',
                        optionValue: 'user / group / role /all',
                        defaultValue: 'all',
                    }, {
                        params: 'v-model',
                        describe: '双向绑定的值',
                        type: 'Object，结构如：{uuid: "", name: ""}',
                        optionValue: '—',
                        defaultValue: 'undefined',
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


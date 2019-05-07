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
                        params: 'visible',
                        describe: '是否显示 Dialog，支持 .sync 修饰符',
                        type: 'boolean',
                        optionValue: '—',
                        defaultValue: 'false',
                    },
                    {
                        params: 'userInfoData',
                        describe: '用户信息',
                        type: 'Object',
                        optionValue: '—',
                        defaultValue: '—'
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

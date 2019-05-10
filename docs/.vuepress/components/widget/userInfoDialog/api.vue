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
                    },
                    {
                        params: 'username',
                        describe: '用户名（userInfoData中的属性）',
                        type: 'String',
                        optionValue: '—',
                        defaultValue: '—'
                    },
                    {
                        params: 'fullName',
                        describe: '显示名（userInfoData中的属性）',
                        type: 'String',
                        optionValue: '—',
                        defaultValue: '—'
                    },
                    {
                        params: 'password',
                        describe: '密码（userInfoData中的属性）',
                        type: 'String',
                        optionValue: '—',
                        defaultValue: '—'
                    },
                    {
                        params: 'roles',
                        describe: '角色（userInfoData中的属性）',
                        type: 'Array',
                        optionValue: '—',
                        defaultValue: '—'
                    },
                    {
                        params: 'group',
                        describe: '用户组（userInfoData中的属性）',
                        type: 'Array',
                        optionValue: '—',
                        defaultValue: '—'
                    },
                    {
                        params: 'theme',
                        describe: '主题区分在dashboard和用户管理处的查看详情弹窗',
                        type: 'String',
                        optionValue: 'dashboard / user',
                        defaultValue: '—'
                    },
                     {
                        params: 'id',
                        describe: '用户ID',
                        type: 'String',
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

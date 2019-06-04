<template>
    <div class="demo-button">
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
                        params: 'visible',
                        describe: '是否显示共享设置弹框, 支持sync操作符',
                        type: 'boolean',
                        optionValue: '-',
                        defaultValue: '-',
                    }, {
                        params: 'default-users',
                        describe: '默认选择的用户, 编辑模式时需传入',
                        type: 'array',
                        optionValue: '-',
                        defaultValue: '-',
                    }, {
                        params: 'default-groups',
                        describe: '默认选择的用户组, 编辑模式时需传入',
                        type: 'array',
                        optionValue: '-',
                        defaultValue: '-',
                    }, {
                        params: 'default-share-type',
                        describe: '默认是否全局共享, 编辑模式时需传入',
                        type: 'string',
                        optionValue: 'PUBLIC / PRIVATE',
                        defaultValue: 'PRIVATE',
                    }, {
                        params: 'handler',
                        describe: '保存共享设置时的处理函数, 该函数需支持三个参数: 1. selectedUsers: 共享设置选择的用户 2. selectedGroups: 共享设置选择的用户组 3. shareType: 全局共享设置, PRIVATE或PUBLIC。处理函数应该返回Promise',
                        type: 'function',
                        optionValue: '-',
                        defaultValue: '-',
                    }
                ],
                eventData: [{
                    params: 'confirm-edit',
                    describe: '当不提供handler处理函数时将抛出confirm-edit事件, 注意需要在监听函数内部决定是否应该关闭弹框, 组件不会自动关闭弹框',
                    cbparams: '三个参数:1. selectedUsers: 共享设置选择的用户 2. selectedGroups: 共享设置选择的用户组 3. shareType: 全局共享设置, PRIVATE或PUBLIC'
                }]
            }
        },
        components: {
            CommonApi
        }
    }
</script>

<style lang="less" scoped>

</style>


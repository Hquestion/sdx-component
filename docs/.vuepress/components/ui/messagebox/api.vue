<template>
    <div class="api">
        <CommonApi :apiData="attrData" title="Attributes" />
    </div>
</template>

<script>
    import CommonApi from '../../Common/BasicApi'
    export default {
        name: 'groupApi',
        data() {
            return {
                attrData: [
                    {
                        params: 'title',
                        describe: '提示框标题',
                        type: 'string',
                        optionValue: '—',
                        defaultValue: '提示（国际化切换）',
                    },
                    {
                        params: 'content',
                        describe: '提示框内容',
                        type: 'string',
                        optionValue: '',
                        defaultValue: '空',
                    },
                    {
                        params: 'type',
                        describe: '提示框类型',
                        type: 'string',
                        optionValue: 'confirm / alert',
                        defaultValue: 'confirm',
                    },
                    {
                        params: 'status',
                        describe: '提示框状态',
                        type: 'string',
                        optionValue: 'error / success / info / warning',
                        defaultValue: 'error',
                    },
                    {
                        params: 'lock',
                        describe: '在弹出提示时是否锁住某区域（默认body）',
                        type: 'string | boolean | HTMLElement,为boolean型是锁住body,否则需传入选择器或节点',
                        optionValue: '—',
                        defaultValue: 'true',
                    },
                    {
                        params: 'hideOnRouting',
                        describe: '提示框状态',
                        type: 'string',
                        optionValue: 'error / success / info / warning',
                        defaultValue: 'error',
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

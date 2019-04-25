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
                        params: 'size',
                        describe: '尺寸',
                        type: 'string',
                        optionValue: 'regular / small ',
                        defaultValue: 'regular',
                    }, {
                        params: 'type',
                        describe: '类型',
                        type: 'string',
                        optionValue: 'default / primary / success / warning / danger / info / text, (暂未实现success / warning / danger / info / text)',
                        defaultValue: 'primary',
                    }, {
                        params: 'plain',
                        describe: '是否为朴素按钮',
                        type: 'boolean',
                        optionValue: '—',
                        defaultValue: 'false',
                    }, {
                        params: 'shadow',
                        describe: '是否有投影效果',
                        type: 'boolean',
                        optionValue: '—',
                        defaultValue: 'false',
                    }, {
                        params: 'loading',
                        describe: '是否正在处理中',
                        type: 'boolean',
                        optionValue: '—',
                        defaultValue: 'false',
                    }, {
                        params: 'invert',
                        describe: '是否按钮颜色倒置',
                        type: 'boolean',
                        optionValue: '—',
                        defaultValue: 'false',
                    }, {
                        params: 'disabled',
                        describe: '是否禁用按钮',
                        type: 'boolean',
                        optionValue: '—',
                        defaultValue: 'false',
                    }, {
                        params: 'block',
                        describe: '是否以块级元素展示按钮',
                        type: 'boolean',
                        optionValue: '—',
                        defaultValue: 'false',
                    }, {
                        params: 'icon',
                        describe: '按钮图标',
                        type: 'string',
                        optionValue: '—',
                        defaultValue: '',
                    }
                ],
                eventData: [
                    {
                        params: 'click',
                        describe: '鼠标点击事件',
                        cbparams: '—',
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

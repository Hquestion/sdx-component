<template>
    <div class="api">
        <CommonApi :apiData="attrData" title="Attributes"/>
        <CommonApi :apiData="slotData" title="Slots" type="slot"/>
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
                    }, {
                        params: 'trigger',
                        describe: '下拉框展示的触发方式',
                        type: 'string',
                        optionValue: 'click / hover',
                        defaultValue: 'hover',
                    }, {
                        params: 'dropdownWidth',
                        describe: '下拉框宽度',
                        type: 'String',
                        optionValue: '—',
                        defaultValue: '100%， 与按钮宽度相同',
                    }
                ],
                eventData: [
                    {
                        params: 'click',
                        describe: '鼠标点击事件',
                        cbparams: '—',
                    }
                ],
                slotData: [
                    {
                        params: 'default',
                        describe: '默认插槽，按钮内容'
                    },
                    {
                        params: 'dropdown',
                        describe: 'dropdown插槽，dropdown内容，按钮插入时会以block方式展示'
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

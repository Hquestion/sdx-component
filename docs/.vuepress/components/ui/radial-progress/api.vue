<template>
    <div class="api">
        <CommonApi :apiData="attrData" title="Attributes"/>
        <CommonApi :apiData="slotData" title="Slots" type="slot"/>
    </div>
</template>

<script>
    import CommonApi from '../../Common/BasicApi'
    export default {
        name: 'ProgressApi',
        data() {
            return {
                attrData: [
                    {
                        params: 'diameter',
                        describe: '直径长度(px)',
                        type: 'number',
                        optionValue: '-',
                        defaultValue: '200',
                    }, {
                        params: 'totalSteps',
                        describe: '进度总数',
                        type: 'number',
                        optionValue: '—',
                        defaultValue: '10',
                    }, {
                        params: 'completedSteps',
                        describe: '完成数',
                        type: 'number',
                        optionValue: '—',
                        defaultValue: '0',
                    }, {
                        params: 'startColor',
                        describe: '进度条颜色：渐变色开始颜色',
                        type: 'string',
                        optionValue: '—',
                        defaultValue: '#bbff42',
                    }, {
                        params: 'stopColor',
                        describe: '进度条颜色：渐变色结束颜色',
                        type: 'string',
                        optionValue: '—',
                        defaultValue: '#429321',
                    }, {
                        params: 'innerStrokeColor',
                        describe: '滑块颜色',
                        type: 'string',
                        optionValue: '—',
                        defaultValue: '#323232',
                    }, {
                        params: 'strokeWidth',
                        describe: '进度条宽度',
                        type: 'number',
                        optionValue: '—',
                        defaultValue: '10',
                    }, {
                        params: 'slideWidth',
                        describe: '滑块宽度',
                        type: 'number',
                        optionValue: '—',
                        defaultValue: '10',
                    }, {
                        params: 'animateSpeed',
                        describe: '动画时间(ms)',
                        type: 'number',
                        optionValue: '—',
                        defaultValue: '1000',
                    }, {
                        params: 'fps',
                        describe: '动画帧数',
                        type: 'number',
                        optionValue: '—',
                        defaultValue: '60',
                    }, {
                        params: 'timingFunc',
                        describe: '动画转换方法',
                        type: 'string',
                        optionValue: '参考css: transition-timing-function',
                        defaultValue: 'linear',
                    }
                ],
                slotData: [{
                    params: 'default',
                    describe: '默认插槽，进度条中间内容'
                }]
            }
        },
        components: {
            CommonApi
        }
    }
</script>

<style lang="scss" scoped>

</style>

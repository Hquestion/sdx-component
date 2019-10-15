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
                        params: 'visible',
                        describe: '是否显示 Dialog，支持 .sync 修饰符',
                        type: 'boolean',
                        optionValue: '—',
                        defaultValue: 'false',
                    }, {
                        params: 'size',
                        describe: '尺寸',
                        type: 'string',
                        optionValue: 'large / normal / small ',
                        defaultValue: 'normal',
                    }, {
                        params: 'title',
                        describe: 'Dialog 的标题，也可通过具名 slot 传入	',
                        type: 'string',
                        optionValue: '—',
                        defaultValue: '—',
                    }, {
                        params: 'fullscreen',
                        describe: '是否为全屏 Dialog',
                        type: 'boolean',
                        optionValue: '—',
                        defaultValue: 'false',
                    }, {
                        params: 'top',
                        describe: 'Dialog CSS 中的 margin-top 值',
                        type: 'string',
                        optionValue: '—',
                        defaultValue: '15vh',
                    }, {
                        params: 'modal',
                        describe: '是否需要遮罩层',
                        type: 'boolean',
                        optionValue: '—',
                        defaultValue: 'true',
                    }, {
                        params: 'modal-append-to-body',
                        describe: '遮罩层是否插入至 body 元素上，若为 false，则遮罩层会插入至 Dialog 的父元素上',
                        type: 'boolean',
                        optionValue: '—',
                        defaultValue: 'true',
                    }, {
                        params: 'append-to-body',
                        describe: 'Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true',
                        type: 'boolean',
                        optionValue: '—',
                        defaultValue: 'false',
                    }, {
                        params: 'lock-scroll',
                        describe: '	是否在 Dialog 出现时将 body 滚动锁定',
                        type: 'boolean',
                        optionValue: '—',
                        defaultValue: 'true',
                    }, {
                        params: 'custom-class',
                        describe: 'Dialog 的自定义类名',
                        type: 'string',
                        optionValue: '—',
                        defaultValue: '—',
                    }, {
                        params: 'close-on-click-modal',
                        describe: '是否可以通过点击 modal 关闭 Dialog',
                        type: 'boolean',
                        optionValue: '—',
                        defaultValue: 'true',
                    }, {
                        params: 'close-on-press-escape',
                        describe: '是否可以通过按下 ESC 关闭 Dialog',
                        type: 'boolean',
                        optionValue: '—',
                        defaultValue: 'true',
                    }, {
                        params: 'show-close',
                        describe: '是否显示关闭按钮',
                        type: 'boolean',
                        optionValue: '—',
                        defaultValue: 'true',
                    }, {
                        params: 'before-close',
                        describe: '关闭前的回调，会暂停 Dialog 的关闭',
                        type: 'function(done)，done 用于关闭 Dialog',
                        optionValue: '—',
                        defaultValue: '—',
                    }, {
                        params: 'no-footer',
                        describe: '是否完全隐藏footer',
                        type: 'boolean',
                        optionValue: '—',
                        defaultValue: 'false',
                    }, {
                        params: 'title-icon',
                        describe: '对话框title显示的icon',
                        type: 'string',
                        optionValue: '—',
                        defaultValue: '—',
                    }, {
                        params: 'confirm-handler',
                        describe: '确认按钮点击回调，需要返回一个Promise, resolve时才会关闭dialog',
                        type: 'Function',
                        optionValue: '—',
                        defaultValue: 'undefined'
                    }, {
                        params: 'confirm-label',
                        describe: '确认按钮文字',
                        type: 'String',
                        optionValue: '—',
                        defaultValue: '确定'
                    }, {
                        params: 'cancel-label',
                        describe: '取消按钮文字',
                        type: 'String',
                        optionValue: '—',
                        defaultValue: '—'
                    }
                ],
                eventData: [
                    {
                        params: 'open',
                        describe: 'Dialog 打开的回调',
                        cbparams: '—',
                    },
                    {
                        params: 'opened',
                        describe: 'Dialog 打开动画结束时的回调',
                        cbparams: '—',
                    },
                    {
                        params: 'close',
                        describe: 'Dialog 关闭的回调',
                        cbparams: '—',
                    },
                    {
                        params: 'closed',
                        describe: 'Dialog 关闭动画结束时的回调',
                        cbparams: '—',
                    },
                    {
                        params: 'confirm',
                        describe: 'Dialog 确认的回调',
                        cbparams: '—',
                    },
                    {
                        params: 'cancel',
                        describe: 'Dialog 取消的回调',
                        cbparams: '—',
                    }
                ],
                slotData: [
                    {
                        params: '—',
                        describe: 'Dialog 的内容'
                    },
                    {
                        params: 'title',
                        describe: 'Dialog 标题区的内容'
                    },
                    {
                        params: 'footer',
                        describe: 'Dialog 按钮操作区的内容'
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

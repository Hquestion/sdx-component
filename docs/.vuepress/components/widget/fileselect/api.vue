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
                        params: 'v-model / value',
                        describe: '双向绑定的文件选择值，当前仅支持数组，后续根据实际需求调整',
                        type: 'Array',
                        optionValue: '—',
                        defaultValue: '[]',
                    }, {
                        params: 'source',
                        describe: '文件源，可以是本地/文件系统',
                        type: 'string',
                        optionValue: 'all / ceph / local',
                        defaultValue: 'all',
                    }, {
                        params: 'checkType',
                        describe: '支持选择的类型包括文件/文件夹',
                        type: 'string',
                        optionValue: 'all / file / folder',
                        defaultValue: 'all',
                    }, {
                        params: 'limit',
                        describe: '限制选择的数量',
                        type: 'number',
                        optionValue: '—',
                        defaultValue: '1',
                    }, {
                        params: 'accept',
                        describe: '可选择的文件类型，原生html file文件选择框属性',
                        type: 'string',
                        optionValue: '—',
                        defaultValue: '—',
                    }, {
                        params: 'userId',
                        describe: '当前用户的id，用于获取用户文件列表',
                        type: 'string',
                        optionValue: '—',
                        defaultValue: '—',
                    }, {
                        params: 'rootPath',
                        describe: '文件目录的根路径，从此路径下开始查找文件/上传文件',
                        type: 'string',
                        optionValue: '—',
                        defaultValue: '—',
                    }, {
                        params: 'treeOptions',
                        describe: 'element-ui的tree组件属性，详情参考element-ui文档',
                        type: 'Object',
                        optionValue: '—',
                        defaultValue: 'null',
                    }, {
                        params: 'checkable',
                        describe: '是否可以选择，可以设置为false来展示文件结构',
                        type: 'Boolean',
                        optionValue: 'true / false',
                        defaultValue: 'true',
                    }, {
                        params: 'showUploadList',
                        describe: '是否显示当前选择的文件列表',
                        type: 'Boolean',
                        optionValue: '—',
                        defaultValue: 'true',
                    }, {
                        params: 'maxSize',
                        describe: '最大支持上传的文件大小，单位Byte',
                        type: 'number',
                        optionValue: '—',
                        defaultValue: '200M',
                    }, {
                        params: 'onExceedMaxSize',
                        describe: '选中并上传单个本地文件达到maxSize指定的限制时的钩子函数，接收一个file参数',
                        type: 'Function',
                        optionValue: '—',
                        defaultValue: 'undefined',
                    }, {
                        params: 'onExceedMaxSizeDir',
                        describe: '选中并上传本地文件夹时，当文件夹中某个文件达到maxSize指定的限制时的钩子函数，接收一个file参数',
                        type: 'Function',
                        optionValue: '—',
                        defaultValue: 'undefined',
                    }, {
                        params: 'onProgress',
                        describe: '文件上传中的钩子函数，接收一个file参数，同element-ui的onProgress',
                        type: 'Function',
                        optionValue: '—',
                        defaultValue: 'undefined',
                    }, {
                        params: 'onSuccess',
                        describe: '文件上传成功的钩子函数，接收一个file参数，同element-ui的onSuccess',
                        type: 'Function',
                        optionValue: '—',
                        defaultValue: 'undefined',
                    }, {
                        params: 'onError',
                        describe: '文件上传失败的钩子函数，接收一个file参数，同element-ui的onError',
                        type: 'Function',
                        optionValue: '—',
                        defaultValue: 'undefined',
                    }
                ],
                eventData: [
                    {
                        params: 'blur',
                        describe: '当dropdown从显示变成隐藏时触发，模拟原生blur事件',
                        cbparams: '无'
                    },
                    {
                        params: 'el.form.blur',
                        describe: '定向在ElFormItem上触发，用于表单校验',
                        cbparams: '无'
                    },
                    {
                        params: 'exceed-max-size',
                        describe: '上传的单个文件达到最大大小时触发',
                        cbparams: 'file，达到上限的文件实例'
                    },
                    {
                        params: 'exceed-max-size-dir',
                        describe: '区别于上传单个文件，当上传文件夹时，文件夹中的单个文件达到最大大小时触发',
                        cbparams: 'file，达到上限的文件实例'
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

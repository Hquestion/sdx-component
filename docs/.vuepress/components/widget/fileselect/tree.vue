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
                    },{
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
                    }
                ],
                eventData: [
                    {
                        params: 'tree-shake',
                        describe: '当文件树中某节点展开/收起时，树高度产生变化，此事件用于支持用户监听此变化做相应处理',
                        cbparams: '无'
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

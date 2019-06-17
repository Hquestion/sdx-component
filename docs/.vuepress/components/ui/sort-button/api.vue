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
                        params: 'title',
                        describe: '排序标题',
                        type: 'string',
                        optionValue: '—',
                        defaultValue: '—',
                    }, {
                        params: 'order',
                        describe: '正序或者倒序',
                        type: 'string',
                        optionValue: 'desc / asc',
                        defaultValue: '—',
                    }
                ],
                eventData: [
                    {
                        params: 'sortChange',
                        describe: '排序改变',
                        cbparams: '参数为（order）',
                    }
                ],
            }
        },
        components: {
            CommonApi
        }
    }
</script>

<style lang="scss" scoped>

</style>

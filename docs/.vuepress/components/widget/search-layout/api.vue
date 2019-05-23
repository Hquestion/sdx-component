<template>
    <div class="demo-button">
        <CommonApi :apiData="eventData" title="Events" type="event"/>
    </div>
</template>

<script>
    import CommonApi from '../../Common/BasicApi'
    export default {
        name: 'SearchLayoutApi',
        data() {
            return {
                 eventData: [
                    {
                        params: 'search',
                        describe: '搜索事件',
                        cbparams: '—',
                    },
                    {
                        params: 'reset',
                        describe: '重置事件',
                        cbparams: '—',
                    }
                ],
            }
        },
        components: {
            CommonApi
        }
    }
</script>




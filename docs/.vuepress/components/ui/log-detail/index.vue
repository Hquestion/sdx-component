<template>
    <SdxuLogDetail :content="content" height="600px" :preLoading="true" :sufLoading="true" :loading="true" />
</template>

<script>
import SdxuLogDetail from '@sdx/ui/components/log-detail';
export default {
    name: 'LogDetail',
    data() {
        return {
            content: '2019-04-26 11:13:46 INFO  BlockManagerInfo:54 - Removed broadcast_36_piece0 on spark-1556271805760-driver-svc.5cad639a96c490000d8bcb00.svc:7079 in memory (size: 494.8 KB, free: 1961.2 MB)\r\n2019-04-26 11:13:46 INFO  BlockManagerInfo:54 - Removed broadcast_36_piece0 on 198.168.49.147:36463 in memory (size: 494.8 KB, free: 1961.2 MB)\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 597\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 641\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 579\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 619\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 601\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 637\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 627\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 647\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 592\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 610\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 613\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 656\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 624\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 639\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 675\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 608\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 616\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 677\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 606\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 660\r\n2019-04-26 11:13:46 INFO  BlockManagerInfo:54 - Removed broadcast_38_piece0 on spark-1556271805760-driver-svc.5cad639a96c490000d8bcb00.svc:7079 in memory (size: 137.0 KB, free: 1961.3 MB)\r\n2019-04-26 11:13:46 INFO  BlockManagerInfo:54 - Removed broadcast_38_piece0 on 198.168.49.147:36463 in memory (size: 137.0 KB, free: 1961.3 MB)\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 659\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 620\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 611\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 672\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 661'
        };
    },
    components: {
        SdxuLogDetail
    }
}
</script>

<style lang="scss">
</style>

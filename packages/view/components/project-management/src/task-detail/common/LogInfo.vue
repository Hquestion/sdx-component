<template>
    <SdxuContentPanel
        :title="method + '日志'"
        class="sdxv-log-info"
    >
        <template
            v-if="method === 'tail'"
            #right
        >
            <div class="sdxv-log-info__switch">
                <div class="sdxv-log-info__switch--item">
                    <span>自动拉取：</span>
                    <el-switch
                        v-model="autoPull"
                    />
                </div>
                <div class="sdxv-log-info__switch--item">
                    <span>滚动跟随：</span>
                    <el-switch
                        v-model="followScroll"
                    />
                </div>
            </div>
        </template>
        <template #default>
            <SdxuScroll>
                <div class="sdxv-log-info__scroll">
                    <p class="sdxv-log-info__content">
                        {{ logContent }}
                    </p>
                </div>
            </SdxuScroll>
        </template>
    </SdxuContentPanel>
</template>

<script>
import SdxuContentPanel from '@sdx/ui/components/content-panel';
import SdxuScroll from '@sdx/ui/components/scroll';
import { Switch } from 'element-ui';

export default {
    name: 'SdxvLogInfo',
    components: {
        SdxuContentPanel,
        SdxuScroll,
        [Switch.name]: Switch
    },
    props: {
        podId: {
            type: String,
            default: ''
        },
        method: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            autoPull: false,
            followScroll: false,
            logContent: '2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 584\r\n2019-04-26 11:13:46 INFO  BlockManagerInfo:54 - Removed broadcast_36_piece0 on spark-1556271805760-driver-svc.5cad639a96c490000d8bcb00.svc:7079 in memory (size: 494.8 KB, free: 1961.2 MB)\r\n2019-04-26 11:13:46 INFO  BlockManagerInfo:54 - Removed broadcast_36_piece0 on 198.168.49.147:36463 in memory (size: 494.8 KB, free: 1961.2 MB)\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 597\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 641\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 579\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 619\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 601\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 637\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 627\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 647\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 592\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 610\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 613\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 656\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 624\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 639\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 675\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 608\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 616\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 677\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 606\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 660\r\n2019-04-26 11:13:46 INFO  BlockManagerInfo:54 - Removed broadcast_38_piece0 on spark-1556271805760-driver-svc.5cad639a96c490000d8bcb00.svc:7079 in memory (size: 137.0 KB, free: 1961.3 MB)\r\n2019-04-26 11:13:46 INFO  BlockManagerInfo:54 - Removed broadcast_38_piece0 on 198.168.49.147:36463 in memory (size: 137.0 KB, free: 1961.3 MB)\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 659\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 620\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 611\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 672\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 661\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 678\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 589\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 657\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 630\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 649\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 593\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 600\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 598\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 582\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 632\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 625\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 643\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 628\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 621\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 667\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 590\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 651\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 604\r\n2019-04-26 11:13:46 INFO  BlockManagerInfo:54 - Removed broadcast_35_piece0 on spark-1556271805760-driver-svc.5cad639a96c490000d8bcb00.svc:7079 in memory (size: 30.4 KB, free: 1961.4 MB)\r\n2019-04-26 11:13:46 INFO  BlockManagerInfo:54 - Removed broadcast_35_piece0 on 198.168.49.147:36463 in memory (size: 30.4 KB, free: 1961.4 MB)\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 662\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 666\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 673\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 581\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 650\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 629\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 646\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned shuffle 3\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 580\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 599\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 658\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 623\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 586\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 644\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 585\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 594\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 605\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 609\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 612\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 636\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 618\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 603\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 587\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 634\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 640\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 631\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 583\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 602\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 653\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 652\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 668\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 665\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 638\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 633\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 588\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 615\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 676\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 614\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 622\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 607\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 595\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 679\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 626\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 645\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 655\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 648\r\n2019-04-26 11:13:46 INFO  BlockManagerInfo:54 - Removed broadcast_37_piece0 on spark-1556271805760-driver-svc.5cad639a96c490000d8bcb00.svc:7079 in memory (size: 30.4 KB, free: 1961.4 MB)\r\n2019-04-26 11:13:46 INFO  BlockManagerInfo:54 - Removed broadcast_37_piece0 on 198.168.49.147:36463 in memory (size: 30.4 KB, free: 1961.4 MB)\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 596\r\n2019-04-26 11:13:46 INFO  ContextCleaner:54 - Cleaned accumulator 669'
        };
    },
    methods: {
        // todo: 获取日志 
    }
};
</script>

<style>

</style>

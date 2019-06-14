<template>
    <sdxu-content-panel
        title="运行记录"
        class="sdxv-running-info"
    >
        <div v-if="skyflowInfo.processType === 'PATCH'">
            <SdxuTabRadioGroup
                v-model="listType"
                style="margin-bottom: 20px;"
            >
                <SdxuTabRadioItem
                    name="general"
                >
                    执行记录列表
                </SdxuTabRadioItem>
                <SdxuTabRadioItem
                    name="timer"
                >
                    定时运行列表
                </SdxuTabRadioItem>
            </SdxuTabRadioGroup>
        </div>
        <div>
            <sdxw-search-layout
                @search="search"
                style="width: 100%"
            >
                <sdxw-search-item label="执行方式：">
                    <el-select
                        v-model="runningMethod"
                        placeholder="请选择"
                    >
                        <el-option
                            label="全部"
                            value="all"
                        />
                        <el-option
                            label="手动"
                            value="manual"
                        />
                        <el-option
                            label="续跑"
                            value="auto"
                        />
                    </el-select>
                </sdxw-search-item>
                <sdxw-search-item label="工作流状态：">
                    <el-select
                        v-model="runningMethod"
                        placeholder="请选择"
                    >
                        <el-option
                            label="全部"
                            value="all"
                        />
                        <el-option
                            label="手动"
                            value="manual"
                        />
                        <el-option
                            label="续跑"
                            value="auto"
                        />
                    </el-select>
                </sdxw-search-item>
                <sdxw-search-item label="执行时间：">
                    <el-time-picker
                        is-range
                        v-model="value1"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        placeholder="选择时间范围"
                    />
                </sdxw-search-item>
            </sdxw-search-layout>
        </div>
        <div>
            <general-running
                v-if="listType === 'general'"
            />
            <timer-running v-else />
        </div>
    </sdxu-content-panel>
</template>

<script>
import TabRadio from '@sdx/ui/components/tab-radio';
import SearchLayout from  '@sdx/widget/components/search-layout';
import Input from '@sdx/ui/components/input';
import Select from 'element-ui/lib/select';
import TimePicker from 'element-ui/lib/time-picker';
import ContentPanel from '@sdx/ui/components/content-panel';
import { getSkyflowInfo } from '@sdx/utils/src/api/skyflow';
import GeneralRunning from './GeneralRunning';
import TimerRunning from './TimerRunning';
export default {
    name: 'SdxvSkyflowList',
    data() {
        return {
            listType: 'general',
            runningMethod: 'all',
            skyflowInfo: {},
            value1: ''
        };
    },
    components: {
        [TabRadio.TabRadioGroup.name]: TabRadio.TabRadioGroup,
        [TabRadio.TabRadioItem.name]: TabRadio.TabRadioItem,
        [SearchLayout.SearchLayout.name]: SearchLayout.SearchLayout,
        [SearchLayout.SearchItem.name]: SearchLayout.SearchItem,
        [Input.name]: Input,
        [Select.name]: Select,
        [ContentPanel.name]: ContentPanel,
        [TimePicker.name]: TimePicker,
        GeneralRunning,
        TimerRunning
    },
    created() {
        this.init();
    },
    computed: {
    },
    methods: {
        search() {

        },
        init() {
            getSkyflowInfo(this.$route.params.id).then(res => {
                this.skyflowInfo = res;
            });
        }
    }
};
</script>

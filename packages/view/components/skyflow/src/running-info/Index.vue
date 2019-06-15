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
                @reset="resetSearch"
                style="width: 100%"
            >
                <span v-if="listType === 'timer'">
                    <sdxw-search-item label="任务名称：">
                        <sdxu-input
                            v-model="searchConditions.name"
                            type="search"
                            size="small"
                            placeholder="请输入任务名称"
                        />
                    </sdxw-search-item>
                </span>
                <span v-else>
                    <sdxw-search-item label="执行方式：">
                        <el-select
                            v-model="searchConditions.executeKind"
                            placeholder="请选择"
                        >
                            <el-option
                                label="全部"
                                value=""
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
                            v-model="searchConditions.state"
                            placeholder="请选择"
                        >
                            <el-option
                                v-for="(item, index) in stateList"
                                :key="index"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select>
                    </sdxw-search-item>
                    <sdxw-search-item label="执行时间：">
                        <el-date-picker
                            v-model="searchConditions.timeRange"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            align="right"
                        />
                    </sdxw-search-item>
                </span>
            </sdxw-search-layout>
        </div>
        <div>
            <general-running
                v-if="listType === 'general'"
                ref="generalRunningTable"
                :search-conditions="searchConditions"
            />
            <timer-running
                v-else
                ref="timerRunningTable"
                :search-conditions="searchConditions"
            />
        </div>
    </sdxu-content-panel>
</template>

<script>
import TabRadio from '@sdx/ui/components/tab-radio';
import SearchLayout from  '@sdx/widget/components/search-layout';
import Input from '@sdx/ui/components/input';
import Select from 'element-ui/lib/select';
import DatePicker from 'element-ui/lib/date-picker';
import ContentPanel from '@sdx/ui/components/content-panel';
import { getSkyflowInfo } from '@sdx/utils/src/api/skyflow';
import GeneralRunning from './GeneralRunning';
import TimerRunning from './TimerRunning';
export default {
    name: 'SdxvSkyflowList',
    data() {
        return {
            listType: 'general',
            skyflowInfo: {},
            searchConditions: {
                name: '',
                executeKind: '',
                state: '',
                executeStartDate: '',
                executeEndDate: '',
                timeRange: []
            },
            stateList: [
                {
                    value: '',
                    label: '全部'
                },
                {
                    value: 'running',
                    label: '运行中'
                },
                {
                    value: 'launching',
                    label: '启动中'
                },
                {
                    value: 'failed',
                    label: '失败'
                },
                {
                    value: 'stopping',
                    label: '终止中'
                },
                {
                    value: 'stopped',
                    label: '已终止'
                },
                {
                    value: 'succeeded',
                    label: '成功'
                }
            ]
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
        [DatePicker.name]: DatePicker,
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
            if (this.listType === 'general' && this.searchConditions.timeRange.length) {
                this.searchConditions.executeStartDate = this.searchConditions.timeRange[0];
                this.searchConditions.executeEndDate = this.searchConditions.timeRange[1];
            }
            this.$nextTick(() => {
                this.updateTable();
            });
        },
        resetSearch() {
            this.searchConditions = {
                name: '',
                executeKind: '',
                state: '',
                executeStartDate: '',
                executeEndDate: '',
                timeRange: []
            };
            this.$nextTick(() => {
                this.updateTable();
            });
        },
        init() {
            getSkyflowInfo(this.$route.params.id).then(res => {
                this.skyflowInfo = res;
            });
        },
        updateTable() {
            if (this.listType === 'general') {
                this.$refs.generalRunningTable.initList(true);
            } else {
                this.$refs.timerRunningTable.initList(true);
            }

        }
    }
};
</script>

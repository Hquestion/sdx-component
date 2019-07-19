<template>
    <sdxu-content-panel
        :title="t('view.skyflow.runningInfo')"
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
                    {{ t('view.skyflow.runningRecordList') }}
                </SdxuTabRadioItem>
                <SdxuTabRadioItem
                    name="timer"
                >
                    {{ t('view.skyflow.timerRunningList') }}
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
                    <sdxw-search-item :label="t('view.skyflow.taskName')">
                        <sdxu-input
                            v-model="searchConditions.name"
                            type="search"
                            size="small"
                            :placeholder="t('view.skyflow.enterTaskName')"
                        />
                    </sdxw-search-item>
                </span>
                <span v-else>
                    <sdxw-search-item :label="t('view.skyflow.executeKind')">
                        <el-select
                            v-model="searchConditions.executeKind"
                            :placeholder="t('view.skyflow.enterExecuteKind')"
                        >
                            <el-option
                                :label="t('sdxCommon.All')"
                                value=""
                            />
                            <el-option
                                :label="t('view.skyflow.manual')"
                                value="MANUAL"
                            />
                            <el-option
                                :label="t('view.skyflow.resume')"
                                value="RESUME"
                            />
                        </el-select>
                    </sdxw-search-item>
                    <sdxw-search-item :label="t('view.skyflow.state')">
                        <el-select
                            v-model="searchConditions.state"
                            :placeholder="t('view.skyflow.enterState')"
                        >
                            <el-option
                                v-for="(item, index) in stateList"
                                :key="index"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select>
                    </sdxw-search-item>
                    <sdxw-search-item :label="t('view.skyflow.timeRange')">
                        <el-date-picker
                            v-model="searchConditions.timeRange"
                            type="datetimerange"
                            :range-separator="t('sdxCommon.To')"
                            :start-placeholder="t('view.skyflow.startDate')"
                            :end-placeholder="t('view.skyflow.endDate')"
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
import locale from '@sdx/utils/src/mixins/locale';
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
                    label: this.t('sdxCommon.All')
                },
                {
                    value: 'running',
                    label: this.t('view.task.state.RUNNING')
                },
                {
                    value: 'launching',
                    label: this.t('view.task.state.LAUNCHING')
                },
                {
                    value: 'failed',
                    label: this.t('view.task.state.FAILED')
                },
                {
                    value: 'stopping',
                    label: this.t('view.task.state.KILLING')
                },
                {
                    value: 'stopped',
                    label: this.t('view.task.state.KILLED')
                },
                {
                    value: 'succeeded',
                    label: this.t('view.monitor.componentState.state.succeeded')
                }
            ]
        };
    },
    mixins: [locale],
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
    methods: {
        search() {
            if (this.listType === 'general' && this.searchConditions.timeRange && this.searchConditions.timeRange.length) {
                this.searchConditions.executeStartDate = this.searchConditions.timeRange[0];
                this.searchConditions.executeEndDate = this.searchConditions.timeRange[1];
            } else {
                this.searchConditions.executeStartDate = '';
                this.searchConditions.executeEndDate = '';
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

<template>
    <sdxu-dialog
        :visible.sync="dialogVisible"
        :title="title"
        class="sdxv-version-upgrade"
        width="720px"
    >
        <div v-if="type === 'capacity'">
            <span>{{ `${t('view.task.InstanceNum')}：` }}</span>
            <el-input-number
                v-model="table.instances"
                :min="1"
            />
        </div>
        <sdxu-table
            light
            :data="table"
            align="center"
            header-align="center"
            v-else
        >
            <el-table-column
                prop="versionName"
                :label="t('view.model.Model_Version')"
            >
                <template #default="{row}">
                    <span>{{ row.versionName }}</span>
                    <span
                        v-if="row.state"
                        style="color: #6E7C94"
                    >
                        （{{ row.state }}）
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                prop="instances"
                :label="t('view.model.Instances')"
                v-if="type==='instance'"
            >
                <template
                    #default="{row}"
                    class="instance-input"
                >
                    <el-input-number
                        v-model="row.instances"
                        @change="handleChange(row, row.instances)"
                        :min="0"
                        :max="totalInstance"
                    />
                </template>
            </el-table-column>
            <el-table-column
                prop="trafficRatio"
                :label="t('view.model.Flow_ratio')"
                v-if="type==='traffic'"
            >
                <template #default="{row}">
                    <el-select
                        style="width: 100%"
                        size="small"
                        v-model="row.trafficRatio"
                        @change="changeWeight(row)"
                    >
                        <el-option
                            v-for="item in trafficRatioOptions"
                            :key="item.label"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </template>
            </el-table-column>
        </sdxu-table>
        <div
            slot="footer"
        >
            <SdxuButton
                type="default"
                size="small"
                @click="cancel"
            >
                {{ t('sdxCommon.Cancel') }}
            </SdxuButton>
            <SdxuButton
                type="primary"
                size="small"
                @click="confirm"
            >
                {{ t('sdxCommon.Confirm') }}
            </SdxuButton>
        </div>
    </sdxu-dialog>
</template>

<script>
import locale from '@sdx/utils/src/mixins/locale';
import SdxuTable from '@sdx/ui/components/table';
import SdxuDialog from '@sdx/ui/components/dialog';
import {InputNumber, Select, Option, Message} from 'element-ui';
import { updateService } from '@sdx/utils/src/api/model';
export default {
    name: 'SdxvVersionUpgrade',
    mixins: [locale],
    components: {
        SdxuDialog,
        SdxuTable,
        [Select.name]: Select,
        [Option.name]: Option,
        [InputNumber.name]: InputNumber
    },
    data() {
        return {
            table: [
                {
                    instances: 0,
                    trafficRatio: 0,
                    versionName: '',
                },
                {
                    instances: 0,
                    trafficRatio: 0,
                    versionName: '',
                }
            ],
            saveTable: [],
            trafficRatioOptions: [],
        };
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: ''
        },
        data: {
            type: null,
            default: null
        },
        totalInstance: {
            type: Number,
            default: 0
        }
    },
    computed: {
        dialogVisible: {
            get() {
                return this.visible;
            },
            set(nval) {
                this.$emit('update:visible', nval);
            }
        },
        title() {
            let title = '';
            if(this.type === 'instance') {
                title = this.t('view.model.Instance_adjustment');
            } else if (this.type === 'traffic') {
                title = this.t('view.model.Traffic_assignment');
            } else {
                title = this.t('view.model.Expansion_capacity');
            }
            return title;
        }
    },
    methods: {
        cancel() {
            this.$emit('update:visible', false);
        },
        confirm() {
            let params = null;
            if(this.type === 'capacity') {
                params = {
                    instances: this.table.instances
                };
            } else {
                params = {
                    versionUpgrade: {
                        versionName: this.table[0].versionName,
                        instances: this.table[0].instances,
                        trafficRatio:this.table[0].trafficRatio
                    }
                };
            }
            updateService(Array.isArray(this.data) ? this.data[0].uuid : this.data.uuid, params).then(()=> {
                this.$emit('update:visible', false);
                this.$emit('confirmUpgrade');
                Message({
                    message: this.t('sdxCommon.SettingSuccess'),
                    type: 'success'
                });
            });
        },
        handleChange(row, num) {
            if(row.state.includes(this.t('view.model.New'))) {
                this.table = [
                    row,
                    {
                        state:  this.saveTable[1].state,
                        versionName: this.saveTable[1].versionName,
                        instances: this.totalInstance - num,
                    }];
            } else {
                this.table = [
                    {
                        state:  this.saveTable[0].state,
                        versionName: this.saveTable[0].versionName,
                        instances: this.totalInstance - num
                    },
                    row
                ];
            }
        },
        changeWeight(row) {
            if(row.state.includes(this.t('view.model.New'))) {
                this.table = [
                    row,
                    {
                        state:  this.saveTable[1].state,
                        versionName: this.saveTable[1].versionName,
                        trafficRatio: Number((1 - row.trafficRatio).toFixed(2))
                    }];
            } else {
                this.table = [
                    
                    {
                        state:  this.saveTable[0].state,
                        versionName: this.saveTable[0].versionName,
                        trafficRatio: Number((1 - row.trafficRatio).toFixed(2))
                    },
                    row];
            }
        }
    },
    created() {
        let arr=[];
        for(let i=0; i< 105; i+=5) {
            arr.push(
                {  
                    label: parseInt(i),
                    value: Number((i / 100).toFixed(2))
                }
            );
        }
        this.trafficRatioOptions = arr;
        this.saveTable = JSON.parse(JSON.stringify(this.data));
        this.table = this.saveTable;
    }
};
</script>

<style lang="scss" scoped>
.sdxv-version-upgrade {
    /deep/ {
        .el-input-number {
            height: 24px;
            line-height: 24px;
            width: 120px;
            .input.el-input__inner {
                height: 24px;
                line-height: 24px;
                width: 120px;

            }
            .el-input__inner {
                padding: 0 32px;
                height: 23px;
                border: 1px solid #13264D;
            }
            .el-input-number__decrease,.el-input-number__increase {
                height: 23px;
                line-height: 23px;
                width: 32px;
                background: #13264D;
                .el-icon-plus::before,.el-icon-minus::before {
                    color: #fff;
                    font-weight: 700;
                }
            }
        }
        .el-select {
            width: 90px !important;
            .el-input {
                width: 90px;
                .el-input__inner {
                    padding: 0;
                }
            }
            .el-input--small .el-input__inner,.el-input--small .el-input__icon {
                height: 24px;
                line-height: 24px;
            }
            .el-input__suffix {
                right: 0;
                background: #13264D;
            }
            .el-icon-arrow-up:before {
                color: #fff;
                font-weight: 700;
            }
        }
    }
}
</style>
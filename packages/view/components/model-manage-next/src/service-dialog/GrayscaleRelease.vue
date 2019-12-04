<template>
    <sdxu-dialog
        :visible.sync="dialogVisible"
        :title="t('view.model.New_gray_level_release')"
        class="sdxv-grayscale-release"
        width="720px"
    > 
        <el-form
            ref="form"
            :model="params"
            :label-width="lang$==='en' ? '150px' : '110px'"
            label-position="right"
            :rules="rules"
        >
            <el-form-item
                :label="isModelService ? t('view.model.Model_service_name') : t('view.model.modelVersion')"
                prop="name"
            >
                <el-select
                    style="width: 100%"
                    prop="serviceName"
                    v-model="serviceName"
                >
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item
                :label="`${t('view.task.InstanceNum')}：`"
                prop="name"
            >
                <el-input-number
                    v-model="params.instances"
                    :min="1"
                    :max="isModelService ? (selectModel && selectModel.instances) : (info && info.instances)"
                />
            </el-form-item>
            <el-form-item
                :label="`${t('view.model.Flow_ratio')}：`"
                class="flow-rate"
            >
                <sdxu-table
                    :data="table"
                    light
                >
                    <el-table-column
                        prop="version"
                        :label="t('view.image.Version')"
                    />
                    <el-table-column
                        :label="t('view.model.Weight_ratio')"
                    >
                        <template #default="{row}">
                            <el-select
                                style="width: 100%"
                                size="small"
                                v-model="row.weight"
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
            </el-form-item>
        </el-form>
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
import SdxuDialog from '@sdx/ui/components/dialog';
import {Select, Option,Form, FormItem, InputNumber} from 'element-ui';
import SdxuTable from '@sdx/ui/components/table';
import { nameWithChineseValidator } from '@sdx/utils/src/helper/validate';
import { updateService } from '@sdx/utils/src/api/model';
export default {
    name: 'SdxvGrayscaleRelease',
    mixins: [locale],
    data(){
        return {
            num:1,
            table: [
                {
                    version: '',
                    weight: 0
                },
                {
                    version: '',
                    weight: 0
                }
            ],
            rules: {
                name: [
                    { required: true, message: this.t('view.model.searchModelName'), trigger: 'blur' },
                    { validator: nameWithChineseValidator, trigger: 'blur' }
                ],
            },
            params: {
                instances: 0
            },
            options: [],
            serviceName: '',
            trafficRatio: 0,
            trafficRatioOptions: [],
            saveSelectOptions: []
        };
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        isModelService: {
            type: Boolean,
            default: false
        },
        info: {
            type: Object,
            default:() => {}
        },
        selectOptions: {
            type: Array,
            default:() => {}
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
        selectModel() {
            let arr = this.saveSelectOptions.filter(item => item.uuid === this.serviceName);
            return arr[0];
        },
        
    },
    components: {
        SdxuDialog,
        [Form.name]: Form,
        [FormItem.name]: FormItem,
        [Select.name]: Select,
        [Option.name]: Option,
        [InputNumber.name]: InputNumber,
        SdxuTable
    },
    methods: {
        changeWeight(row) {
            if(this.isModelService) {
                if(row.version.includes(this.t('view.model.New'))) {
                    this.table = [
                        row,
                        {
                            version: `${this.selectModel.versionName} (${this.t('view.model.Old')})`,
                            weight: Number((1 - row.weight).toFixed(2))
                        }];
                } else {
                    this.table = [
                        {
                            version: `${this.info.name} (${this.t('view.model.New')})`,
                            weight: Number((1 - row.weight).toFixed(2))
                        }, 
                        row
                    ];
                }
            } else {
                if(row.version.includes(this.t('view.model.New'))) {
                    this.table = [
                        row,
                        {
                            version: `${this.info.versionName} (${this.t('view.model.Old')})`,
                            weight: Number((1 - row.weight).toFixed(2))
                        }];
                } else {
                    this.table = [
                        {
                            version: `${this.selectModel.name} (${this.t('view.model.New')})`,
                            weight: Number((1 - row.weight).toFixed(2))
                        }, 
                        row
                    ];
                }
            }
        },
        cancel() {
            this.$emit('update:visible', false);
        },
        confirm() {
            let params = {
                versionUpgrade: {
                    versionName: this.isModelService ? this.info.name : this.selectModel.name,
                    instances: this.params.instances,
                    trafficRatio: this.table[0].weight
                }
            };
            updateService(this.serviceName,params).then(() => {
                this.$emit('update:visible', false);
                this.$emit('confirmGray');
            });
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
    },
    watch: {
        selectOptions: {
            deep: true,
            immediate: true,
            handler() {
                this.options = [];
                this.serviceName = '';
                this.saveSelectOptions = JSON.parse(JSON.stringify(this.selectOptions));
                let arr = [];
                for(let i =0; i< this.saveSelectOptions.length; i++) {
                    arr.push({
                        label: this.saveSelectOptions[i].name,
                        value:  this.saveSelectOptions[i].uuid
                    });
                }
                this.options = arr;
                this.serviceName = arr.length ? arr[0].value : '';
            }
        },
        serviceName: {
            deep: true,
            immediate: true,
            handler() {
                if(this.isModelService) {
                    this.table = [
                        {
                            version: `${this.info.name} (${this.t('view.model.New')})`,
                            weight: 0
                        },
                        {
                            version: `${this.selectModel ? this.selectModel.versionName : ''} (${this.t('view.model.Old')})`,
                            weight: 1
                        }
                    ];
                } else {
                    this.table = [
                        {
                            version: `${this.selectModel ? this.selectModel.name : ''} (${this.t('view.model.New')})`,
                            weight: 0
                        },
                        {
                            version: `${this.info ? this.info.versionName : ''} (${this.t('view.model.Old')})`,
                            weight: 1
                        }
                    ];
                }
            }
        },
    }
};
</script>

<style lang="scss" scoped>
.sdxv-grayscale-release {
    .flow-rate {
        /deep/ {
            .el-select {
                width: 90px !important;
            }
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
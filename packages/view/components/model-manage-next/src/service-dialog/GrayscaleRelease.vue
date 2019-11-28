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
                :label="t('view.model.modelVersion')"
                prop="name"
            >
                <el-select
                    style="width: 100%"
                >
                    <el-option
                        v-for="item in modelVersion"
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
                    v-model="num"
                    :min="1"
                    :max="10"
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
                        <template>
                            <el-select
                                style="width: 100%"
                                size="small"
                            >
                                <el-option
                                    v-for="item in modelVersion"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                />
                            </el-select>
                        </template>
                    </el-table-column>
                </sdxu-table>
            </el-form-item>
        </el-form>
    </sdxu-dialog>
</template>

<script>
import locale from '@sdx/utils/src/mixins/locale';
import SdxuDialog from '@sdx/ui/components/dialog';
import {Select, Option,Form, FormItem, InputNumber} from 'element-ui';
import SdxuTable from '@sdx/ui/components/table';
export default {
    name: 'SdxvGrayscaleRelease',
    mixins: [locale],
    data(){
        return {
            modelVersion: [],
            num:1,
            table: [
                {
                    version: 'V 2.0(新)',
                    weight: 40
                },
                {
                    version: 'V 1.0(旧)',
                    weight: 60
                }
            ],
            rules: {

            },
            params: {
                
            }
        };
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
    },
    computed: {
        dialogVisible: {
            get() {
                return this.visible;
            },
            set(nval) {
                this.$emit('update:visible', nval);
            }
        }
    },
    components: {
        SdxuDialog,
        [Form.name]: Form,
        [FormItem.name]: FormItem,
        [Select.name]: Select,
        [Option.name]: Option,
        [InputNumber.name]: InputNumber,
        SdxuTable
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
        }
    }
}
</style>
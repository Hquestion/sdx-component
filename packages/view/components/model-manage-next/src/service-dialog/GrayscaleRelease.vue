<template>
    <sdxu-dialog
        :visible.sync="dialogVisible"
        title="新增灰度发布"
        class="sdxv-grayscale-release"
        width="720px"
    > 
        <el-form
            ref="form"
            :model="params"
            label-width="90px"
            label-position="right"
            :rules="rules"
        >
            <el-form-item
                label="模型版本"
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
                label="实例个数"
                prop="name"
            >
                <el-input-number
                    v-model="num"
                    @change="handleChange"
                    :min="1"
                    :max="10"
                    label="描述文字"
                />
            </el-form-item>
            <el-form-item
                label="流量占比"
                class="flow-rate"
            >
                <sdxu-table
                    :data="table"
                    light
                >
                    <el-table-column
                        prop="version"
                        label="版本"
                    />
                    <el-table-column
                        label="权重占比"
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
            ]
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
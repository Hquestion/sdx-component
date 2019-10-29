<template>
    <div class="sdxv-task-manage-executelist">
        <div class="info">
            <div
                v-for="(item) in infoList"
                :key="item.title"
            >
                <div>
                    <div class="total">
                        {{ item.total }}
                    </div>
                    <div class="title">
                        {{ item.title }}
                    </div>
                    <div class="progress">
                        <span>手动</span>
                        <el-progress
                            :percentage="50"
                            :show-text="false"
                        />
                        <span>调度</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="condition">
            <SdxwSearchLayout>
                <SdxwSearchItem label="类型:">
                    <el-select
                        size="medium"
                    >
                        <el-option />
                    </el-select>
                </SdxwSearchItem>
                <SdxwSearchItem label="状态">
                    <el-select
                        size="medium"
                    >
                        <el-option />
                    </el-select>
                </SdxwSearchItem>
                <SdxwSearchItem label="状态">
                    <el-select
                        size="medium"
                    >
                        <el-option />
                    </el-select>
                </SdxwSearchItem>
                
                <SdxwSearchItem label="时间">
                    <el-date-picker
                        type="monthrange"
                        range-separator="-"
                        start-placeholder="开始月份"
                        end-placeholder="结束月份"
                        size="medium"
                    />
                </SdxwSearchItem>
                <SdxwSearchItem label="状态">
                    <el-select
                        size="medium"
                    >
                        <el-option />
                    </el-select>
                </SdxwSearchItem>
            </SdxwSearchLayout>
        </div>
        <div class="table">
            <sdxu-table>
                <el-table-column
                    :data="table"
                    :label="'任务名称'"
                />
                <el-table-column
               
                    :label="'类型'"
                /> 
                <el-table-column
               
                    :label="'配置GPU'"
                /> 
                <el-table-column
               
                    :label="'配置内存'"
                />
                <el-table-column
               
                    :label="'配置GPU'"
                />
                <el-table-column
               
                    :label="'创建人'"
                />
                <el-table-column
               
                    :label="'所属组'"
                />
                <el-table-column
               
                    :label="'创建时间'"
                />
                <el-table-column
                    :label="t('sdxCommon.Operation')"
                >
                    <template #default="{ row }">
                        <sdxu-icon-button
                            icon="sdx-icon sdx-icon-delete"
                            :title="t('sdxCommon.Delete')"
                        />
                    </template>
                </el-table-column>
            </sdxu-table>
        </div>
    </div>
</template>

<script>
import SdxwSearchLayout from '@sdx/widget/components/search-layout';
import SdxuTable from '@sdx/ui/components/table';
import locale from '@sdx/utils/src/mixins/locale';
import { Row, Col, Progress } from 'element-ui';
export default {
    name: 'SdxvExecutelist',
    data() {
        return {
            infoList: [
                {
                    total: 123,
                    title: '执行总数',
                    manual: 63,
                    dispatch: 60
                },
                {
                    total: 123,
                    title: '执行总数',
                    manual: 63,
                    dispatch: 60
                },
                {
                    total: 123,
                    title: '执行总数',
                    manual: 63,
                    dispatch: 60
                },
                {
                    total: 123,
                    title: '执行总数',
                    manual: 63,
                    dispatch: 60
                },
                {
                    total: 123,
                    title: '执行总数',
                    manual: 63,
                    dispatch: 60
                },
            ]
        };
    },
    mixins: [locale],
    components: {
        [SdxwSearchLayout.SearchLayout.name]: SdxwSearchLayout.SearchLayout,
        [SdxwSearchLayout.SearchItem.name]: SdxwSearchLayout.SearchItem,
        SdxuTable,
        [Row.name]: Row,
        [Col.name]: Col,
        [Progress.name]: Progress
    },
};
</script>

<style lang="scss" scoped>
.sdxv-task-manage-executelist {
    .panel {
        background: #FFFFFF;
        box-shadow: 0 2px 4px 0 #C2CDDE;
        border-radius: 2px;
    }
    .condition {
        margin-bottom: 24px;
        .sdxw-search-layout {
            @extend .panel;
        }
    }
    .info {
        margin:0  -12px;
        height: 152px;
        margin-bottom: 24px;
        &>div {
            width: 20%;
            text-align: center;
            padding: 0 12px;
            height: 152px;
            float: left;
            &>div {
                height: 152px;
                @extend .panel;
                .total {
                    font-size: 40px;
                    color: #1144AB;
                    height: 80px;
                    line-height: 72px;
                    padding-top: 10px;
                }
                .title {
                    display: inline-block;
                    background: #DEEBFF;
                    border-radius: 2px;
                    height: 24px;
                    line-height: 24px;
                    padding: 0 8px;
                    margin-bottom: 10px;
                }
                .progress {
                    span {
                        font-size: 12px;
                        color: #6E7C94;
                    }
                }
            }
        }
        & /deep/ {
            .el-progress {
                display: inline-block;
                width: calc(100% - 116px);
                margin: 0 6px;
            }
        }
    }
    .table {
        @extend .panel;
        padding: 24px;
        height: calc(100vh - 302px);
    }
}
</style>
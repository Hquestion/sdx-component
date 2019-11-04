import SdxuTable from '@sdx/ui/components/table';
import SdxwSearchLayout from '@sdx/widget/components/search-layout';
import SdxuPagination from '@sdx/ui/components/pagination';
import SdxuInput from '@sdx/ui/components/input';
import SdxuButton from '@sdx/ui/components/button';
import { dateFormatter } from '@sdx/utils/src/helper/transform';
import SdxwFoldLabel from '@sdx/widget/components/fold-label';
import SdxuIconButtonGroup from '@sdx/ui/components/icon-button-group';

import ElTableColumn from 'element-ui/lib/table-column';
import ElSelect from 'element-ui/lib/select';
import ElOption from 'element-ui/lib/option';
import ElDatePicker from 'element-ui/lib/date-picker';
import { STATE_TYPE, STATE_TYPE_LABEL, STATE_MAP_FOLD_LABEL_TYPE, TASK_TYPE, TASK_TYPE_LABEL, TASK_POLLING_STATE_TYPE, STATE_TYPE_OPERATION, SPECIAL_TASK_TYPE, MONITOR_ALLOW_OPERATION, OPERATION_INFO } from '@sdx/utils/src/const/task';

export default {
    components: {
        [SdxwSearchLayout.SearchLayout.name]: SdxwSearchLayout.SearchLayout,
        [SdxwSearchLayout.SearchItem.name]: SdxwSearchLayout.SearchItem,
        [SdxwFoldLabel.FoldLabel.name]: SdxwFoldLabel.FoldLabel,
        [SdxwFoldLabel.FoldLabelGroup.name]: SdxwFoldLabel.FoldLabelGroup,
        SdxuTable,
        SdxuPagination,
        SdxuInput,
        SdxuIconButtonGroup,
        SdxuButton,
        ElDatePicker,
        ElTableColumn,
        ElSelect,
        ElOption
    },
    data() {
        this.STATE_TYPE_LABEL = STATE_TYPE_LABEL;
        this.TASK_TYPE_LABEL = TASK_TYPE_LABEL;
        this.STATE_MAP_FOLD_LABEL_TYPE = STATE_MAP_FOLD_LABEL_TYPE;
        return {
            taskName: '',
            creator: '',
            page: 1,
            pageSize: 10,
            total: 0
        };
    },
    methods: {
        handlePageChange(page) {
            this.page = page;
        },
        stateIcon() {
            let icon = '';
            if (!this.task) {
                icon = '';
            } else if ([STATE_TYPE.LAUNCHING, STATE_TYPE.RUNNING, STATE_TYPE.KILLING].includes(this.task.state)) {
                icon = 'loading';
            } else if ([STATE_TYPE.FAILED, STATE_TYPE.LAUNCH_ABNORMAL].includes(this.task.state)) {
                icon = 'warning';
            }
            return icon;
        },
        dealTime(startTime, endTime) {
            if (!startTime) {
                return '';
            }
            let t1 = startTime; // this.task.running_at
            let t2 = endTime || new Date(); // this.task.stopped_at
            let usedTime = (new Date(t2)).valueOf() - (new Date(t1)).valueOf(); // 两个时间戳相差的毫秒数
            usedTime = usedTime < 0 ? 0 : usedTime;
            let days = Math.floor(usedTime / (24 * 3600 * 1000));
            // 计算出小时数
            let leave1 = usedTime % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
            let hours = Math.floor(leave1 / (3600 * 1000));
            // 计算相差分钟数
            let leave2 = leave1 % (3600 * 1000); // 计算小时数后剩余的毫秒数
            let minutes = Math.floor(leave2 / (60 * 1000));
            // 计算相差秒
            let leave3 = leave2 % (60 * 1000);
            let second = Math.floor(leave3 / 1000);
            let time = '';

            if (days > 0) {
                time += days + 'd';
            }
            if (hours > 0) {
                time += hours + 'h';
            }
            if (minutes > 0) {
                time += minutes + 'm';
            }
            if (second > 0) {
                time += second + 's';
            }

            return time;
        },
        formatDate(date) {
            return dateFormatter(date);
        },
        getOperationList(row, isMonitor = false, hideDetail = false) {
            let list = STATE_TYPE_OPERATION[row.state] || [];
            let isSkyflowExec = row.type === TASK_TYPE.SKYFLOW_EXEC;
            let isSecialTask = SPECIAL_TASK_TYPE.includes(row.type) && list.indexOf('edit') !== -1;
            if (isMonitor) {
                list = list.filter(item => {
                    return MONITOR_ALLOW_OPERATION.includes(item);
                });
            }

            list = list.filter(item => {
                return (isSkyflowExec ? item !== 'detail' : item !== 'entry')
                && (isSecialTask ? item !== 'edit' : true)
                && (hideDetail ? item !== 'detail' : true);
            });

            return list.map(item => {
                return OPERATION_INFO[item];
            });
        },
    },
};
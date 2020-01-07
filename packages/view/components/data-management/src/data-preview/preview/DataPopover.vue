<template>
    <el-popover
        :trigger="trigger"
        :visible-arrow="false"
        v-bind="$attrs"
        v-on="$listeners"
        popper-class="sdxv-dataset-preview-popover"
    >
        <div>
            <div>
                <span>Min:</span>
                <span>{{ info.min != null ? info.min : '-' }}</span>
            </div>
            <div>
                <span>Max:</span>
                <span>{{ info.max != null ? info.max : '-' }}</span>
            </div>
            <div>
                <span>Count:</span>
                <span>{{ info.count != null ? info.count : '-' }}</span>
            </div>
            <div>
                <span>Mean:</span>
                <span>{{ info.mean != null ? info.mean : '-' }}</span>
            </div>
            <div>
                <span>Unique Values:</span>
                <span>{{ info.unique != null ? info.unique : '-' }}</span>
            </div>
            <div>
                <span>StDev:</span>
                <span>{{ info.std != null ? info.std : '-' }}</span>
            </div>
        </div>
        <slot
            name="ref"
            slot="reference"
        />
    </el-popover>
</template>

<script>
import {Popover} from 'element-ui';
export default {
    name: 'SdxvDataPopper',
    props: {
        trigger: {
            type: String,
            default: 'hover' 
        },
        disabled: {
            type: Boolean,
            default: false
        },
        info: {
            type: Object,
            default: () => {}
        },
    },
    components: {
        [Popover.name]: Popover
    },
};
</script>

<style lang="scss" scoped>
.sdxv-dataset-preview-popover {
    div {
        font-size: 12px;
        div {
            display: flex;
            height: 26px;
            span:first-child {
                color: #13264D;
                text-align: right;
                min-width: 84px;
                margin-right: 10px;
            }
            span:last-child {
                color: #1144AB;;
            }
        }
    }
}
</style>

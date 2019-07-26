<template>
    <span>
        <el-popover
            class="sdxu-text-tooltip"
            placement="bottom"
            effect="light"
            trigger="hover"
            popper-class="sdxu-text-tooltip__popper"
            v-if="tooltip || (content && content.length > 0)"
        >
            <div>
                <template v-if="tipType === 'text'">
                    {{ tooltip }}
                </template>
                <template v-else>
                    <span
                        class="sdxu-text-tooltip__item"
                        v-for="(item, index) in content"
                        :key="index"
                    >
                        {{ typeof item === 'string' ? item : item[contentKey] }}{{ (index !== content.length - 1) ? ',' : '' }}
                    </span>
                </template>
            </div>
            <span
                slot="reference"
                class="sdxu-text-tooltip__main"
                :style="overflowStyle"
            >
                <slot>
                    {{ text }}
                </slot>
            </span>
        </el-popover>
        <template v-else>
            <slot>
                {{ text }}
            </slot>
        </template>
    </span>
</template>

<script>
import ElPopover from 'element-ui/lib/popover';
import {isObjectArray, isString, isStringArray} from '@sdx/utils/src/helper/tool';

export default {
    name: 'SdxuTextTooltip',
    data() {
        return {};
    },
    components: {
        ElPopover
    },
    props: {
        content: {
            type: [Array, String],
            default: ''
        },
        contentKey: {
            type: String,
            default: 'label'
        },
        line: {
            type: Number,
            default: 1
        },
        title: {
            type: String,
            default: ''
        },
        tipType: {
            type: String,
            default: 'text' // text / inline-block
        }
    },
    computed: {
        text() {
            if (this.content) {
                if (isString(this.content)) {
                    return this.content;
                } else {
                    if (isStringArray(this.content)) {
                        return this.content.join(',');
                    } else if (isObjectArray(this.content)) {
                        return this.content.map(item => item[this.contentKey]).join(',');
                    }
                }
            }
            return '';
        },
        tooltip() {
            return this.title || this.text;
        },
        overflowStyle() {
            if (this.line === 1) {
                return {
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis'
                };
            } else {
                return {
                    overflow: 'hidden',
                    wordBreak: 'break-all',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    '-webkit-line-clamp': this.line,
                    '-webkit-box-orient': 'vertical'
                };
            }
        }
    }
};
</script>

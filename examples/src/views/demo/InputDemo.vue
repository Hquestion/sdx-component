<template>
    <div class="sdx-demo">
        <sdxu-input
            placeholder="search： small"
            :searchable="true"
            size="small"
            @blur="handleBlur"
            v-model="value"
        >
            <template #prefix>
                <i class="sdxu-input__icon el-icon-date" />
            </template>
        </sdxu-input>
        <sdxu-input
            placeholder="maxlength"
            size="small"
            @blur="handleBlur"
            v-model="value"
            maxlength="10"
            show-word-limit
        >
            <!-- <template #prefix>
                <i class="sdxu-input__icon el-icon-date" />
            </template> -->
        </sdxu-input>
        <sdxu-input
            placeholder="search：regular"
            :searchable="true"
            @blur="handleBlur"
            v-model="value"
        >
            <template #prefix>
                <i class="sdxu-input__icon el-icon-date" />
            </template>
        </sdxu-input>
        <sdxu-input
            placeholder="textarea"
            size="regular"
            @blur="handleBlur"
            v-model="value"
            type="textarea"
        >
            <template #prefix>
                <i class="sdxu-input__icon el-icon-date" />
            </template>
        </sdxu-input>
        <sdxu-input
            placeholder="password"
            :searchable="true"
            size="small"
            @blur="handleBlur"
            v-model="value"
            type="password"
            :password-strength="true"
            :password-visibleness="true"
        >
            <template #prefix>
                <i class="sdxu-input__icon el-icon-date" />
            </template>
        </sdxu-input>

        <el-input
            placeholder="element ui： password"
            :searchable="true"
            size="small"
            @blur="handleBlur"
            v-model="value"
            type="password"
            show-password
        >
            <template #prefix>
                <i class="sdxu-input__icon el-icon-date" />
            </template>
        </el-input>
        <el-input
            placeholder="element ui： maxlength"
            size="small"
            @blur="handleBlur"
            v-model="value"
        >
            <template #prefix>
                <i class="sdxu-input__icon el-icon-date" />
            </template>
        </el-input>
    </div>
</template>

<script>
import SdxuInput from '@sdx/ui/components/input';

export default {
    name: 'InputDemo',
    components: {
        SdxuInput
    },
    data() {
        return {
            value: ''
        };
    },
    methods: {
        handleBlur() {
            window.console.error('blur', this.value);
        }
    }
};
</script>

<style>

</style>

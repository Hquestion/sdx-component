<template>
    <div class="sdxui-input">
        <div>
            <SdxuInput placeholer="请输入关键字" v-model="value" :searchable="true" size="small"></SdxuInput>
        </div>
        <div>
            <SdxuInput placeholer="请输入关键字" v-model="value" :searchable="true" size="regular"></SdxuInput>
        </div>
        <div>
            <SdxuInput placeholer="请输入密码" v-model="value" type="password"></SdxuInput>
        </div>
        <div>
            <SdxuInput placeholer="请输入密码" v-model="value" type="password" :password-strength="true"></SdxuInput>
        </div>
        <div>
            <SdxuInput placeholer="请输入密码" v-model="value" type="password" :password-visibleness="true"></SdxuInput>
        </div>
    </div>
</template>

<script>
import SdxuInput from '@sdx/ui/components/input';
export default {
    name: 'InputDemo',
    data() {
        return {
            value: ''
        };
    },
    components: {
        SdxuInput
    }
}
</script>

<style lang="scss" scoped>
    .sdxui-input {
        & > div {
            margin: 20px;
        }
    }
</style>

<template>
    <div class="sdxu-transfer">
        <el-transfer
            v-model="value"
            :data="data"
        />
        <div>
            fasf
        </div>
    </div>
</template>

<script>
export default {
    name: 'SdxuTransfer',
    data() {
        const generateData = _ => {
            const data = [];
            for (let i = 1; i <= 15; i++) {
                data.push({
                    key: i,
                    label: `备选项 ${ i }`,
                    disabled: i % 4 === 0
                });
            }
            return data;
        };
        return {
            data: generateData(),
            value: [1, 4]
        };
    },
    methods: {
        // handleChange(value, direction, movedKeys) {
        //     console.log(value, direction, movedKeys);
        // }
    }
};
</script>

<style lang="scss" scoped>

</style>

<template>
  <sdxu-radial-progress :diameter="200"
                       :completed-steps="5"
                       :total-steps="10">
    <p>Total steps: 10</p>
    <p>Completed steps: 5</p>
  </sdxu-radial-progress>
</template>

<script>
import RadialPregress from '@sdx/ui/components/radial-progress';
export default {
    name: 'RadialProgress',
    data() {
        return {};
    },
    components: {
        [RadialPregress.name]: RadialPregress
    }
}
</script>

<style lang="scss" scoped>
</style>

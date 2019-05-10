<template>
    <div>
       <img :src="imgUrl" alt="">
    </div>
</template>

<script>

export default {
    
    data () {
        return {
            imgUrl:require("../../../public/view/privilege.png")
        };
    }
};
</script>

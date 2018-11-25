<template>
    <div class="goodscomments-container">
        <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>
import comments from '../../components/comments'

export default {
    data() {
        return {
            id:this.$route.params.id
        }
    },
    components:{
        'cmt-box':comments
    }
}
    
</script>

<style lang="less">
    .goodscomments-container{
        padding: 0 5px;
    }
</style>
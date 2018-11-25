<template>
    <mt-swipe :auto="4000">
        <!-- <mt-swipe-item>1</mt-swipe-item>
        <mt-swipe-item>2</mt-swipe-item>
        <mt-swipe-item>3</mt-swipe-item> -->
        <mt-swipe-item v-for="(item,index) in lunBoList" :key="index">
            <a :href="item.url">
                <img :src="item.img" :class="{ full:isfull }">
            </a>
        </mt-swipe-item>
    </mt-swipe>
</template>

<script>

export default {
    props:[
        'lunBoList',
        'isfull'
    ]
}
</script>


<style lang="less">
.mint-swipe {
  height: 200px;
  a {
    display: block;
    width: 100%;
    height: 100%;
    img {
      display: block;
    //   width: 100%;
    }
    .full{
        width: 100%;
    }
  }
}
</style>
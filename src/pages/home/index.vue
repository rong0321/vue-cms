<template>
    <div class="home-container">
        <mt-swipe :auto="4000">
            <!-- <mt-swipe-item>1</mt-swipe-item>
            <mt-swipe-item>2</mt-swipe-item>
            <mt-swipe-item>3</mt-swipe-item> -->
            <mt-swipe-item v-for="(item,index) in lunBoList" :key="index">
                <a :href="item.url">
                    <img :src="item.img">
                </a>
            </mt-swipe-item>
        </mt-swipe>

        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../assets/images/menu1.png">
                    <div class="mui-media-body">新闻资讯</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../assets/images/menu2.png">
                    <div class="mui-media-body">图片分享</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../assets/images/menu3.png">
                    <div class="mui-media-body">商品购买</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../assets/images/menu4.png">
                    <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../assets/images/menu5.png">
                    <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../assets/images/menu6.png">
                    <div class="mui-media-body">联系我们</div></a></li>
        </ul> 
    </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      lunBoList: null
    };
  },
  created() {
    this.getlunbo();
  },
  methods: {
    getlunbo() {
      this.$http
        .get("http://www.lovegf.cn:8899/api/getlunbo")
        .then(result => {
          //   console.log(result.body);
          if (result.body.status === 0) {
            this.lunBoList = result.body.message;
          }
        })
        .catch(err => {
          Toast({
            message: "获取信息失败!",
            position: "bottom"
          });
        });
    }
  }
};
</script>

<style lang="less">
.home-container {
  .mint-swipe {
    height: 200px;
    a {
      display: block;
      width: 100%;
      height: 100%;
      img {
        display: block;
        width: 100%;
      }
    }
  }
  .mui-grid-view {
    border: none;
    background-color: #fff;
    .mui-table-view-cell {
      border: none;
      img{
          width: 70%;
          height: 70%;
      }
      .mui-media-body{
          font-size: 13px
      }
    }
  }
}
</style>
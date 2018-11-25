<template>
    <div class="home-container">
        <!-- 轮播图 -->
        <swiper :lunBoList="lunBoList" :isfull='fullFlag'></swiper>

        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
              <router-link to="/home/newslist">
                <img src="../../assets/images/menu1.png">
                <div class="mui-media-body">新闻资讯</div>
              </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
              <router-link to="/home/photolist">
                    <img src="../../assets/images/menu2.png">
                    <div class="mui-media-body">图片分享</div>
              </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
              <router-link to="/home/goodslist">
                <img src="../../assets/images/menu3.png">
                <div class="mui-media-body">商品购买</div>
              </router-link>
            </li>
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
import swiper from '../../components/swiper'

export default {
  data() {
    return {
      lunBoList: null,
      fullFlag:true
    };
  },
  created() {
    this.getlunbo();
  },
  methods: {
    getlunbo() {
      this.$http
        .get("api/getlunbo")
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
  },
  components:{
    swiper
  }
};
</script>

<style lang="less">
.home-container {
  .mui-grid-view {
    border: none;
    background-color: #fff;
    .mui-table-view-cell {
      border: none;
      img {
        width: 70%;
        height: 70%;
      }
      .mui-media-body {
        font-size: 13px;
      }
    }
  }
}
</style>
<template>
    <div class="photoList-container">
        <!-- 顶部分类导航 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="{'mui-control-item':true,'mui-active':item.id == 0}" v-for="item in categoriesList" :key="item.id" @click="getimages(item.id)">
                        {{item.title}}
                    </a>
                </div>
            </div>
        </div>
        <!-- 列表数据 -->
        <ul>
            <router-link tag="li" :to="'/home/photoInfo/' + item.id" v-for="item in imagesList" :key="item.id">
                <img v-lazy="item.img_url" >
                <div class="imageInfo-box">
                    <div class="imageTitle">
                        {{item.title}}
                    </div>
                    <div class="imagedesc">
                        {{item.zhaiyao}}
                    </div>
                </div>
             </router-link>
        </ul>
    </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.js";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      categoriesList: [],
      imagesList: []
    };
  },
  created() {
    this.getAllCategories();
    this.getimages(0);
  },
  methods: {
    //获取顶行分类
    getAllCategories() {
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status === 0) {
          result.body.message.unshift({ id: 0, title: "全部" });
          this.categoriesList = result.body.message;
        } else {
          Toast("获取图片分类失败!");
        }
      });
    },
    getimages(id) {
      this.$http.get("api/getimages/" + id).then(result => {
        if (result.body.status === 0) {
          this.imagesList = result.body.message;
        }
      });
    }
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  }
};
</script>


<style lang="less">
* {
  touch-action: pan-y;
}
.photoList-container {
  ul {
    padding: 5px 5px 0;
    li {
      margin-bottom: 10px;
      width: 100%;
      height: 300px;
      box-shadow: 0 0 9px #999;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
      .imageInfo-box{
          position: absolute;
          bottom: 0;
          background-color: rgba(0,0,0,.4);
          color: #ffffff;
          max-height: 85px;
          .imageTitle{
              font-size: 13px;

          }
          .imagedesc{
              font-size: 12px
          }
      }
    }
  }
}
</style>
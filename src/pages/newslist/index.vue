<template>
    <div class="news-list-container">
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media"  v-for="item in newsList" :key="item.id">
                <router-link :to="'/home/newsInfo/' + item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h4 class="title mui-ellipsis">{{item.title}}</h4>
                        <p>
                            <span class="ctime">发表时间:{{ item.add_time | dateFormat("YYYY-MM-DD") }}</span>
                            <span class="clickCount">点击:{{item.click}}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>


<script>
import {Toast} from 'mint-ui'

export default {
  created() {
    this.getNewsList();
  },
  data() {
    return {
      newsList: []
    };
  },
  methods: {
    getNewsList() {
      this.$http.get("api/getnewslist").then(
        result => {
          if (result.body.status === 0) {
            this.newsList = result.body.message;
            // console.log(result.body)
          }
        },
        err => {
          Toast({
            message: "获取信息失败!",
            position: "bottom"
          });
        }
      );
    }
  }
};
</script>


<style lang="less">
.news-list-container {
  .mui-table-view {
    .mui-table-view-cell {
      .title {
        font-size: 14px;
        font-weight: 700;
        margin: 5px 0;
      }
      p {
        display: flex;
        justify-content: space-between;
        .ctime,
        .clickCount {
          font-size: 12px;
          color: #0094ff;
        }
      }
    }
  }
}
</style>
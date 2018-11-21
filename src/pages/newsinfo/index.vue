<template>
    <div class="news-info-container">
        <h3 class="title">{{newsInfo.title}}</h3>
        <p class="subtitle">
            <span class="ctime">发表时间:{{newsInfo.add_time}}</span>
            <span class="click">点击:{{newsInfo.click}}次</span>
        </p>
        <hr>
        <div class="newsInfo-content" v-html="newsInfo.content">

        </div>

        <!-- 评论组件 -->
        <comments-box :id='id'></comments-box>
    </div>
</template>

<script>
import { Toast } from "mint-ui";
import comments from '../../components/comments'
export default {
  data() {
    return {
      id: this.$route.params.id,
      newsInfo: {}
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      this.$http
        .get("api/getnew/" + this.id)
        .then(result => {
          if (result.body.status === 0) {
            // console.log(result)
            this.newsInfo = result.body.message[0];
          } else {
            Toast("获取信息失败");
          }
        })
        .catch(err => {
          Toast("获取信息失败");
        });
    }
  },
  components:{
      'comments-box':comments
  }
};
</script>

<style lang="less">
.news-info-container {
  padding: 0 4px;
  .title {
    font-size: 16px;
    color: red;
    text-align: center;
    margin: 15px 0;
    font-weight: 700;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    .ctime,
    .click {
      color: #0094ff;
      font-size: 13px;
    }
  }
  .newsInfo-content {
    p {
      margin-bottom: 10px;
    }
  }
}
</style>
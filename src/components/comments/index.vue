<template>
    <div class="comments-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入想评论的内容(不超过150字)" maxlength="150"></textarea>
        <mt-button type="primary" size='large'>发表评论</mt-button>
        <div class="comments-list">
            <div class="comments-item" v-for="(item,i) in commentsList" :key="item.add_time">
                <div class="commentsList-header">
                    <span class="nickname">第{{i+1}}楼&nbsp;&nbsp;用户:{{item.user_name}}</span> <span class="addTime">发表时间:{{item.add_time | dateFormat}}</span>
                </div>
                <div class="commentsList-body">
                    {{item.content === 'undefined' ? '此用户很懒,啥都没说' : item.content}}
                </div>
            </div>
            
        </div>
        <mt-button type="danger" size='large' plain @click="getMore">加载更多</mt-button>
    </div>  
</template>

<script>
import { Toast } from "mint-ui";
export default {
  props: ["id"],
  data() {
    return {
      pageIndex: 1,
      commentsList: []
    };
  },
  created() {
    this.getCommentsList();
  },
  methods: {
    getCommentsList() {
      this.$http
        .get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
        .then(result => {
          if (result.body.status === 0) {
            // console.log(result.body);
            this.commentsList = this.commentsList.concat(result.body.message);
          } else {
            Toast("获取评论失败!");
          }
        });
    },
    getMore() {
      this.pageIndex++;
      this.getCommentsList();
    }
  }
};
</script>

<style lang="less">
.comments-container {
  margin: 5px 0;
  h3 {
    font-size: 18px;
    font-weight: 700;
  }
  textarea {
    height: 85px;
    font-size: 14px;
    padding: 8px;
  }
  .comments-list {
    margin: 5px 0;
    .comments-item {
      .commentsList-header {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        line-height: 30px;
        background-color: #ccc;
      }
      .commentsList-body {
        font-size: 13px;
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>
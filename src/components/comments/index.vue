<template>
    <div class="comments-container">
        <h3>发表评论</h3>
        <hr>
        <textarea v-model="commentContent" placeholder="请输入想评论的内容(不超过150字)" maxlength="150"></textarea>
        <mt-button @click="postComment" type="primary" size='large'>发表评论</mt-button>
        <div class="comments-list">
            <div class="comments-item" v-for="(item,i) in commentsList" :key="i">
                <div class="commentsList-header">
                    <span class="nickname">第{{i+1}}楼&nbsp;&nbsp;用户:{{item.user_name}}</span> <span class="addTime">发表时间:{{item.add_time | dateFormat}}</span>
                </div>
                <div class="commentsList-body">
                    {{item.content === 'undefined' ? '此用户很懒,啥都没说' : item.content || '此用户很懒,啥都没说'}}
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
      commentsList: [],
      commentContent:''
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
    },
    postComment() {
      if( this.commentContent.trim() === ''){
        return Toast('请输入评论内容')
      }
      this.$http.post('api/postcomment/' + this.id,{content:this.commentContent}).then(result => {
        // console.log(result);
        if(result.body.status === 0){
          //两种方法,1.将pagesize和commentList重置为1和[] 然后发送get请求评论,但此种方法只能重新看到第一页
          //2.将新评论插入现有的commentList的第一项,不需重新请求,且此种方法能保持以前翻看的评论页数   个人感觉第二种用户体验好
          Toast(result.body.message)
          // this.commentsList.unshift(this.commentContent)
          this.pageIndex = 1
          this.commentsList = []
          this.getCommentsList()
          this.commentContent =''

        }else{
          Toast('评论失败!请重试')
        }
      })
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
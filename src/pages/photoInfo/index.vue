<template>
    <div class="photoInfo-container">
        <h1>{{photoInfo.title}}</h1>
        <p class="subtitle">
            <span>发表时间:{{ photoInfo.add_time | dateFormat }}</span>
            <span>点击:{{ photoInfo.click }}次</span>
        </p>
        <hr>

        <!-- 缩略图 -->
        <img class="preview-img" v-for="(item, index) in list" :key="index" :src="item.src" height="100" @click="$preview.open(index, list)">

        <!-- 内容 -->
        <div class="content" v-html="photoInfo.content">
                
        </div>

        <!-- 评论组件 -->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>
import comments from '../../components/comments'
import {Toast} from 'mint-ui'


export default {
    data(){
        return{
            id:this.$route.params.id,
            photoInfo:{},
            list:[]
        }
    },
    created () {
        this.getImageInfo()
        this.getthumimages()
    },
    methods:{
        getImageInfo(){
            this.$http.get('api/getimageInfo/'+this.id).then(result => {
                if(result.body.status === 0){
                    this.photoInfo = result.body.message[0]
                }else{
                    Toast("获取图片详情失败!")
                }
            })
        },
        getthumimages(){
            this.$http.get('api/getthumimages/'+ this.id).then(result => {
                if(result.body.status === 0){
                    result.body.message.forEach(item => {
                        item.h = 400
                        item.w = 600
                    });
                    this.list = result.body.message
                }
            })
        }
    },
    components:{
        'cmt-box':comments
    }
}
    

</script>

<style lang="less">
    .photoInfo-container{
        padding: 5px;
        h1{
            margin: 18px 0;
            font-size: 15px;
            text-align: center;
            color: #26a2ff;
        }
        .subtitle{
            display: flex;
            justify-content: space-between;
            font-size: 13px;
        }
        .content{
            font-size: 13px;
            line-height: 30px;
        }
    }
</style>
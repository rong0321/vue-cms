<template>
    <div class="goodsList-container">
        <router-link :to="'/home/goodsinfo/' + item.id" class="goods-item" v-for="item in allGoodsList" :key="item.id">
            <img :src="item.img_url">
            <div class="info">
                <h1>{{item.title}}</h1>
                <p class="price">
                    <span class="now">¥{{item.sell_price}}</span>
                    <span class="old"><del>¥{{item.market_price}}</del></span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </router-link>

        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'

export default {
    data() {
        return {
            pageindex:1,
            allGoodsList:[]
        }
    },
    created() {
        this.getAllGoodsList()
    },  
    methods: {
        getAllGoodsList(){
            this.$http.get('api/getgoods?pageindex='+this.pageindex).then(result => {
                // console.log(result);
                if(result.body.status === 0){
                    this.allGoodsList = this.allGoodsList.concat(result.body.message)
                    if(result.body.message.length == 0){
                        Toast('没有更多信息了')
                    }
                }
            })
        },
        getMore() {
            this.pageindex++
            this.getAllGoodsList()
        }
    }
}


</script>


<style lang="less">
.goodsList-container {
  padding: 5px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #cccccc;
    margin: 4px 0;
    padding: 0 2px;
    min-height: 293px;
    position: relative;
    img {
      width: 100%;
    }
    .info {
      position: absolute;
      bottom: 0;
      left: 0;
      h1 {
        font-size: 14px;
        font-weight: 700;
      }
      .price {
        margin-top: 6px;
        background-color: #eee;
        padding: 0 4px;
        .now {
          font-size: 16px;
          font-weight: 700;
          color: red;
        }
        .old {
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        margin-bottom: 3px;
        font-size: 13px;
        padding: 4px;
        background-color: #eee;
      }
    }
  }
}
</style>
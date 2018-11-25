<template>
    <div class="goodsInfo-container">
        <!-- 轮播图 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :lunBoList='lunbotuList' :isfull='fullFlag'></swiper>
                </div>
            </div>
        </div>

        <!-- 小球动画 -->

        <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        name='myBall'>
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>

        <!-- 商品名称 -->
        <div class="mui-card">
            <div class="mui-card-header">商品名称:{{ goodsInfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="buyInfo">
                        <p class="price">
                            <span class="market_price">市场价:&nbsp;<del>¥{{goodsInfo.market_price}}</del></span>
                            <span class="sell_price">销售价:&nbsp;<b>¥{{goodsInfo.sell_price}}</b></span>
                        </p>
                        <div class="number">
                            购买数量:&nbsp;&nbsp;
                            <ul>
                                <li><input type="button" value="-" @click="reduce"></li>
                                <li><input type="text" v-model="num" @blur="check"></li>
                                <li><input type="button" value="+" @click="increase"></li>
                            </ul>
                        </div>
                        <mt-button type='primary'>立即购买</mt-button>
                        <mt-button type='danger' @click="addCar">加入购物车</mt-button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 商品参数 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="subInfo">
                        <p>商品货号:{{goodsInfo.goods_no}}</p>
                        <p>库存情况:{{goodsInfo.stock_quantity}}</p>
                        <p>上架时间:{{ goodsInfo.add_time | dateFormat }}</p>
                    </div>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type='primary' size="large" plain @click="getDesc">图文介绍</mt-button>
                <mt-button type='danger' size="large" plain @click="goodsComments">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>


<script>
import swiper from "../../components/swiper";

export default {
  data() {
    return {
      lunbotuList: [],
      id: this.$route.params.id,
      fullFlag: false,
      num: 1,
      goodsInfo:{},
      ballFlag:false
    };
  },
  created() {
    this.getlunbotu();
    this.getGoodsInfo()
  },
  methods: {
    getlunbotu() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          result.body.message.forEach(item => {
            item.img = item.src;
          });
          this.lunbotuList = result.body.message;
        }
      });
    },
    reduce() {
        if(this.num <= 1){
            this.num = 1
        }else{
            this.num--
        }
    },
    increase() {
        if(this.num >= this.goodsInfo.stock_quantity){
            this.num = this.goodsInfo.stock_quantity
        }else{
            this.num++
        }
    },
    check() {
        if(this.num <= 1){
            this.num = 1
        }
        if(this.num >= this.goodsInfo.stock_quantity){
            this.num = this.goodsInfo.stock_quantity
        }
    },
    getGoodsInfo() {
        this.$http.get('api/goods/getinfo/' +this.id).then(result => {
            if(result.body.status === 0){
                this.goodsInfo = result.body.message[0]
            }
        })
    },
    getDesc() {
        this.$router.push({name:'getDesc' , params:this.id})
    },
    goodsComments() {
        this.$router.push({path:'/home/goodscomments/'+this.id})
    },
    beforeEnter: (el) => {
        el.style.transform = 'translate(0,0)'
    },
    enter(el,done){
        let ballRectLeft = this.$refs.ball.getBoundingClientRect().left
        let ballRectTop = this.$refs.ball.getBoundingClientRect().top

        let badgeRectLeft = document.querySelector('#carBadge').getBoundingClientRect().left
        let badgeRectTop = document.querySelector('#carBadge').getBoundingClientRect().top

        let offsetLeft = badgeRectLeft - ballRectLeft
        let offsetTop = badgeRectTop - ballRectTop
        
        // console.log(offsetLeft,offsetTop)
        el.style.transform = `translate(${offsetLeft}px,${offsetTop}px)`
        el.style.transition = 'all .5s cubic-bezier(.26,-0.52,1,.85)'
        done()
    },
    afterEnter(el){
        this.ballFlag = !this.ballFlag
    },
    addCar() {
        this.ballFlag = !this.ballFlag
    }
  },
  components: {
    swiper
  }
};
</script>


<style lang="less">
.goodsInfo-container {
  background-color: #eee;
  overflow: hidden;
  position: relative;
  .ball{
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background-color: red;
      position: absolute;
      z-index: 10000;
      left: 145px;
      top :366px;
  }
  .buyInfo {
    .price {
      margin-bottom: 10px;
      font-size: 14px;
      .sell_price {
        margin-left: 20px;
        b {
          color: red;
          font-size: 16px;
          font-weight: 700;
        }
      }
    }
    .number {
      display: flex;
      line-height: 30px;
      margin-bottom: 10px;
      ul {
        display: flex;
        li:nth-of-type(1) {
          input {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            transform: translateX(1px);
          }
        }
        li:nth-of-type(2) {
          input {
            border-radius: 0;
          }
        }
        li:nth-of-type(3) {
          input {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            transform: translateX(-1px);
          }
        }
      }
      input {
        width: 40px;
        height: 30px;
        margin: 0;
        padding: 0;
        text-align: center;
      }
    }
    button{
        font-size: 14px;
        height: 35px;
        line-height: 35px;
        margin-bottom: 10px;
    }
  }
  .subInfo{
      p{
          line-height: 35px;
      }
  }
  .mui-card-footer{
      display: block;
      button{
          margin: 15px 0;
      }
  }
}
</style>
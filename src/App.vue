<template>
  <div id="app">
    <!-- 固定的头部 -->
  <mt-header fixed title="Vue-cms"></mt-header>
    <!-- 固定的底部 使用mui -->
  <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员中心</span>
			</router-link>
			<router-link class="mui-tab-item" to="/cart">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">9</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>

    <!-- 内容组件 -->
    <!-- <h1>我是app</h1> -->
    <transition>
      <router-view></router-view>
    </transition>

  </div>
</template>

<script>
</script>

<style lang='less'>
#app {
  padding-top: 40px;
  padding-bottom: 50px;
  overflow-x: hidden;
  .v-enter{
    opacity: 0;
    transform: translateX(100%);
  }
  .v-leave-to{
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
  }
  .v-enter-active,
  .v-leave-active{
    transition: all .5s ease;
  }
}
</style>

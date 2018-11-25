<template>
    <div class="goodsdesc-container">
        <h1>{{desc.title}}</h1>
        <hr>
        <div class="desc-content" v-html="desc.content">

        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      desc: {},
      id: this.$route.params.id
    };
  },
  created() {
    this.getDesc();
  },
  methods: {
    getDesc() {
      this.$http.get("api/goods/getdesc/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.desc = result.body.message[0];
        }
      });
    }
  }
};
</script>


<style lang="less">
.goodsdesc-container {
  h1 {
    text-align: center;
    margin: 15px 0;
    font-size: 16px;
    color: #226aff;
    font-weight: 700;
  }
  img {
    width: 100%;
  }
  .desc-content {
    padding: 0 5px;
  }
}
</style>
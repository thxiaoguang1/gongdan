<template>
  <div>
    <van-nav-bar 
    fixed
    title="发表评价"
    left-arrow
    @click-left="onClickLeft"
    />
    <van-cell-group>
  
</van-cell-group>

    <van-panel title="评价" desc="请评价本次维修服务" class="score" >
      <van-field
      v-model="message"
      type="textarea"
      placeholder="请输入评价"
      rows="4"
      autosize
    />
      <div class="score_dev">
          <span class="word">响应速度</span>
          <van-rate class="rate"
            v-model="value1"
            :size="25"
            color="#f44"
            void-icon="star"
            void-color="#eee"
          />
      </div>
      <div class="score_dev">
          <span class="word">服务质量</span>
          <van-rate class="rate"
            v-model="value2"
            :size="25"
            color="#f44"
            void-icon="star"
            void-color="#eee"
          />
      </div>
      <div class="score_dev score_dev3">
          <span class="word">服务态度</span>
          <van-rate class="rate"
            v-model="value3"
            :size="25"
            color="#f44"
            void-icon="star"
            void-color="#eee"
          />
      </div>
    </van-panel>
    <van-button type="primary" class="fbpj" @click='success'>发表评价</van-button>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Rate, Panel, Field, CellGroup, Button, Toast } from 'vant';
import VueBus from 'vue-bus';
Vue.use(VueBus);
export default {
   components: {
    [Panel.name]: Panel,
    [NavBar.name]: NavBar,
    [Rate.name]: Rate,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Toast.name]: Toast,
  },
  name: 'Score',
  data () {
    return {
      value1:3,
      value2:3,
      value3:3,
      message:''
      // msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    onClickLeft(){
      this.$router.replace('/evaluate')
    },
    success(){
      console.log(this.message)
      if(this.message){
        this.$router.push({
          path:'/success',
          name:'Success',
          params: { word1: '感谢您的评价',word2: '返回评价服务' }
        });
      }else {
        Toast('请填写评价')
      }
     
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .score{
    margin-top: 45px;
  }
  .score .word{
    float: left;
    font-size: 0.42667rem;
    color: #323233;
    margin-right:30px;
    
  }
  .rate{
    float: left;
  }
  .score_dev{
    padding: 0.8rem 0.5rem;
    overflow: hidden;
  }
  .score_dev3{
    margin-bottom: 50px;
  }
  .fbpj{
    margin-left: 280px;
  }

</style>

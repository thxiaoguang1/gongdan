<template>
  <div>
    <van-nav-bar 
    fixed
    title="智能工单"
    @click-left="onClickLeft"
    />
    <van-cell-group>

  <img src='../assets/timg.png'>
  <p class="word">{{this.$route.params.word1}}</p>
  
</van-cell-group>

<van-button type="primary" size="large" @click='Evalute_click'>{{this.$route.params.word2}}</van-button>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Rate, Panel, Field, CellGroup, Button } from 'vant';
export default {
   components: {
    [Panel.name]: Panel,
    [NavBar.name]: NavBar,
    [Rate.name]: Rate,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
  },
  name: 'Success',
  data () {
    return {
      value1:3,
      value2:3,
      value3:3,
      message:'',
      // msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    Evalute_click(){
      console.log(this.$route.params.word1)
      if(this.$route.params.word1==='感谢您的评价'){
        this.$router.replace('/evaluate')
      }
      if(this.$route.params.word1==='接单成功'){
        this.$router.replace('/receipt')
      }
      if(this.$route.params.word1==='提交成功'){
        this.$router.replace('/repair')
      }
      if(this.$route.params.word1==='填写成功'){
        this.$router.replace('/essential')
      }
      if(this.$route.params.word1==='成功添加角色'){
        this.$router.replace('/addRole')
      }
    },
    onClickLeft(){
      this.$router.replace('/evaluate')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  img{
    margin-top:45px;
    padding:50px 135px;
    width:100px;
    height:100px;
  }
  .word{
    color:#323233;
    font-size: 0.6rem;
    padding-bottom: 50px;
    text-align: center;
  }

</style>

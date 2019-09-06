<template>
  <div>
    <van-nav-bar 
    fixed
    title="维修单"
    left-arrow
    @click-left="onClickLeft"
    />
    <van-steps direction="vertical" :active='items.active'>
    <van-step style="margin-top:45px" v-for='(item,index) in items' :key='index'>
      <h3><span>【</span>{{item.state}}<span>】</span></h3>
      <p>{{item.state_time}}</p>
    </van-step>
    </van-step>
  </van-steps>
  </div>
</template>

<script>
import Vue from 'vue'
import Axios from 'axios'
import {  Tab, Tabs, NavBar, Step, Steps } from 'vant';
export default {
   components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [NavBar.name]: NavBar,
    [Step.name]: Step,
    [Steps.name]: Steps,
  },
  props:['newButton'],
  name: 'Details',
  data () {
    return {
      active:'',
      items:[],
      // msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    onClickLeft(){
     this.$router.go(-1)
      console.log('1')
    }

  },
  created() {
     Axios.post('/api/pjxq').then((res)=>{
      console.log(res)
      this.items=res.data;
    }).catch((err)=>{

    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .evaluate{
    margin-top: 10px;
  }
  .evaluate_list{
    overflow: hidden;
  }
 .evaluate_list>p {
   font-size: 0.37333rem;
   float: left;
   color: #323233;
   margin-left: 15px;
   width: 170px;
 }
</style>

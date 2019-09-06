<template>
  <div>
    <van-nav-bar 
    fixed
    title="维修处理"
    left-text
    />
    <van-tabs style="margin-top:45px" color='#07c160' animated @click='onClick'>
      <van-tab title="待处理" style="background:#eee">
        <state-left :newButton='newButton'></state-left>
      </van-tab>
      <van-tab title="已完成" style="background:#eee">
        <state-right :newButton='newButton'></state-right>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Vue from 'vue'
import StateLeft from '../components/State_left'
import StateRight from '../components/State_right'
import { NavBar, Tab, Tabs } from 'vant';


export default {
  
  components:{
    StateLeft,
    StateRight,
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
  },
  name: 'Assign',
  data () {
    return {
      newButton:0,
      // msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    onClick(name, title) {
      // console.log(name)
      this.newButton=name;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

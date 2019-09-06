<template>
  <div>
    <van-nav-bar 
    fixed
    title="维修处理(原厂)"
    left-text
    />
    <van-tabs style="margin-top:45px" color='#07c160' animated @click='onClick'>
      <van-tab title="待处理" style="background:#eee">
        <StatePlant-left :newButton='newButton'></Stateplant-left>
      </van-tab>
      <van-tab title="已完成" style="background:#eee">
        <StatePlant-right :newButton='newButton'></StatePlant-right>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Vue from 'vue'
import StatePlantRight from '../components/StatePlant_right'
import StatePlantLeft from '../components/StatePlant_left'
import { NavBar, Tab, Tabs } from 'vant';


export default {
  
  components:{
    StatePlantRight,
    StatePlantLeft,
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

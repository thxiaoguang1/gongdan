<template>
  <div>
    <van-nav-bar 
    fixed
    title="我要报修"
    left-text
    />
    <div class="block"></div>
    <van-tabs color='#07c160' animated @click="onClick">
      <van-tab title="我要报修" style="background:#eee;margin-top:">
        <repair-left :newButton='newButton'></repair-left>
      </van-tab>
      <van-tab title="已报修" style="background:#eee">
        <repair-right :newButton='newButton' ></repair-right>
      </van-tab>
    </van-tabs>
   
  </div>
    
    
</template>

<script>
import Vue from 'vue'
import RepairLeft from '../components/Repair_left'
import RepairRight from '../components/Repair_right'
import { NavBar, Tab, Tabs } from 'vant';


export default {
  
  components:{
    RepairLeft,
    RepairRight,
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
  },
  name: 'Repair',
  data () {
    return {
      newButton:'',
      // msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    onClick(name, title) {
      this.newButton=name;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .block{
   margin-top:45px;
   background: #f0f3f6;
 }
</style>

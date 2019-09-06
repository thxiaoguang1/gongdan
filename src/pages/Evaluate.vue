<template>
  <div>
    <van-nav-bar 
    fixed
    title="服务评价"
    left-text
    />
    <van-tabs style="margin-top:45px" color='#07c160' animated @click="onClick">
      <van-tab title="待评价" style="background:#eee">
        <evaluate-left :newButton='newButton'></evaluate-left>
      </van-tab>
      <van-tab title="已评价" style="background:#eee">
        <evaluate-right :newButton='newButton'></evaluate-right>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Vue from 'vue'
import EvaluateLeft from '../components/Evaluate_left'
import EvaluateRight from '../components/Evaluate_right'
import { NavBar, Tab, Tabs } from 'vant';


export default {
  
  components:{
    EvaluateLeft,
    EvaluateRight,
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

</style>

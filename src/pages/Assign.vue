<template>
  <div>
    <van-nav-bar 
    fixed
    title="工单指派"
    left-text
    />
    <van-tabs style="margin-top:45px" color='#07c160' animated @click="onClick">
      <van-tab title="待指派" style="background:#eee">
        <assign-left :newButton='newButton'></assign-left>
      </van-tab>
      <van-tab title="已指派" style="background:#eee">
        <assign-right :newButton='newButton'></assign-right>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Vue from 'vue'
import AssignLeft from '../components/Assign_left'
import AssignRight from '../components/Assign_right'
import { NavBar, Tab, Tabs } from 'vant';


export default {
  
  components:{
    AssignLeft,
    AssignRight,
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
  },
  name: 'Assign',
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

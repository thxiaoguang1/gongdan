<template>
  <div>
    <van-nav-bar 
    fixed
    title="与原厂交接"
    left-text
    />
    <connect class="assign"></connect>
   
   
  </div>
</template>

<script>
import Vue from 'vue'
import connect from '../components/connect'
import { NavBar, Tab, Tabs } from 'vant';


export default {
  
  components:{
    connect,
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
.assign{
  margin-top:45px;
  background:#eee
  }
</style>

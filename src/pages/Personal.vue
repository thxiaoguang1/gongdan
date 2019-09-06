<template>
  <div>
    <van-nav-bar 
    fixed
    title="我要报修"
    left-text
    />
    <div class="block"></div>
      <personal-list :newButton='newButton'></personal-list>
  </div>
</template>

<script>
import Vue from 'vue'
import PersonalList from '../components/Personal_list'
import { NavBar, Tab, Tabs } from 'vant';


export default {
  
  components:{
    PersonalList,
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
  },
  name: 'Personal',
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

<template>
  <div>
    <van-nav-bar 
    fixed
    title="确认接单"
    left-text
    />
    <van-tabs style="margin-top:45px" color='#07c160' animated @click='onClick'>
      <van-tab title="待响应" style="background:#eee">
        <receipt-list :newButton='newButton'></receipt-list>
      </van-tab>
      <van-tab title="已响应" style="background:#eee">
        <receipt-list :newButton='newButton'></receipt-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Vue from 'vue'
import ReceiptList from '../components/Receipt_list'
import { NavBar, Tab, Tabs } from 'vant';


export default {
  
  components:{
    ReceiptList,
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
      console.log(name)
      this.newButton=name;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

<template>
  <div></div>
</template>

<script>
import Vue from 'vue'
import {getSysConfig} from '@/api/api'
export default {
  name: 'UserInfor',
  data () {
    return {
      
    }
  },
  methods: {
  },
  created() {
    getSysConfig().then((res)=>{
      console.log(res)
    })
    // window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize"
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

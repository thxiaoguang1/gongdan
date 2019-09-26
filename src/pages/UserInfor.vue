<template>
  <div></div>
</template>

<script>
import Vue from 'vue'
import {getSysConfig} from '@/api/api'
import Qs from 'qs'
import axios from 'axios'

export default {
  name: 'UserInfor',
  data () {
    return {
      
    }
  },
  methods: {
  getQueryString(obj) {
    let  _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
  var arr = [];
  var _tmpArray = [];
  for (var index in obj) {
    _tmpArray.push(index);
  }
  _tmpArray.sort();

  _tmpArray.forEach(function (key) {
    if (_typeof(obj[key]) === 'object') {
      obj[key].forEach(function (item) {
        arr.push(key + '[]' + '=' + item);
      });
    } else {
      arr.push(key + '=' + obj[key]);
    }
  });
  return arr.join('&');
}
  },
  created() {
  
    getSysConfig().then((res)=>{
      let params={};
      params.appId=res.data.appId;
      params.scope='snsapi_userinfo';
      params.redirect_uri=encodeURI(window.location.href)
      let queryString = this.getQueryString(params);
      axios.post(`https://open.weixin.qq.com/connect/oauth2/authorize?${queryString}`).then(res=>{
        console.log(res)
      })


    })
    // window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize"
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

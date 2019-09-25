<template>
  <div>
    <van-nav-bar 
    fixed
    title="维修单"
    left-arrow
    @click-left="onClickLeft"
    />
    <van-steps direction="vertical" :active='items.active'>
    <van-step style="margin-top:45px" v-for='(item,index) in items' :key='index'>
      <h3><span>【</span>{{item.state}}<span>】</span></h3>
      <p>{{item.createDate}}</p>
    </van-step>
    </van-step>
  </van-steps>
  </div>
</template>

<script>
import Vue from 'vue'
import Axios from 'axios'
import {  Tab, Tabs, NavBar, Step, Steps } from 'vant';
import {getRepairDetails,getRepairById} from '@/api/api'

export default {
   components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [NavBar.name]: NavBar,
    [Step.name]: Step,
    [Steps.name]: Steps,
  },
  props:['newButton'],
  name: 'Details',
  data () {
    return {
      active:'',
      items:[],
      // msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    onClickLeft(){
     this.$router.go(-1)
      console.log('1')
    },
     getLocalTime(date) { 
       let t = new Date(date);   // 实例化时间戳  time.后面的是时间获取转换的对应方法
        let y = t.getFullYear();
        let m = t.getMonth()+1;
        m = m<10?"0"+m:m;
        let d = t.getDate()<10?"0"+t.getDate():t.getDate(); 
        let h = t.getHours()<10?"0"+t.getHours():t.getHours();
        let min = t.getMinutes()<10?"0"+t.getMinutes():t.getMinutes();
        let s = t.getSeconds()<10?"0"+t.getSeconds():t.getSeconds();                     
        return  y+"-"+m+"-"+d+" "+h+":"+min+":"+s;   // 返回给外面调用它的地方
    },

  },
  created() {
    let id=this.$route.params.params.id;
    let data={'billId':id}
    let data1={};
//     getRepairById(data).then((res)=>{
// console.log(res,'1')
//     })
    getRepairDetails(data).then((res)=>{
      console.log(res,'2')
      res.data.forEach((res)=>{
       if(res.state===0){
          data1.state='提交报修'
        }else if(res.state===1){
          data1.state='确认指派'
        }else if(res.state===2){
          data1.state='待处理'
        }else if(res.state===3){
          data1.state='已到达'
        }else if(res.state===4){
          data1.state='处理中'
        }else if(res.state===5){
          data1.state='已送原厂'
        }else if(res.state===6){
          data1.state='厂家维修'
        }else if(res.state===7){
          data1.state='已送回'
        }else if(res.state===8){
          data1.state='已取回'
        }else{
          data1.state='完成'
        }
        data1.createDate=this.getLocalTime(res.createDate)
      })
        this.items.push(data1);
        console.log(this.items)
    })
        
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .evaluate{
    margin-top: 10px;
  }
  .evaluate_list{
    overflow: hidden;
  }
 .evaluate_list>p {
   font-size: 0.37333rem;
   float: left;
   color: #323233;
   margin-left: 15px;
   width: 170px;
 }
</style>

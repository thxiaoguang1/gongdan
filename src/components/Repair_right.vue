<template>
  <div>
    <van-panel v-for='(item,index) in items' class="evaluate" :key='index' @click="details(item)">
     
      <div class="border">
          <p>{{item.stateDate}}</p>
          <p style="color: red" v-if="item.state!=='完成'">状态：{{item.state}}</p>
          <p style="color: green" v-if="item.state==='完成'">状态：{{item.state}}</p>
        </div>
      <div class="evaluate_list position">
        <!-- <p>姓名:{{item.name}}</p>
        <p>单位:{{item.danwei}}</p>
        <p>处室:{{item.chushi}}</p>
        <p>办公室:{{item.bangongshi}}</p>
        <p>所属区域:{{item.quyu}}</p>
        <p>联系电话:{{item.phone}}</p> -->
        <p>维修单号:{{item.repairNum}}</p>
        <p>维修对象:{{item.repairObj}}</p>
        <p>报修人:{{item.realName}}</p>
        <p>座机:{{item.tel}}</p>
        <p>地址:{{item.area}}{{item.office}}</p>
        <p>故障描述:{{item.repairDesc}}</p>
        <!-- <p>故障描述:{{item.miaoshu}}</p> -->
      </div>
      
    </van-panel>
    
  </div>   
</template>

<script>
import Vue from 'vue'
import StartDatetime from './StartDatetime'
import EndDatetime from './EndDatetime'
import {getDataByCode,getDataByCodeAndVal,saveAdd,getRepairList} from '@/api/api'
import { mapGetters,mapActions } from "vuex";
import { Field, CellGroup, Cell, Toast, RadioGroup, Radio, Collapse, CollapseItem, DatetimePicker, Popup, Button, Card, Panel, Picker } from 'vant';
export default {
   components: {
    EndDatetime,
    StartDatetime,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [DatetimePicker.name]: DatetimePicker,
    [Cell.name]: Cell,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Collapse.name]: Collapse,
    [CollapseItem .name]: CollapseItem,
    [Popup.name]: Popup,
    [Button.name]: Button,
    [Card.name]: Card,
    [Panel.name]: Panel,  
    [Picker.name]: Picker,
    [Toast.name]: Toast,
  },
  props:{
    newButton:Number
  },
  computed:mapGetters(['getStartTime','getEndTime']),
  name: 'AssignList',
  data () {
    return {
      showPicker:false,
      placeholder:'请选择维修人员',
      label:'维修指派',
      number:'',
      items:[]
      // msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    p(s) {
      return s < 10 ? '0' + s : s
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
    details(value){
      // 可把状态通过存值传入其他页面
      console.log(value)
      this.$router.push({
        path:'/details',
        name:'Details',
        params:{ 'params':value }
      })
    }
  },
  created() {
      let userId=JSON.parse(localStorage.getItem('temp')).userId;
      let data={'userId':userId}
      getRepairList(data).then((res)=>{
        data=res.data
       
        data.forEach((res)=>{
         
          let data=res
          console.log(data)
          data.stateDate=this.getLocalTime(data.stateDate)
          if(data.state===0){
            data.state='提交报修'
          }else if(data.state===1){
            data.state='确认指派'
          }else if(data.state===2){
            data.state='待处理'
          }else if(data.state===3){
            data.state='已到达'
          }else if(data.state===4){
            data.state='处理中'
          }else if(data.state===5){
            data.state='已送原厂'
          }else if(data.state===6){
            data.state='厂家维修'
          }else if(data.state===7){
            data.state='已送回'
          }else if(data.state===8){
            data.state='已取回'
          }else{
            data.state='完成'
          }
          let data1={'code':'DW','value':data.unit};
          let data2={'code':'CS','value':data.officeRoom};
          let data3={'code':'SSQY','value':data.area};
          // console.log(data1)
          getDataByCodeAndVal(data1).then((res)=>{
            // console.log(res)
             data.unit=res.data
          })
          getDataByCodeAndVal(data2).then((res)=>{
            // console.log(res)
             data.officeRoom=res.data
          })
          getDataByCodeAndVal(data3).then((res)=>{
            // console.log(res)
             data.area=res.data
          })
        })
        this.items=data
        // console.log(data)
      })
      // this.$router.push({
      //   path:'/Success',
      //   name:'success',
      //   params:{ word1: '接单成功',word2: '查看当前处理情况'  }
      // })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .evaluate{
    margin-top: 10px;
    
  }
  .position{
    margin-left:10px;
  }
  .evaluate_list{
    overflow: hidden;
  }
 .evaluate_list>p{
   font-size: 0.27333rem;
   float: left;
   color: #323233;
   width: 160px;
  margin-left: 20px;
 }
 .border{
    border-bottom: 1px solid #eee;
    overflow:hidden;
 }
 .border>p{
   font-size: 0.27333rem;
   color: #323233;
 }
 .border>p:nth-child(1){
   float: left;
   margin-left: 15px;
 }
  .border>p:nth-child(2){
   float: right;
   margin-right: 15px;
 }
 .van-cell:not(:last-child)::after {
    border-bottom: 0.02667rem solid #fff!important;
  }
  .button{
    margin-left:10px;
    margin-bottom: 10px;
  }
</style>

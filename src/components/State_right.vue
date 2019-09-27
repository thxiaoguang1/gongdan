<template>
  <div>
     <startDatetime></startDatetime>
    <endDatetime></endDatetime>
    <van-field
      clearable
      label="维修单号"
      v-model="number"
      placeholder="请输入维修单号"
      input-align='right'
    />
    <van-button type="primary" size="large" class="chaxun" @click="query">查询</van-button>
    <van-panel v-for='(item,index) in items' class="evaluate" :key='index' @click="evaluate_list(item.danhao)" v-if="display">
      <div class="border">
          <p>{{item.time}}</p>
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
        <p>维修单号:{{item.danhao}}</p>
        <p>维修对象:{{item.duixiang}}</p>
        <p>报修人:{{item.name}}</p>
        <p>座机:{{item.zuoji}}</p>
        <p>地址:{{item.quyu}}{{item.bangonshi}}</p>
        <p>故障描述:{{item.miaoshu}}</p>
         
        <!-- <p>故障描述:{{item.miaoshu}}</p> -->
      </div>
  </van-panel>
    
    <!-- <van-button type="primary" size="large" class='button' v-if='!newButton' @click='gotolink'>提交工单</van-button> -->
  </div>   
</template>

<script>
import Vue from 'vue'
import {getHandleList,getDataByCodeAndVal} from '@/api/api'
import StartDatetime from './StartDatetime'
import EndDatetime from './EndDatetime'
import { mapGetters,mapActions } from "vuex";
import { Field, Card, Panel, Picker, Popup, DatetimePicker,Button,Toast,Notify } from 'vant';
export default {
   components: {
    StartDatetime,
    EndDatetime,
    [Field.name]: Field,
    [Popup.name]: Popup,
    [Card.name]: Card,
    [Panel.name]: Panel,  
    [Picker.name]: Picker,
    [DatetimePicker.name]: DatetimePicker,
    [Button.name]: Button,
    [Toast.name]: Toast,
    [Notify.name]: Notify,
  },
  props:{
    newButton:Number
  },
  name: 'StateList',
  data () {
    return {
      value:'',
      showPicker:false,
      currentStartDate:false,
      startTime:'',
      display:false,
      placeholder:'请选择维修人员',
      label:'维修指派',
      number:'',
      columns: ['电脑', '服务器', '主机','其他'],
      items:[]
      // msg: 'Welcome to Your Vue.js App'
    }
  },
  computed:mapGetters(['getStartTime','getEndTime']),
  methods: {
    p(s) {
      return s < 10 ? '0' + s : s
    },
    evaluate_list(value){
      console.log(value)
      this.$router.push({
        path:'/details',
        name:'Details',
        params:{ }
      })
    },
    onConfirm(value) {
      // const d=new Date(value)
      // const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
      this.value=value
      this.showPicker = false;
    },
    query(){
      console.log(this.getStartTime.startTime)
      console.log(this.number)
      console.log(this.getEndTime.endTime)
      this.number=this.number?this.number:'';
      if(this.getStartTime.startTime&&this.getEndTime.endTime||this.number){
        let userId=JSON.parse(localStorage.getItem('temp')).userId;
        let data1={'isHandle':1,'startDate':this.getStartTime.startTime,'endDate':this.getEndTime.endTime,'repairNum':this.number}
        let arr=[];
        getHandleList(data1).then((res)=>{
          let data=[];
          data=res.data
           if(data&&data.length){
              console.log(res.data)
           }else {
               Notify('暂无数据');
            }
        })
        this.display=true;
      }else{
          Toast('请选择起止时间或者订单号')
      }    
    },
    onConfirmStartTime(value) {
      // const d=new Date(value)
      // const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
      this.startTime=value
      this.currentStartDate = false;
    },
    created() {
      // this.$router.push({
      //   path:'/Success',
      //   name:'success',
      //   params:{ word1: '接单成功',word2: '查看当前处理情况'  }
      // })
    },
    // evaluate(){
    //   this.$router.replace('/score')
    // }

  }
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
    margin-bottom:10px;
  }
</style>

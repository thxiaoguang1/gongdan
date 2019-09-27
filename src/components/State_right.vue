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
    <van-panel v-for='(item,index) in items' class="evaluate" :key='index' @click="evaluate_list(item)" v-if="display">
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
    
    <!-- <van-button type="primary" size="large" class='button' v-if='!newButton' @click='gotolink'>提交工单</van-button> -->
  </div>   
</template>

<script>
import Vue from 'vue'
import {getHandleList,getDataByCodeAndVal,repairProcess,getAssignList,getSysConfig} from '@/api/api'
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
      number:'',
      items:[]
      // msg: 'Welcome to Your Vue.js App'
    }
  },
  computed:mapGetters(['getStartTime','getEndTime']),
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
    evaluate_list(value){
      console.log(value)
      this.$router.push({
        path:'/details',
        name:'Details',
        params:{'params':value}
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
        let dataList={'isHandle':1,'startDate':this.getStartTime.startTime,'endDate':this.getEndTime.endTime,'repairNum':this.number,'userId':userId}
        let arr=[];
        let dataAndVal=[];
        
        getHandleList(dataList).then((res)=>{
          
          dataAndVal=res.data;
          dataAndVal.forEach((res)=>{
            res.state='完成';
            res.stateDate=this.getLocalTime(res.stateDate);
          })
          if(res.data&&res.data.length){
            let data1={'code':'DW','value':dataAndVal.unit};
            let data2={'code':'CS','value':dataAndVal.officeRoom};
            let data3={'code':'SSQY','value':dataAndVal.area};
            // console.log(data1)
            getDataByCodeAndVal(data1).then((res)=>{
              // console.log(res)
              dataAndVal.unit=res.data
            })
            getDataByCodeAndVal(data2).then((res)=>{
              // console.log(res)
              dataAndVal.officeRoom=res.data
            })
            getDataByCodeAndVal(data3).then((res)=>{
              // console.log(res)
              dataAndVal.area=res.data
            })
            console.log(dataAndVal)
            
            
             this.items=(dataAndVal)
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

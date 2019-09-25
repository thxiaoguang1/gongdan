<template>
  <div>
    <query></query>
    <van-button type="primary" size="large" class="chaxun" @click="query">查询</van-button>
    <van-panel v-for='(item,index) in items' class="evaluate" :key='index' v-if='display' @click="details(item)">
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
import Dropdown from './Dropdown'
import Query from './Query'
import {getRepairDetails,getRepairUserList,repairAssigned,getDataByCodeAndVal,getAssignList,getRepairList} from '@/api/api'
import { mapGetters,mapActions } from "vuex";
import { Field, CellGroup, Cell, Toast, RadioGroup, Radio, Collapse, CollapseItem, DatetimePicker, Popup, Button, Card, Panel,Notify  } from 'vant';
export default {
   components: {
    Dropdown,
    Query,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Collapse.name]: Collapse,
    [CollapseItem .name]: CollapseItem,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Button.name]: Button,
    [Card.name]: Card,
    [Toast.name]: Toast,
    [Panel.name]: Panel,
    [Notify.name]: Notify,
  },
  props:['newButton'],
  name: 'AssignList',
  data () {
    return {
      display:false,
      name:'',
      items:[],
      assignUserId:''
    }
  },
  computed:mapGetters(['getEndTime','getStartTime','getname']),
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
    onConfirm(value) {
      const d=new Date(value)
      const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
      this.value=resDate
      this.startTimePop = false;
    },
    details(value){
      // 可把状态通过存值传入其他页面
      this.$router.push({
        path:'/details',
        name:'Details',
        params:{'params':value }
      })
    },
    gotolink(value){
      // console.log(value,this.placeholder,this.name)
    },
    query(){
      console.log(this.getStartTime.startTime)
      console.log(this.getEndTime.endTime)
      console.log(this.getname.name)
      this.assignedUserId=this.assignedUserId?this.getname.name:'';
     
      if(this.getStartTime.startTime&&this.getEndTime.endTime){
        let dataRepairUserList={'roleId':4};
        getRepairUserList(dataRepairUserList).then((res)=>{
          // console.log(this.value,res)
          // console.log(res)
          res.data.forEach((res)=>{
            if(this.getname.name===res.realName){
              this.assignUserId=res.id;
            } 
          }) 
          // console.log(typeof(this.getStartTime.startTime))
        //  console.log(this.getThisTime(this.getStartTime.startTime)) 
          let dataAssignList={'startDate':this.getStartTime.startTime,'endDate':this.getEndTime.endTime,'assignedUserId':this.assignUserId,'isAssigned':1};
          getAssignList(dataAssignList).then((res)=>{
            console.log(res)
            let data=[];
            data=res.data
            if(data&&data.length){
              data.forEach(res=>{
                const resData=res
                resData.stateDate=this.getLocalTime(resData.stateDate)
                if(res.state===0){
                  resData.state='提交报修'
                }else if(res.state===1){
                  resData.state='确认指派'
                }else if(res.state===2){
                  resData.state='待处理'
                }else if(res.state===3){
                  resData.state='已到达'
                }else if(res.state===4){
                  resData.state='处理中'
                }else if(res.state===5){
                  resData.state='已送原厂'
                }else if(res.state===6){
                  resData.state='厂家维修'
                }else if(res.state===7){
                  resData.state='已送回'
                }else if(res.state===8){
                  resData.state='已取回'
                }else{
                  data.state='完成'
                }
                let data1={'code':'DW','value':res.unit};
                let data2={'code':'CS','value':res.officeRoom};
                let data3={'code':'SSQY','value':res.area};
                // console.log(data1)
                getDataByCodeAndVal(data1).then((res)=>{
                  // console.log(res)
                   resData.unit=res.data
                })
                getDataByCodeAndVal(data2).then((res)=>{
                  // console.log(res)
                   resData.officeRoom=res.data
                })
                getDataByCodeAndVal(data3).then((res)=>{
                  // console.log(res)
                   resData.area=res.data
                })  

                // console.log(data)
                
              })
                this.items=(data);
            }else {
               Notify('暂无数据');
            }
          })
            
        })
      // getRepairList(dataAssignList).then((res)=>{
      //  console.log(res.data)
     
      //   this.items=data
      //   // console.log(data)
      // })
        this.display=true;
      }else {
        Toast('请选择起止时间');
      }
    }
    // evaluate(){
    //   this.$router.replace('/score')
    // }

  },
  created() {
   
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
    margin-bottom:10px;
  }
</style>

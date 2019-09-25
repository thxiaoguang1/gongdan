<template>
  <div>
    <van-panel v-for='(item,index) in items' class="evaluate" :key='index'>
     <div class="border">
          <p>{{item.createDate}}</p>
          <p>状态：{{item.state}}</p>
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
      <!-- <dropdown :placeholder="placeholder" :label='label' :columns='columns' @getValue='getValue' :inputAlign='inputAlign' class="peple" :required='required' :value='value'></dropdown> -->
      <van-button type="primary" size="large" class='button' v-if='!newButton' @click='gotolink(item)'>指派工单</van-button>
    </van-panel>
    
  </div>   
</template>

<script>
import Vue from 'vue'
// import Dropdown from './Dropdown'
import Query from './Query'
import { mapGetters,mapActions } from "vuex";
import {getRepairDetails,getRepairUserList,repairAssigned,getDataByCodeAndVal,getAssignList} from '@/api/api'
import { Field, CellGroup, Cell, Toast,RadioGroup, Radio, Collapse, CollapseItem, DatetimePicker, Popup, Button, Card, Panel } from 'vant';
export default {
   components: {
    // Dropdown,
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
  },
  props:['newButton'],
  name: 'AssignList',
  data () {
    return {
      items:[]
    }
  },
  methods: {  
    gotolink(value){
      this.$router.push({
        path:'/startAssign',
        name:'StartAssign',
        params:{ params:value }
      })
      
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
    getRepairList(){
      
    }

  },
  created() {
    let dataAssignList={'isAssigned':1};
    // let dataRepairUserList={'roleId':4};
    let arr=[];
    // getRepairUserList(dataRepairUserList).then(res=>{
    //   console.log(res)
    // })
    getAssignList(dataAssignList).then((res)=>{  
        console.log(res)
        res.data.forEach((res)=>{
          arr=res;
          console.log(res)
          arr.createDate=this.getLocalTime(res.createDate);
          res.state='提交报修'
          let data1={'code':'DW','value':res.unit};
          let data2={'code':'CS','value':res.officeRoom};
          let data3={'code':'SSQY','value':res.area};
          let data4={'code':'GZMS','value':res.repairDesc};
          let data5={'code':'WXDX','value':res.repairObj};
          // console.log(data1)
          getDataByCodeAndVal(data1).then((res1)=>{
            // console.log(res)
             arr.unit=res1.data
              
          })
          getDataByCodeAndVal(data2).then((res1)=>{
            // console.log(res)
             arr.officeRoom=res1.data
             res.bangongshi=res1.data;
             
          })
          getDataByCodeAndVal(data3).then((res1)=>{
            // console.log(res)
             arr.area=res1.data
             res.quyu=res1.data;
          })
           getDataByCodeAndVal(data4).then((res1)=>{
            // console.log(res)
             arr.repairDesc=res1.data
             res.repairDesc=res1.data;
          })
           getDataByCodeAndVal(data5).then((res1)=>{
            // console.log(res)
             arr.repairObj=res1.data
             res.repairObj=res1.data;
          })

          this.items.push(arr)
        })
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
  .peple{margin-left: 15px;}

</style>

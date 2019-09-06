<template>
  <div>
    <van-panel v-for='(item,index) in items' class="evaluate" :key='index' v-if="!newButton">
      <div class="border">
          <p>{{item.time}}</p>
          <p>{{item.state}}</p>
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
    
     <van-button type="primary" size="large" class='button' @click='gotolink(item)'>修改状态</van-button>
  </van-panel>
    
    <!-- <van-button type="primary" size="large" class='button' v-if='!newButton' @click='gotolink'>提交工单</van-button> -->
  </div>   
</template>

<script>
import Vue from 'vue'
import Dropdown from './Dropdown'
import field from './field'
import { Field, Card, Panel, Picker, Popup, DatetimePicker,Button,Toast } from 'vant';
export default {
   components: {
    Dropdown,
    field,
    [Field.name]: Field,
    [Popup.name]: Popup,
    [Card.name]: Card,
    [Panel.name]: Panel,  
    [Button.name]: Button,
    [Picker.name]: Picker,
    [DatetimePicker.name]: DatetimePicker,
    [Toast.name]: Toast,
  },
  props:{
    newButton:Number,
  },
  name: 'StateList',
  data () {
    return {
      value:'',
      display:true,
      showPicker:false,
      currentStartDate:false,
      disabled:true,
      placeholder:'请选择维修状态',
      label:'维修状态',
      columns: ['待处理', '已到达', '处理中','已送原厂','已取回','完成'],
      placeholder1:'请选择所需时间',
      label1:'待上门时间',
      columns1: ['10分钟', '20分钟', '30分钟','40分钟','50分钟','1小时'],
      startTime:'',
      placeholder2:'请选择故障描述',
      label2:'故障描述',
      columns2: ['电脑坏了', '屏幕碎了'],
      placeholder3:'请选择资产信息',
      label3:'资产编号',
      inputAlign:'center',
      required:true,
      state:'',
      showTime:true,
      showzichan:false,
      showmiaoshu:false,
      sxsj:'',
      miaoshu:'',
      zichanxinxi:'',
      message:'',
      columns3: ['资产编号', '资产编号'],
      items:[
        {'name':'张三','bangonshi':'c204','miaoshu':'电脑蓝屏','danwei':'市场局','chushi':'维修一部','bangongshi':'三里河','quyu':'三里河','zuoji':'029-1123','duixiang':'电脑','time':'2019-09-18 13:28','state':'待处理','danhao':'c123123123'},
        {'name':'张三','bangonshi':'c201','miaoshu':'显示屏问题','danwei':'市场局','chushi':'维修一部','bangongshi':'三里河','quyu':'三里河','zuoji':'029-1123','duixiang':'电脑','time':'2019-09-18 13:28','state':'已到达','danhao':'c133123123'},
         {'name':'张三','bangonshi':'c202','miaoshu':'主机损坏','danwei':'市场局','chushi':'维修一部','bangongshi':'三里河','quyu':'三里河','zuoji':'029-1123','duixiang':'电脑','time':'2019-09-18 13:28','state':'处理中','danhao':'c143123123'},
          {'name':'张三','bangonshi':'c203','miaoshu':'主机损坏','danwei':'市场局','chushi':'维修一部','bangongshi':'三里河','quyu':'三里河','zuoji':'029-1123','duixiang':'电脑','time':'2019-09-18 13:28','state':'已送达原厂','danhao':'c153123123'},
      ]
      // msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    p(s) {
      return s < 10 ? '0' + s : s
    },
    evaluate_list(value){
      console.log(value)
    },
    onConfirm(value) {
      // const d=new Date(value)
      // const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
      this.value=value
      this.showPicker = false;
    },
    getValue(name){
      this.state=name // 获取子页面的value
      console.log(name)
      if(name!=='待处理'){
        this.state=name
        this.showTime=false;
        this.showzichan=true;
        this.showmiaoshu=true;
      }else {
        this.showTime=true;
        this.showzichan=false;
        this.showmiaoshu=false;
      }
    },
    getValue1(name){
      this.sxsj=name // 获取子页面的value
    },
     getValue2(name){
      this.miaoshu=name // 获取子页面的value
    },
     getValue3(name){
      this.zichanxinxi=name // 获取子页面的value
    },
    onConfirmStartTime(value) {
      // const d=new Date(value)
      // const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
      this.startTime=value
      this.currentStartDate = false;
    },
    input(value){
      this.message=value;
      // console.log(value)
    },
    gotolink(item){
      // 获取新数据，刷新页面与取值
      console.log(item)
      this.$router.push({
        path:'/startState',
        name:'StartState',
        params:{ params:item }
      })
      // if((value.state==='待处理'||value.state==='已到达')&&this.sxsj&&this.state){
      //   this.items=[
      //     {'danhao':'123123122131','name':'李四','duixiang':'电脑','time':'2019-09-18 13:20','quyu':'三里河','bangongshi':'c320','miaoshu':'服务器崩溃','phone':'123123122131'}
      //   ]
      // }else if((value.state!=='待处理'&&value.state!=='已到达')&&this.guzhangmiaoshu&&this.zichanxinxi&&this.state){
      //   this.items=[
      //     {'danhao':'123123122131','name':'李四','duixiang':'电脑','time':'2019-09-18 13:20','quyu':'三里河','bangongshi':'c320','miaoshu':'服务器崩溃','phone':'123123122131'}
      //   ]
      // }else {
      //   Toast('请填写内容')
      // }
    },
  },
  created() {
    console.log(this.state)
    // this.items.map(item=>{
    //   // console.log(item.state)
    //   if(item.state==='待处理'){
    //     this.display=true;
    //   }else {
    //     this.display=false;
    //   }
    // })
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
  .peple{margin-left: 15px;}
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

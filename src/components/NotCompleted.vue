<template>
  <div style="background:#eee">
   <van-nav-bar 
    fixed
    title="未完成维修单"
    left-text
    
    />
    <div class="banner"></div>
    <van-panel v-for='(item,index) in items' class="evaluate" :key='index' @click="details(item)">
     
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
        <p>联系电话:{{item.phone}}</p>
        <p>地址:{{item.quyu}}{{item.bangonshi}}</p>
        <p>故障描述:{{item.miaoshu}}</p>
        <!-- <p>故障描述:{{item.miaoshu}}</p> -->
      </div>
    </van-panel>
    
  </div>   
</template>

<script>
import Vue from 'vue'
import StartDatetime from './StartDatetime'
import EndDatetime from './EndDatetime'
import { mapGetters,mapActions } from "vuex";
import { Field, CellGroup, Cell, Toast, RadioGroup, Radio, Collapse, CollapseItem, DatetimePicker, NavBar, Popup, Button, Card, Panel, Picker } from 'vant';
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
    [NavBar.name]: NavBar,
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
      items:[
        {'xuhao':4,'name':'张三','bangonshi':'c204','miaoshu':'电脑蓝屏','danwei':'市场局','chushi':'维修一部','bangongshi':'三里河','quyu':'三里河','phone':'123123122131','duixiang':'电脑','time':'2019-09-18 13:28','state':'处理中','danhao':'c123123123'},
        {'xuhao':3,'name':'张三','bangonshi':'c201','miaoshu':'显示屏问题','danwei':'市场局','chushi':'维修一部','bangongshi':'三里河','quyu':'三里河','phone':'123123122131','duixiang':'电脑','time':'2019-09-18 13:28','state':'已取回','danhao':'c123123123'},
         {'xuhao':2,'name':'张三','bangonshi':'c202','miaoshu':'主机损坏','danwei':'市场局','chushi':'维修一部','bangongshi':'三里河','quyu':'三里河','phone':'123123122131','duixiang':'电脑','time':'2019-09-18 13:28','state':'已原厂','danhao':'c123123123'},
          {'xuhao':1,'name':'张三','bangonshi':'c203','miaoshu':'主机损坏','danwei':'市场局','chushi':'维修一部','bangongshi':'三里河','quyu':'三里河','phone':'123123122131','duixiang':'电脑','time':'2019-09-18 13:28','state':'处理中','danhao':'c123123123'},
      ]
      // msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    p(s) {
      return s < 10 ? '0' + s : s
    },
    details(value){
      // 可把状态通过存值传入其他页面
      console.log(value.state)
      this.$router.push({
        path:'/details',
        name:'Details',
        params:{ }
      })
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
  .banner{
    height: 45px;
    
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

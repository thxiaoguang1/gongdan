<template>
  <div>
  <p class="word">今天<span>{{timeNow}}</span>，需交换<span>{{items.length}}</span>台</p>
    <van-panel v-for='(item,index) in items' class="evaluate" :key='index'>
      
     <div class="border">
          <p>{{item.time}}</p>
          <p>状态：{{item.state}}</p>
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
        
        <p>地址:{{item.quyu}}</p>
        <p>故障描述:{{item.miaoshu}}</p>
        <p>资产编号:{{item.zuoji}}</p>
        <!-- <p>故障描述:{{item.miaoshu}}</p> -->
      </div>
     
      <van-button type="primary" size="large" class='button' v-if='!newButton' @click='gotolink(item)'>确定</van-button>
    </van-panel>
    
  </div>   
</template>

<script>
import Vue from 'vue'
import Dropdown from './Dropdown'
import Query from './Query'
import { mapGetters,mapActions } from "vuex";
import { Field, CellGroup, Cell, Toast,RadioGroup, Radio, Collapse, CollapseItem, DatetimePicker, Popup, Button, Card, Panel } from 'vant';
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
  },
  props:['newButton'],
  name: 'AssignList',
  data () {
    return {
      placeholder:'请选择维修人员',
      label:'维修人员',
      columns:['张三','李四','王二'],
      display:false,
      required:true,
      inputAlign:'center',
      value:'',
      items:[
        {'state':'待处理','danhao':'123123122131','name':'张三','duixiang':'电脑','time':'2019-09-18 13:20','quyu':'马甸','bangongshi':'c201','miaoshu':'电脑坏了','zuoji':'029-12312'},
        {'state':'已到达','danhao':'123123122131','name':'李四','duixiang':'电脑','time':'2019-09-18 13:20','quyu':'三里河','bangongshi':'c320','miaoshu':'服务器崩溃','zuoji':'029-12312'}
      ]
      //  items:[
      //   {'xuhao':4,'name':'张三','bangonshi':'c204','miaoshu':'电脑蓝屏','danwei':'市场局','chushi':'维修一部','bangongshi':'三里河','quyu':'三里河','phone':'123123122131','duixiang':'电脑','time':'2019-09-18 13:28','state':'待处理','danhao':'c123123123'},
      //   {'xuhao':3,'name':'张三','bangonshi':'c201','miaoshu':'显示屏问题','danwei':'市场局','chushi':'维修一部','bangongshi':'三里河','quyu':'三里河','phone':'123123122131','duixiang':'电脑','time':'2019-09-18 13:28','state':'待处理','danhao':'c123123123'},
      //    {'xuhao':2,'name':'张三','bangonshi':'c202','miaoshu':'主机损坏','danwei':'市场局','chushi':'维修一部','bangongshi':'三里河','quyu':'三里河','phone':'123123122131','duixiang':'电脑','time':'2019-09-18 13:28','state':'待处理','danhao':'c123123123'},
      //     {'xuhao':1,'name':'张三','bangonshi':'c203','miaoshu':'主机损坏','danwei':'市场局','chushi':'维修一部','bangongshi':'三里河','quyu':'三里河','phone':'123123122131','duixiang':'电脑','time':'2019-09-18 13:28','state':'待处理','danhao':'c123123123'},
      // ]
      // msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {  
    getValue(value){
      this.value=value // 获取子页面的value
    },
    gotolink(value){
      console.log(this.value)
    
        this.items=[
        {'danhao':'123123122131','name':'李四','duixiang':'电脑','time':'2019-09-18 13:20','quyu':'三里河','bangongshi':'c320','miaoshu':'服务器崩溃','phone':'123123122131'}
      ]
      
    },
    p(s) {
      return s < 10 ? '0' + s : s
    }
    // evaluate(){
    //   this.$router.replace('/score')
    // }

  },
  created() {
    const d=new Date()
    const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
    this.timeNow=resDate
    // this.timeNow();
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 
  .word{
    font-size: 0.5rem;
    height: 35px;
    line-height: 35px;
    color: #000;
    margin: 0;
    background: #fff;
    border: 0;
  }
  .word span{
    color:red;
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

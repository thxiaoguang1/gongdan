<template>
  <div>
    <startDatetime></startDatetime>
    <endDatetime></endDatetime>
     <van-field
      clearable
      label="维修单号"
      v-model="number"
      placeholder="请选择维修单号查询"
      input-align='right'
    />
    <van-button type="primary" size="large" class="chaxun" @click="query">查询</van-button>
    <van-panel v-for='(item,index) in items' class="evaluate" :key='index' v-if="display">
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
        <p>维修人:{{item.name}}</p>
        <p>地址:{{item.quyu}}</p>
        <p>故障描述:{{item.miaoshu}}</p>
        <!-- <p>故障描述:{{item.miaoshu}}</p> -->
      </div>
      <div class="foot">
        <span class="foot_span">综合评价</span>
        <van-rate class="rate"
            readonly
            v-model=item.value
            :size="25"
            color="#f44"
            void-icon="star"
            void-color="#eee"
        />
      </div>
       
      <!-- <div slot="footer">
        <van-button size="small" @click="details">查看详情</van-button>
        
      </div> -->
    </van-panel>
    <!-- <van-button type="primary" size="large" class='button' v-if='!newButton' @click='gotolink'>提交工单</van-button> -->
  </div>   
</template>

<script>
import Vue from 'vue'
import StartDatetime from './StartDatetime'
import EndDatetime from './EndDatetime'
import { mapGetters,mapActions } from "vuex";
import { Field, CellGroup, Cell, RadioGroup, Radio, Collapse, CollapseItem, DatetimePicker, Popup, Button, Card, Panel, Rate } from 'vant';
export default {
   components: {
    StartDatetime,
    EndDatetime,
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
    [Panel.name]: Panel,
    [Rate.name]: Rate,
  },
  props:['newButton'],
  name: 'EvaluateScore',
  data () {
    return {
      value:1,
       display:false,
      number:'',
        items:[
        {'value':1,'xuhao':4,'name':'张三','bangonshi':'c204','miaoshu':'电脑蓝屏','danwei':'市场局','chushi':'维修一部','bangongshi':'三里河','quyu':'三里河','phone':'123123122131','duixiang':'电脑','time':'2019-09-18 13:28','state':'完成','danhao':'c123123123'},
        {'value':2,'xuhao':3,'name':'张三','bangonshi':'c201','miaoshu':'显示屏问题','danwei':'市场局','chushi':'维修一部','bangongshi':'三里河','quyu':'三里河','phone':'123123122131','duixiang':'电脑','time':'2019-09-18 13:28','state':'完成','danhao':'c223123123'},
         {'value':3,'xuhao':2,'name':'张三','bangonshi':'c202','miaoshu':'主机损坏','danwei':'市场局','chushi':'维修一部','bangongshi':'三里河','quyu':'三里河','phone':'123123122131','duixiang':'电脑','time':'2019-09-18 13:28','state':'完成','danhao':'c323123123'},
          {'value':4,'xuhao':1,'name':'张三','bangonshi':'c203','miaoshu':'主机损坏','danwei':'市场局','chushi':'维修一部','bangongshi':'三里河','quyu':'三里河','phone':'123123122131','duixiang':'电脑','time':'2019-09-18 13:28','state':'完成','danhao':'c423123123'},
      ]
      // msg: 'Welcome to Your Vue.js App'
    }
  },
  computed:mapGetters(['getStartTime','getEndTime']),
  methods: {
     
    p(s) {
      return s < 10 ? '0' + s : s
    },
    onConfirm(value) {
      const d=new Date(value)
      const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
      this.value=resDate
      this.startTimePop = false;
    },
    query(){
      console.log(this.getStartTime.startTime)
      console.log(this.number)
      console.log(this.getEndTime.endTime)
      this.display=true;
    },
    details(){
      // this.$router.replace('/alreadyAssign')
      this.$router.push({
        path:'/alreadyAssign',
        name:'AlreadyAssign',
        params:{
          score:true,
        }
      })
    },
    evaluate(){
      this.$router.replace('/score')
    }

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
 
  .foot{
    overflow: hidden;
    margin-top: 5px;
    margin-left: 15px;
  }
  .foot_span,.foot>.rate{
    float: left;
    font-size: 0.37333rem;
    margin-left: 15px;
  }
  
  .foot_span{
    margin-top: 5px;
  }
  .rate{
      margin-left: 15px;
  }
 
 
</style>

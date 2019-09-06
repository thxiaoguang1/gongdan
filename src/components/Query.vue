<template>
  <div>
    <Time :placeholder="placeholder1" :label='label1'  @getValue='getValue1'></Time>
    <Time :placeholder="placeholder2" :label='label2' @getValue='getValue2'></Time>
    <dropdown :placeholder="placeholder" :label='label' :columns='columns' @getValue='getValue' :inputAlign='inputAlign' class="peple" :value='value'></dropdown>
  </div>   
</template>

<script>
import Vue from 'vue'
import Time from './Time'
import Dropdown from './Dropdown'
import { mapGetters,mapActions } from "vuex";
import { Field, CellGroup, Cell, RadioGroup, Radio, Collapse, CollapseItem, DatetimePicker, Popup, Button, Card, Panel, Picker } from 'vant';
export default {
   components: {
    Dropdown,
    Time,
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
  },
  props:{
    newButton:Number
  },
  computed:mapGetters(['getStartTime','getEndTime','getname']),
  name: 'AssignList',
  data () {
    return {
      value:'',
      label1:"开始时间",
      placeholder1:"请选择开始时间",
      label2:"结束时间",
      placeholder2:"请选择结束时间",
      showPicker:false,
      placeholder:'请选择维修人员',
      label:'维修人员',
      columns:['张三','李四','王二'],
      display:false,
      inputAlign:'right',
      display:false,
      items:[
        {'xuhao':4,'name':'张三','bangonshi':'c204','miaoshu':'电脑蓝屏','danwei':'市场局','chushi':'维修一部','bangongshi':'三里河','quyu':'三里河','phone':'123123122131','duixiang':'电脑','time':'2019-09-18 13:28','state':'待处理','danhao':'c123123123'},
        {'xuhao':3,'name':'张三','bangonshi':'c201','miaoshu':'显示屏问题','danwei':'市场局','chushi':'维修一部','bangongshi':'三里河','quyu':'三里河','phone':'123123122131','duixiang':'电脑','time':'2019-09-18 13:28','state':'待处理','danhao':'c123123123'},
         {'xuhao':2,'name':'张三','bangonshi':'c202','miaoshu':'主机损坏','danwei':'市场局','chushi':'维修一部','bangongshi':'三里河','quyu':'三里河','phone':'123123122131','duixiang':'电脑','time':'2019-09-18 13:28','state':'待处理','danhao':'c123123123'},
          {'xuhao':1,'name':'张三','bangonshi':'c203','miaoshu':'主机损坏','danwei':'市场局','chushi':'维修一部','bangongshi':'三里河','quyu':'三里河','phone':'123123122131','duixiang':'电脑','time':'2019-09-18 13:28','state':'待处理','danhao':'c123123123'},
      ]
      // msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    ...mapActions(['addname','addStartTime','addEndTime']),
    p(s) {
      return s < 10 ? '0' + s : s
    },
    getValue(value){
      console.log(value)
      this.value=value;
      const name={
        name:value
        }
      this.addname(name) // 获取子页面的value
    },
    getValue1(value){
      console.log(value)
      // this.startTime=value;
      const startTime={
        startTime:value
        }
      this.addStartTime(startTime) // 获取子页面的value
    },
    getValue2(value){
      console.log(value)
      // this.endTime=value;
      const endTime={
        endTime:value
        }
      this.addEndTime(endTime) // 获取子页面的value
    },
    // evaluate(){
    //   this.$router.replace('/score')
    // }

  },
  created() {
    // console.log(this.startTime)
    // console.log(this.getStartTime.startTime,this.getdanhao.danhao)
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
  .evaluate_list{
    overflow: hidden;
  
  }
 .evaluate_list>p{
   font-size: 0.27333rem;
   float: left;
   color: #323233;
   margin-left: 15px;
   width: 170px;
 }
 .border{
   border-bottom: 1px solid #eee;
 }
 .van-cell:not(:last-child)::after {
    border-bottom: 0.02667rem solid #fff!important;
  }
  .button{
    margin-left:10px;
    margin-bottom: 10px;
  }
</style>

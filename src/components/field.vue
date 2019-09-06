<template>
  <div>
    <van-field
      v-model="message"
      label="备注"
      type="textarea"
      placeholder="请输入备注"
      :input-align='inputAlign'
      rows="1"
      class="peple"
      @input='input'
    />
  </div>   
</template>

<script>
import Vue from 'vue'
import { Field, Card, Panel, Picker, Popup, DatetimePicker,Button,Toast } from 'vant';
export default {
   components: {
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
      placeholder:'请选择维修状态',
      label:'维修状态',
      columns: ['待处理', '已到达', '处理中','已送原厂','已取回','完成'],
      placeholder1:'请选择所需时间',
      label1:'所需时间',
      columns1: ['10分钟', '20分钟', '30分钟','40分钟','50分钟','1小时'],
      startTime:'',
      placeholder2:'请选择故障描述',
      label2:'故障描述',
      columns2: ['电脑坏了', '屏幕碎了'],
      placeholder3:'请选择资产信息',
      label3:'资产信息',
      inputAlign:'center',
      required:true,
      state:'',
      sxsj:'',
      guzhangmiaoshu:'',
      zichanxinxi:'',
      message:'',
      columns3: ['资产信息', '资产信息'],
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
    input(value){
      console.log(value)

      this.$emit('input',value)
    }
  },
  created() {
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

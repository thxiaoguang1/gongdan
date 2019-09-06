<template>
 
  <div class="repadirLeft">
     <van-nav-bar
      fixed
      title='维修单'
      />
    <van-cell-group @click="click">
      <van-cell title="报修人" :value="this.items[0].name" size="large" style="margin-top:45px"/>
      <van-cell title="单位" value="国家市场监督管理局" size="large" />
      <van-cell title="处室" value="开发一处" size="large" />
      <van-cell title="所属区域" value="三楼" size="large" />
      <van-cell title="办公室" value="c205" size="large" />
      
      <van-cell title="固定电话" value="17688827289" size="large" />
      <van-cell title="移动电话" value="17688827289" size="large" />
      <van-cell title="维修单号" value="c23123" size="large" />
      <van-cell title="维修对象" value="c23123" size="large" />
      <van-cell title="故障描述" value="电脑坏了电脑坏了电脑坏了电脑坏了电脑坏了电脑坏了电脑坏了" size="large" class="miaoshu" type="textarea"/>
      <van-cell title="维修状态" value="已处理" size="large" />
      <van-cell title="报修时间" value="2019-09-10" size="large"  type="textarea"/>
      <van-cell title="维修人员" value="李四" size="large" v-if='this.$route.params.score' type="textarea"/>
    </van-cell-group>
  </div>   
</template>

<script>
import Vue from 'vue'
import { Field, CellGroup, Cell, RadioGroup, Radio, Collapse, CollapseItem, DatetimePicker, Popup, Button, NavBar, Rate } from 'vant';
export default {
   components: {
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
    [NavBar.name]: NavBar,
    [Rate.name]: Rate,
  },
  props:['newButton'],
  name: 'AlreadyAssign',
  data () {
    return {
      username:'',
      message:'',
      value:'',
      value_rate:5,
      activeNames: ['0'],
      radio: '1',
      startTimePop: false,
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      minHour: 10,
      maxHour: 20,
      minDate: new Date(),
      maxDate: new Date(2019, 10, 1),
      currentDate: new Date(),
      items:[
        {'name':'张三','bangonshi':'c204','miaoshu':'电脑蓝屏','danwei':'市场局','chushi':'维修一部','bangongshi':'三里河','quyu':'三里河','zuoji':'029-1123','duixiang':'电脑','time':'2019-09-18 13:28','state':'待处理','danhao':'c123123123'}
      ]
      // msg: 'Welcome to Your Vue.js App'
    }
  },
  created() {
    // console.log('11',this.$route)
  },
  methods: {
    click(value){
      console.log(this.items)
      this.$router.push({
        path:'/details',
        name:'Details',
        params: { }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .button{
   margin-top:25px;
 }
  .miaoshu>.van-cell__value{
   text-align: left;
 }
  
  .foot_span,.foot>.rate{
    padding: 0.26667rem 0;
    float: left;
    font-size: 0.42667rem;
    margin-left: 15px;
  }
  .foot_span{

    margin-top: 5px;
  }
  .rate{
    padding: 0.26667rem 0;
      margin-left: 6rem;
  }
</style>

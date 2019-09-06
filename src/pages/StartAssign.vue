<template>
 
  <div class="repadirLeft">
     <van-nav-bar
      fixed
      title='指派维修人员'
      left-arrow
      @click-left="onClickLeft"
      />
    <van-cell-group>
      <van-cell title="报修人" :value="name" size="large" style="margin-top:45px"/>
      <van-cell title="维修单号" :value="danhao" size="large" />
      <van-cell title="维修对象" :value="duixiang" size="large" />
      <van-cell title="座机" :value="zuoji" size="large" />
      <van-cell title="地址" :value="dizhi" size="large" />
      <van-cell title="报修时间" :value="time" size="large" />
      <van-cell title="故障描述" :value="miaoshu" size="large" />
        <dropdown :placeholder="placeholder" :label='label' :columns='columns' @getValue='getValue' :inputAlign='inputAlign' class="peple" :required='required' :value='value'></dropdown>
    </van-cell-group>
     <van-button type="primary" size="large" class='button' v-if='!newButton' @click='query'>确认工单</van-button>
  </div>   
</template>

<script>
import Vue from 'vue'
import Dropdown from '../components/Dropdown'
import { Toast,Field, CellGroup, Cell, RadioGroup, Radio, Collapse, CollapseItem, DatetimePicker, Popup, Button, NavBar, Rate } from 'vant';
export default {
   components: {
    Dropdown,
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
    [Toast.name]: Toast,
  },
  props:['newButton'],
  name: 'StartAssign',
  data () {
    return {
      name:'',
      danhao:'',
      duixiang:'',
      zuoji:'',
      dizhi:'',
      time:'',
      miaoshu:'',
      placeholder:'请选择维修人员',
      label:'维修人员',
      columns:['张三','李四','王二'],
      display:false,
      required:true,
      inputAlign:'right',
      value:'',
      
      // msg: 'Welcome to Your Vue.js App'
    }
  },
  created() {
    const params=this.$route.params.params;
    this.name=params.name;
    this.danhao=params.danhao;
    this.duixiang=params.duixiang;
    this.zuoji=params.zuoji;
    this.dizhi=params.quyu+params.bangongshi;
    this.time=params.time;
    this.miaoshu=params.miaoshu;
  },
  methods: {
    getValue(value){
      console.log(value)
      this.value=value // 获取子页面的value
    },
    onClickLeft(){
    this.$router.go(-1)
      console.log('1')
    },
    query(){
      
      if(this.value){
        Toast('提交成功');
        // 需要编写返给后台数据
         this.$router.push({
          path:'/assign',
          name:'Assign',
          params:{  }
         })
      }else {
        Toast('请选择维修人员');
      }
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

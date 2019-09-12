<template>
 
  <div class="repadirLeft">
     <van-nav-bar
      fixed
      title='厂家维修处理'
      left-arrow
      @click-left="onClickLeft"
      />
    <van-cell-group>
      <van-cell title="维修单号" :value="danhao" size="large" style="margin-top:45px"/>
      <van-cell title="维修对象" :value="duixiang" size="large" />
      <van-cell title="地址" :value="dizhi" size="large" />
      <van-cell title="报修时间" :value="time" size="large" />
      <van-cell title="故障描述" :value="miaoshu" size="large" />
      <dropdown :placeholder="placeholder" :label='label' :required='required' :columns='columns' @getValue='getValue' :inputAlign='inputAlign' :value='state' class="peple" :disabled='disabled'></dropdown>
      <dropdown :placeholder="placeholder1" :label='label1' @getValue='getValue1' :required='required' :columns='columns1' :inputAlign='inputAlign' v-if='showTime' class="peple" :value='valueTime'></dropdown>
      <dropdown class="peple" :placeholder="placeholder4" :label='label4' @getValue='getValue4'  :columns='columns4' :inputAlign='inputAlign' v-if='showmiaoshu' :value='zichanmiaoshu'></dropdown>
      <dropdown class="peple" :placeholder="placeholder3" :label='label3' @getValue='getValue3' :columns='columns3' :inputAlign='inputAlign' v-if='showzichan' :value='zichanxinxi'></dropdown>
        <van-field
          v-model="message"
          label="备注"
          type="textarea"
          placeholder="请输入备注"
          input-align='right'
          rows="1"
          class="peple"
        />
     <van-button type="primary" size="large" class='button' @click='gotolink'>确认</van-button>
    </van-cell-group>
  </div>   
</template>

<script>
import Vue from 'vue'
import Dropdown from '../components/Dropdown'
import field from '../components/field'
import { Toast,Field, CellGroup, Cell, RadioGroup, Radio, Collapse, CollapseItem, DatetimePicker, Popup, Button, NavBar, Rate } from 'vant';
export default {
   components: {
    Dropdown,
    field,
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
  name: 'StartState',
  data () {
    return {
      showTime:false,
      showzichan:false,
      showmiaoshu:false,
      disabled:true,
      valueTime:'',
      placeholder:'请选择维修状态',
      label:'维修状态',
      columns: ['厂家维修','已送回'],
      placeholder1:'请选择所需时间',
      label1:'所需时间',
      columns1: ['10分', '20分', '30分','40分','50分','1小时'],
      inputAlign:'center',
      
      placeholder2:'请选择故障描述',
      label2:'故障描述',
      columns2: ['电脑坏了', '屏幕碎了'],
      placeholder3:'请选择资产信息',
      columns3: ['资产编号', '资产编号'],
      label3:'资产编号',
      zichanxinxi:'',
      placeholder4:'请选择故障描述',
      label4:'故障描述',
      columns4: ['电脑坏了', '屏幕碎了'],
      name:'',
      danhao:'',
      duixiang:'',
      zuoji:'',
      dizhi:'',
      time:'',
      miaoshu:'',
      message:'',
      state:'',
      zichanmiaoshu:'',
      // placeholder:'请选择维修人员',
      // label:'维修人员',
      // columns:['张三','李四','王二'],
      display:false,
      required:true,
      inputAlign:'right',
      value:'',
      
      // msg: 'Welcome to Your Vue.js App'
    }
  },
  created() {
    
    const params=this.$route.params.params;
    console.log(params)
    this.name=params.name;
    this.danhao=params.danhao;
    this.duixiang=params.duixiang;
    this.zuoji=params.zuoji;
    this.dizhi=params.quyu+params.bangonshi;
    this.time=params.time;
    this.miaoshu=params.miaoshu;
    this.state=params.state;
    console.log(this.state)
    this.showmiaoshu=true;
    this.showzichan=true;
    if(this.state!=='厂家维修'){
        // this.state=name
        this.showTime=false;
      }else {
        this.showTime=true;
       
      }
  },
  methods: {
    input(value){
      this.message=value;
      console.log(value)
    },
    getValue(name){
      this.state=name // 获取子页面的value
      console.log(name)
      if(name!=='厂家维修'){
        this.state=name
        this.showTime=false;
        this.showzichan=true;
        this.showmiaoshu=true;
      }else {
        console.log(0)
        this.showTime=true;
        this.showzichan=false;
        this.showmiaoshu=false;
      }
    },
    getValue1(value){
      console.log(value)
      this.valueTime=value // 获取子页面的value
    },
    getValue3(name){
      this.zichanxinxi=name // 获取子页面的value
    },
    getValue4(name){
      this.zichanmiaoshu=name // 获取子页面的value
    },
    onClickLeft(){
    this.$router.go(-1)
      // console.log('1')
    },
    gotolink(){
      const params=this.$route.params.params;
      // 获取新数据，刷新页面与取值
      console.log(params)
      if(this.state&&this.state==='厂家维修'&&this.valueTime){
        Toast('已提交')
        this.$router.go(-1)
      }else if(this.state&&this.state!=='厂家维修'&&this.zichanmiaoshu&&this.zichanxinxi){
        Toast('已提交')
        this.$router.go(-1)
      }else {
        Toast('请填写信息')
      }
      // this.$router.push({
      //   path:'/startState',
      //   name:'StartState',
      //   params:{ params:item }
      // })
    },
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

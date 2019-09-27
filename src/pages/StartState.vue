<template>
 
  <div class="repadirLeft">
     <van-nav-bar
      fixed
      title='维修处理'
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
      <dropdown :placeholder="placeholder1" :label='label1' :required='required' :columns='columns1' @getValue='getValue1' :inputAlign='inputAlign' :value='state' class="peple" :disabled='disabled'></dropdown>
      <dropdown :placeholder="placeholder" :label='label' @getValue='getValue' :required='required' :columns='columns2' :inputAlign='inputAlign' v-if='showTime' class="peple" :value='valueTime'></dropdown>
      <dropdown class="peple" :placeholder="placeholder4" :label='label4' @getValue='getValue4' :required='required' :columns='columns3' :inputAlign='inputAlign' v-if='showmiaoshu' :value='zichanmiaoshu'></dropdown>
      <dropdown class="peple" :placeholder="placeholder3" :label='label3' @getValue='getValue3' :required='required' :columns='columns4' :inputAlign='inputAlign' v-if='showzichan' :value='zichanxinxi'></dropdown>
        <van-field
          v-model="message"
          label="备注"
          type="textarea"
          placeholder="请输入备注"
          input-align='right'
          rows="1"
          class="peple"
        />
     <van-button type="primary" size="large" class='button' @click='gotolink'>修改状态</van-button>
    </van-cell-group>
  </div>   
</template>

<script>
import Vue from 'vue'
import Dropdown from '../components/Dropdown'
import field from '../components/field'
import {getDataByCode,getDataByCodeAndVal,saveAdd,repairProcess} from '@/api/api'
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
      placeholder:'请选择所需时间',
      label:'待上门时间',
      columns2: [],
      inputAlign:'center',
      placeholder1:'请选择维修状态',
      label1:'维修状态',
      columns1: [],
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
      stateIndex:'',
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
  methods: {
    input(value){
      this.message=value;
      console.log(value)
    },
    getValue1(name){
      this.state=name // 获取子页面的value
      console.log(name)
      if(name!=='待处理'){
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
    getValue(value){
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
      console.log(params)
      // 获取新数据，刷新页面与取值
      let repairState='';
      let id=params.id;
      let userId=params.userId;
      let data1={'code':'WXZZ'};
      getDataByCode(data1).then((res)=>{
        // console.log(res)
        const details=res.data.details;
        let code=[];
        details.forEach(element => {
          if(this.state===element.code){
            repairState=element.value
          }     
        });
        // console.log(repairState)
        if(this.state&&this.state==='待处理'&&this.valueTime){
         
          console.log(this.valueTime)
          let ProcessData={'billId':id,'doorOfTime':this.valueTime,'repairState':repairState,'userId':userId,'remark':this.message}
          console.log(ProcessData)
          repairProcess(ProcessData).then((res)=>{
            if(res.data==="success"){
              Toast('已提交')
            }
          })          
        // this.$router.go(-1)
        }else if(this.state&&this.state!=='待处理'&&this.zichanmiaoshu&&this.zichanxinxi){
          let ProcessData={'billId':id,'doorOfTime':'','repairState':repairState,'userId':userId}
          console.log(ProcessData)
          repairProcess(ProcessData).then((res)=>{
            if(res.data==="success"){
              Toast('已提交')
            }
          })    
          Toast('已提交')
          this.$router.go(-1)
        }else {
          Toast('请填写信息')
        }
      })
      // console.log(repairState)

      // this.$router.push({
      //   path:'/startState',
      //   name:'StartState',
      //   params:{ params:item }
      // })
    },
  },
  created() {
    let data1={'code':'WXZZ'};
    let data2={'code':'DSMSJ'};
    let data3={'code':'YCGZMS'};
    let data4={'code':'YCZCBH'};
    getDataByCode(data1).then((res)=>{
      const details=res.data.details;
      let code=[];
      details.forEach(element => {
        code.push(element.code)
        console.log(code)
        this.columns1=code
      });
    })
    getDataByCode(data2).then((res)=>{
      const details=res.data.details;
      let code=[];
      details.forEach(element => {
        code.push(element.code)
        this.columns2=code
      });
    })
    getDataByCode(data3).then((res)=>{
      const details=res.data.details;
      let code=[];
      details.forEach(element => {
        code.push(element.code)
        this.columns3=code
      });
    })
    getDataByCode(data4).then((res)=>{
      const details=res.data.details;
      let code=[];
      details.forEach(element => {
        code.push(element.code)
        this.columns4=code
      });
    })
    const params=this.$route.params.params;
    console.log(params)
    this.name=params.realName;
    this.danhao=params.repairNum;
    this.duixiang=params.repairObj;
    this.zuoji=params.tel;
    this.dizhi=params.area+params.office;
    this.time=params.createDate;
    this.miaoshu=params.repairDesc;
    this.state=params.repairState;
    console.log(this.state)
    if(params.repairState==="提交报修"||params.repairState==="确认指派"){
      this.state='待处理'
      this.showTime=true;
    }
    if(this.state!=='待处理'){
        // this.state=name
        this.showTime=false;
        this.showzichan=true;
        this.showmiaoshu=true;
      }else {
        console.log(0)
        // this.showTime=true;
        this.showTime=true;
        // this.showmiaoshu=false;
      }
     
  },
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

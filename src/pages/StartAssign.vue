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
import {getRepairDetails,getRepairUserList,repairAssigned,getDataByCodeAndVal,getAssignList} from '@/api/api'
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
      columns:[],
      display:false,
      required:true,
      inputAlign:'right',
      value:'',
      assignUserId:'',
      
      // msg: 'Welcome to Your Vue.js App'
    }
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
        // 需要编写返给后台数据
        let dataRepairUserList={'roleId':4};
        let params=this.$route.params.params;
        getRepairUserList(dataRepairUserList).then((res)=>{
          // console.log(this.value,res)
          console.log(res)
          res.data.forEach((res)=>{
            console.log(res)
            if(this.value===res.realName){
              this.assignUserId=res.id;
            } 
          }) 
          let dataAssigned={'billId':params.id,'userId':params.userId,'assignUserId':this.assignUserId}
            repairAssigned(dataAssigned).then((res)=>{
              console.log(res)
            if(res.data==='success'){
                Toast('提交成功');
                this.$router.go(-1);
            }else {
              Toast('提交失败');
            }
            })    
        }) 
      }else {
        Toast('请选择维修人员');
      } 
    }
  },
  created() {
    let dataRepairUserList={'roleId':4};
    let arr=[];
    console.log(this.$route.params.params)
    let params=this.$route.params.params;
    this.name=params.realName;
    this.danhao=params.repairNum;
    this.duixiang=params.repairObj;
    this.zuoji=params.tel;
    this.dizhi=params.area+params.office;
    this.time=params.createDate;
    this.miaoshu=params.repairDesc;
    getRepairUserList(dataRepairUserList).then((res)=>{
      res.data.forEach((res)=>{
        arr.push(res.realName)
      })
    })
    this.columns=arr;
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

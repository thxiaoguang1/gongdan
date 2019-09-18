<template>
 
  <div class="repadirLeft">
    <van-cell-group>
      <van-field
      v-if='!newButton'
      label="报修人"
      clearable
      v-model="id"
      input-align='right'
      required
      />
      <dropdown :placeholder="placeholder1" :label='label1' :required='required' @getValue='getdanwei' @getIndex='getdanweiIndex' :value='danwei' :inputAlign='inputAlign' :columns='columns1'></dropdown>
      <dropdown :placeholder="placeholder2" :label='label2' :required='required'  @getValue='getchushi' :value='chushi' @getIndex='getchushiIndex' :inputAlign='inputAlign' :columns='columns2'></dropdown>
      <dropdown :placeholder="placeholder3" :label='label3' :required='required' @getValue='getquyu' :value='quyu' @getIndex='getquyuIndex' :inputAlign='inputAlign' :columns='columns3'></dropdown>
      <van-field
      v-if='!newButton'
      label="办公室"
      clearable
      v-model="bangongju"
      input-align='right'
      required
      />
      
      <van-field
      v-if='!newButton'
      label="座机"
      clearable
      v-model="zuoji"
      input-align='right'
      required
      />
        
      <van-field
      v-if='!newButton'
      label="移动电话"
      clearable
      v-model="phone"
      input-align='right'
      />
      <dropdown :placeholder="placeholder4" :label='label4' :columns='columns4' @getValue='getValue4' :inputAlign='inputAlign' class="peple" :required='required' :value='valueMiaoshu'></dropdown>
       <dropdown :placeholder="placeholder5" :label='label5' :columns='columns5' @getValue='getValue5' :inputAlign='inputAlign' class="peple" :required='required' :value='valueDuixiang'></dropdown>
      <van-cell title="故障描述" :value=miaoshu size="large" v-if='newButton' class="miaoshu"/>
    </van-cell-group>
     
    <van-button type="primary" size="large" class='button' v-if='!newButton' @click='gotolink'>提交工单</van-button>
  </div>   
</template>

<script>
import Vue from 'vue'
import Axios from 'axios'
import Url from '@/api/index'
import Qs from 'qs'
import Dropdown from '../components/Dropdown'
import { Field, CellGroup, Cell, RadioGroup, Radio, Collapse, CollapseItem, DatetimePicker, Popup, Button, Toast, Picker } from 'vant';
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
    [Toast.name]: Toast,
    [Picker.name]: Picker,
  },
  props:['newButton'],
  name: 'RepairLeft',
  data () {
    return {
      placeholder1:'请选择单位',
      placeholder2:'请选择处室',
      placeholder3:'请选择所属区域',
      danweiIndex:'',
      chushiIndex:'',
      quyuIndex:'',
      label1:'单位',
      label2:'处室',
      label3:'所属区域',
      columns1: [],
      columns2: [],
      columns3: [],
      quyu:'',
      placeholder4:'请选择故障描述',
      label4:'故障描述',
      columns4: ['电脑坏了', '蓝屏了', '服务器异常'],
        placeholder5:'请选择维修对象',
      label5:'维修对象',
      columns5: ['电脑', '服务器', '主机','其他'],
       inputAlign:'right',
       required:true,
      valueDuixiang:'',
      valueMiaoshu:'',
      id:'',
      danwei:'',
      chushi:'',
      bangongju:'',
      zuoji:'',
      phone:'',
      danhao:'',
      duixiang:'',
      miaoshu:'',
      time:'',
      username:'',
      message1:'',
      message:'',
      valueTime:'',
      activeNames: ['1'],
      radio: '1',
      value:'',
      value2:'',
      showPicker: false,
      showPicker2: false,
      minHour: 10,
      maxHour: 20,
      minDate: new Date(),
      maxDate: new Date(2019, 10, 1),
      currentDate: new Date()
      // msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    p(s) {
      return s < 10 ? '0' + s : s
    },
    getdanweiIndex(index){
      this.danweiIndex=Number(index)+1
    },
    getchushiIndex(index){
      this.chushiIndex=Number(index)+1 
    },
    getquyuIndex(index){
      this.quyuIndex=Number(index)+1 
    },
    getdanwei(name){
      this.danwei=name // 获取子页面的value
    },
    getchushi(name){
      this.chushi=name // 获取子页面的value
    },
    getquyu(name){
      this.quyu=name // 获取子页面的value
    },
    getValue4(value){
      console.log(value)
      this.valueMiaoshu=value // 获取子页面的value
    },
    getValue5(value){
      console.log(value)
      this.valueDuixiang=value // 获取子页面的value
    },
    onConfirm(value) {
      // const d=new Date(value)
      // const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
      this.value=value
      this.showPicker = false;
    },
    onConfirm2(value) {
      // const d=new Date(value)
      // const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
      this.value2=value
      this.showPicker2 = false;
    },
    gotolink(){
      let data={};
      console.log(this.id,this.danwei,this.chushi,this.quyu,this.bangongju&&this.zuoji,this.value,this.value2)
      
      if(this.id&&this.danwei&&this.chushi&&this.quyu&&this.bangongju&&this.zuoji&&this.valueMiaoshu&&this.valueDuixiang){
        data.realName=this.id;
        data.danwei=this.id;
        data.unit=this.danweiIndex;
        data.chushi=this.chushi;
        data.officeRoom=this.chushiIndex;
        data.quyu=this.quyu;
        data.area=this.quyuIndex;
        data.office=this.bangongju;
        data.tel=this.zuoji;
        data.phone=this.phone?this.phone:'';
        Axios.post(Url+'/gdSysUser/getUser',Qs.stringify(data)).then((res)=>{

        })
      //  replace('/success')
        this.$router.push({
          path:'/success',
          name:'Success',
          params:{
            word1:'提交成功',word2:'关闭'
          }
        })
      }else {
        Toast('请完善内容');
      }
     
    }
  },
  created() {
    let data=JSON.parse(localStorage.getItem('temp'))
    this.id=data.realName;
    this.danwei=data.danwei;
    this.chushi=data.chushi;
    this.phone=data.phone;
    this.bangongju=data.office;
    this.quyu=data.quyu;
    this.zuoji=data.tel;
    let data1={'code':'DW'};
    let data2={'code':'CS'};
    let data3={'code':'SSQY'};
    console.log(data)
    Axios.post(Url+'/gdsysDictionary/getDataByCode',Qs.stringify(data1)).then((res)=>{
      const details=res.data.details;
      let code=[];
      details.forEach(element => {
        code.push(element.code)
        this.columns1=code
      });
    }) 
    Axios.post(Url+'/gdsysDictionary/getDataByCode',Qs.stringify(data2)).then((res)=>{
      const details=res.data.details;
      let code=[];
      details.forEach(element => {
        code.push(element.code)
        this.columns2=code
      });
    }) 
    Axios.post(Url+'/gdsysDictionary/getDataByCode',Qs.stringify(data3)).then((res)=>{
      const details=res.data.details;
      let code=[];
      details.forEach(element => {
        code.push(element.code)
        this.columns3=code
      });
    }) 
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .repadirLeft{
   margin-top:10px;
 }
 .miaoshu>.van-cell__value{
   text-align: left;
 }
</style>

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
      placeholder='请输入报修人'
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
      placeholder='请输入办公室'
      />
      
      <van-field
      v-if='!newButton'
      label="座机"
      clearable
      v-model="zuoji"
      input-align='right'
      required
      placeholder='请输入座机'
      />
        
      <van-field
      v-if='!newButton'
      label="移动电话"
      clearable
      v-model="phone"
      input-align='right'
      placeholder='请输入移动电话'
      />
      <dropdown :placeholder="placeholder4" :label='label4' :columns='columns4' @getValue='getValue4' :inputAlign='inputAlign' @getIndex='getmxIndex' class="peple" :required='required' :value='valueMiaoshu'></dropdown>
       <dropdown :placeholder="placeholder5" :label='label5' :columns='columns5' @getValue='getValue5' :inputAlign='inputAlign' @getIndex='getdxIndex' class="peple" :required='required' :value='valueDuixiang'></dropdown>
      <van-cell title="故障描述" :value=miaoshu size="large" v-if='newButton' class="miaoshu"/>
    </van-cell-group>
    
    <van-button type="primary" size="large" class='button' v-if='!newButton' @click='gotolink'>提交工单</van-button>
  </div>   
</template>

<script>
import Vue from 'vue'
import Axios from 'axios'
import {getDataByCode,getDataByCodeAndVal} from '@/api/api'
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
      currentDate: new Date(),
      mxIndex:'',
      dxIndex:'',
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
    getmxIndex(index){
      this.mxIndex=Number(index)+1 
    },
    getdxIndex(index){
      this.dxdex=Number(index)+1
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
      console.log(this.id,this.danwei,this.chushi,this.quyu,this.bangongju&&this.zuoji,this.valueMiaoshu,this.valueDuixiang)
      
      if(this.id&&this.danwei&&this.chushi&&this.quyu&&this.bangongju&&this.zuoji&&this.valueMiaoshu&&this.valueDuixiang){
        let data1={'code':'DW'};
        let data2={'code':'CS'};
        let data3={'code':'SSQY'};
        let data4={'code':'GZMS'};
        let data5={'code':'WXDX'};
        getDataByCode(data1).then((res)=>{
          // console.log(res.data.details)
            const details=res.data.details;
            // let code=[];
            details.forEach(res => {
              if(this.danwei===res.code){
                data.unit=res.value
              }
            });
        })
        getDataByCode(data2).then((res)=>{
          // console.log(res.data.details)
            const details=res.data.details;
            // let code=[];
            details.forEach(res => {
              if(this.chushi===res.code){
                data.officeRoom=res.value
              }
            });
        })
        getDataByCode(data3).then((res)=>{
          // console.log(res.data.details)
            const details=res.data.details;
            // let code=[];
            details.forEach(res => {
              if(this.quyu===res.code){
                data.area=res.value
              }
            });
        })
        getDataByCode(data4).then((res)=>{
          // console.log(res.data.details)
            const details=res.data.details;
            // let code=[];
            details.forEach(res => {
              if(this.valueMiaoshu===res.code){
                data.repairDesc=res.value
              }
            });
        })
        getDataByCode(data5).then((res)=>{
          // console.log(res.data.details)
            const details=res.data.details;
            // let code=[];
            details.forEach(res => {
              if(this.valueDuixiang===res.code){
                data.repairObj=res.value
              }
            });
        })
        // console.log(data1)
        // getDataByCodeAndVal(data1).then((res)=>{
        //   console.log(res.data)
        //     data.unit=res.data
        // })
        // getDataByCodeAndVal(data2).then((res)=>{
        //   console.log(res.data)
        //     data.officeRoom=res.data
        // })
        // getDataByCodeAndVal(data3).then((res)=>{
        //   console.log(res.data)
        //     data.area=res.data
        // })
        data.realName=this.id;
        data.danwei=this.danwei;
        data.unit=this.danweiIndex?this.danweiIndex:data.unit;
        data.chushi=this.chushi;
        data.officeRoom=this.chushiIndex?this.chushiIndex:data.officeRoom;
        data.quyu=this.quyu;
        data.area=this.quyuIndex?this.quyuIndex:data.area;
        data.office=this.bangongju;
        data.tel=this.zuoji;
        data.phone=this.phone?this.phone:'';
        data.repairDesc=this.mxIndex;
        data.repairObj=this.dxdex;
        data.userId =3
        console.log(data)
        // Axios.post(Url+'/gdSysUser/getUser',Qs.stringify(data)).then((res)=>{
        //   console.log(res)
        //   if(res.data.result==='success'){
        //     this.$router.push({
        //       path:'/success',
        //       name:'Success',
        //       params:{
        //         word1:'提交成功',word2:'关闭'
        //       } 
        //     })
        //   }
        // })
      //  replace('/success')
        
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
    let data4={'code':'GZMS'};
    let data5={'code':'WXDX'};
    getDataByCode(data1).then((res)=>{
      const details=res.data.details;
      let code=[];
      details.forEach(element => {
        code.push(element.code)
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
    getDataByCode(data5).then((res)=>{
      const details=res.data.details;
      let code=[];
      details.forEach(element => {
        code.push(element.code)
        this.columns5=code
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

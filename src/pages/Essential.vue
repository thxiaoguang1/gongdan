<template>
 
  <div class="repadirLeft">
    <van-nav-bar 
      fixed
      title="基本信息"
    />
    <van-cell-group style="margin-top:45px">
      <van-field
        label="姓名"
        placeholder="请输入用户名"
        clearable
        v-model='id'
        required
        input-align='right'
      />
      <dropdown :placeholder="placeholder1" :label='label1' :required='required' @getValue='getdanwei' @getIndex='getdanweiIndex' :value='danwei' :inputAlign='inputAlign' :columns='columns1'></dropdown>
      <dropdown :placeholder="placeholder2" :label='label2' :required='required'  @getValue='getchushi' :value='chushi' @getIndex='getchushiIndex' :inputAlign='inputAlign' :columns='columns2'></dropdown>
      <dropdown :placeholder="placeholder3" :label='label3' :required='required' @getValue='getquyu' :value='quyu' @getIndex='getquyuIndex' :inputAlign='inputAlign' :columns='columns3'></dropdown>
      <van-field
        label="办公室"
        placeholder="请输入办公区"
        clearable
        required
        v-model='bangongju'
        input-align='right'
      />
      <van-field
        label="座机"
        required
        clearable
        input-align='right'
        v-model='zuoji'
        placeholder="请输入固定电话"
      />
      <van-field
        label="移动电话"
        clearable
        input-align='right'
        v-model='phone'
        placeholder="请输入移动电话"
      />
    </van-cell-group>
    <van-button type="primary" size="large" class='button' @click='gotolink'>提交</van-button>
    <p class="tishi">提示：办公室需按照楼号+办公室号，例如:c204</p>
  </div>   
</template>

<script>
import Vue from 'vue'
import Axios from 'axios'
import {getDataByCode,saveUser} from '@/api/api'
import Qs from 'qs'
import Dropdown from '../components/Dropdown'
import { Field, CellGroup, Cell, RadioGroup, Radio, Collapse, CollapseItem, DatetimePicker, Popup, Button, Toast, NavBar } from 'vant';
export default {
   components: {
    [Field.name]: Field,
    Dropdown,
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
    [NavBar.name]: NavBar,
  },
  name: 'Essential',
  data () {
    return {
      id:'',
      danwei:'',
      chushi:'',
      quyu:'',
      bangongju:'',
      address:'',
      phone:'',
      username:'',
      message:'',
      zuoji:'',
      valueTime:'',
      activeNames: ['1'],
      radio: '1',
      startTimePop: false,
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      minHour: 10,
      maxHour: 20,
      minDate: new Date(),
      maxDate: new Date(2019, 10, 1),
      currentDate: new Date(),
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
      required:true,
      inputAlign:'right',
      // msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    p(s) {
      return s < 10 ? '0' + s : s
    },
    onConfirm(value) {
      const d=new Date(value)
      const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
      this.valueTime=resDate
      this.startTimePop = false;
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
    gotolink(){
      let data={};
      if(this.id&&this.danwei&&this.chushi&&this.bangongju&&this.quyu&&this.zuoji){
         let data1={'code':'DW'};
        let data2={'code':'CS'};
        let data3={'code':'SSQY'};
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
        data.userId =this.userId;
        console.log(data)
        saveUser(data).then((res)=>{
         if(res.data.result==='success'){
           data.userId=res.data.user.id;
          
            localStorage.setItem('temp',JSON.stringify(data))
            this.$router.push({
              path:'/success',
              name:'Success',
              params:{
                word1:'填写成功',word2:'返回查看个人信息'
              }
            })
          }
        })
        
      }else {
        Toast('请完善基本信息');
      }
     
    },
   
  },
  created() {
    let getData=JSON.parse(localStorage.getItem('temp'))
  
    if(getData){
      this.id=getData.realName;
      this.danwei=getData.danwei;
      this.chushi=getData.chushi;
      this.phone=getData.phone;
      this.bangongju=getData.office;
      this.quyu=getData.quyu;
      this.zuoji=getData.tel;
    }
    // let data={'userId':3};
    // Axios.post(Url+'/gdSysUser/getUser',Qs.stringify(data)).then((res)=>{
    //   let data=res.data
    //   let data1={'code':'DW','value':data.unit};
    //   let data2={'code':'CS','value':data.officeRoom};
    //   let data3={'code':'SSQY','value':data.area};
    //   Axios.post(Url+'/gdsysDictionary/getDataByCodeAndVal',Qs.stringify(data1)).then((res)=>{
    //     this.danwei=(res.data)
    //   })
    //   Axios.post(Url+'/gdsysDictionary/getDataByCodeAndVal',Qs.stringify(data2)).then((res)=>{
    //     this.chushi=(res.data)
    //   })
    //   Axios.post(Url+'/gdsysDictionary/getDataByCodeAndVal',Qs.stringify(data3)).then((res)=>{
    //     this.quyu=(res.data)
    //   })
    //   this.id=data.realName
    //   this.bangongju=data.office
    //   this.zuoji=data.tel
    //   this.phone=data.phone
    // }) 
    let data1={'code':'DW'};
    let data2={'code':'CS'};
    let data3={'code':'SSQY'};
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
 .tishi{
  margin-left: 10px;
  color: red;
  font-size: 0.4rem;
 }
</style>

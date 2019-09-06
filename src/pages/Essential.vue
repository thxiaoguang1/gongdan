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
      <dropdown :placeholder="placeholder1" :label='label1' :required='required' @getValue='getdanwei' :value='danwei' :inputAlign='inputAlign' :columns='columns1'></dropdown>
      <dropdown :placeholder="placeholder2" :label='label2' :required='required'  @getValue='getchushi' :value='chushi' :inputAlign='inputAlign' :columns='columns2'></dropdown>
       <dropdown :placeholder="placeholder3" :label='label3' :required='required' @getValue='getquyu' :value='quyu' :inputAlign='inputAlign' :columns='columns3'></dropdown>
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
      label1:'单位',
      label2:'处室',
      label3:'所属区域',
      columns1: ['国家市场监督管理局','卫生局'],
      columns2: ['维修一处','开发一处'],
      columns3: ['三里河','马甸'],
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
      //  console.log(this.id,this.valueTime)
      if(this.id&&this.danwei&&this.chushi&&this.bangongju&&this.quyu&&this.zuoji){
        // Axios.get('/api/yibaoxiao',{
        //   params:{
        //     id:1,
        //   }
        // })
        this.$router.push({
          path:'/success',
          name:'Success',
          params:{
            word1:'填写成功',word2:'返回查看个人信息'
          }
        })
      }else {
        Toast('请完善基本信息');
      }
     
    }
  },
  created() {
    Axios.post('/api/yibaoxiao').then((res)=>{
      console.log(res)
      this.id=res.data[0].name;
      this.danwei=res.data[0].danwei;
      this.chushi=res.data[0].chushi;
      this.bangongju=res.data[0].bangongju;
      this.quyu=res.data[0].address;
      this.phone=res.data[0].phone;
      this.zuoji=res.data[0].zuoji;
    }).catch((err)=>{

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

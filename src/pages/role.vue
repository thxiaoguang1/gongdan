<template>
 
  <div class="repadirLeft">
    <van-nav-bar 
      fixed
      title="添加角色"
    />
    <van-cell-group style="margin-top:45px">
      <van-field
        label="姓名"
        clearable
        v-model='id'
        required
        input-align='right'
        readonly
      />
       <van-field
        label="单位"
        clearable
        v-model='danwei'
        required
        input-align='right'
        readonly
      />
       <van-field
        label="处室"
        clearable
        v-model='chushi'
        required
        input-align='right'
        readonly
      />
       <van-field
        label="所属区域"
        clearable
        v-model='quyu'
        required
        input-align='right'
        readonly
      />
    
      <van-field
        label="办公室"
        placeholder="请输入办公区"
        clearable
        required
        v-model='bangongju'
        input-align='right'
        readonly
      />
      <van-field
        label="座机"
        required
        clearable
        input-align='right'
        v-model='zuoji'
        readonly
        placeholder="请输入固定电话"
      />
      <van-field
        label="移动电话"
        clearable
        input-align='right'
        v-model='phone'
        placeholder="请输入移动电话"
        readonly
      />
       <dropdown :placeholder="placeholder" :label='label' :columns='columns' @getValue='getValue' :inputAlign='inputAlign' class="peple" :value='juese'></dropdown>
    </van-cell-group>
    <van-button type="primary" size="large" class='button' @click='gotolink'>提交</van-button>
  
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
  name: 'Role',
  data () {
    return {
      id:'',
      juese:'',
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
      minHour: 10,
      maxHour: 20,
      minDate: new Date(),
      maxDate: new Date(2019, 10, 1),
      currentDate: new Date(),
      placeholder:'请选择角色',
      label:'划分角色',
      columns: ['普通用户','维修人员','厂家维修人员','管理员'],
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
    getValue(name){
      this.juese=name // 获取子页面的value
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
            word1:'成功添加角色',word2:'返回查看个人信息'
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
      this.juese=res.data[0].juese;
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

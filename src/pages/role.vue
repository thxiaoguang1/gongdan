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
import Url from '@/api/index'
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
  name: 'Role',
  data () {
    return {
      id:'',
      userId:'',
      roleId:'',
      pId:'',
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
      columns: [],
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
      this.juese=name
        Axios.post(Url+'/gdRoles/getRoles').then((res)=>{
          const data=res.data;
          data.forEach((res)=>{
            if(this.juese===res.name){
              this.roleId=res.id
              this.pId=res.pId
            }
          })
        }).catch((err)=>{

        })
    },
    gotolink(){
       console.log(this.roleId)
       let data={'roles[0].id':this.roleId,'id':this.userId}
      if(this.juese){
        Axios.post(Url+'/gdSysUser/editUser',Qs.stringify(data)).then((res)=>{
          if(res.data==='success'){
            this.$router.push({
              path:'/success',
              name:'Success',
              params:{
                word1:'成功添加角色',word2:'返回'
              }
            })
          }
       
        }).catch((err)=>{

        })
        // this.$router.push({
        //   path:'/success',
        //   name:'Success',
        //   params:{
        //     word1:'成功添加角色',word2:'返回查看个人信息'
        //   }
        // })
      }else {
        Toast('请完善基本信息');
      }
     
    }
  },
  created() {
    const data=this.$route.params.params;
    console.log(data)
      this.id= data.realName;
      this.danwei=data.unit;
      this.chushi=data.officeRoom;
      this.quyu=data.area;
      this.bangongju=data.office;
      this.zuoji=data.tel;
      this.phone=data.phone?data.phone:'';
      this.userId=data.id;
    Axios.post(Url+'/gdRoles/getRoles').then((res)=>{
      const data=res.data;
      data.forEach((res)=>{
          this.columns.push(res.name)
      })
      // this.id=res.data[0].name;
      // this.danwei=res.data[0].danwei;
      // this.chushi=res.data[0].chushi;
      // this.bangongju=res.data[0].bangongju;
      // this.quyu=res.data[0].address;
      // this.phone=res.data[0].phone;
      // this.zuoji=res.data[0].zuoji;
      // this.juese=res.data[0].juese;
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

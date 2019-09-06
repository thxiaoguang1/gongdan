<template>
 
  <div class="repadirLeft">
    <van-cell-group>
      <van-field
      v-if='!newButton'
      label="报修人"
      clearable
      v-model="id"
      input-align='right'
      />
      
      <van-field
      v-if='!newButton'
      label="单位"
      clearable
      v-model="danwei"
      input-align='right'
      />
      
      <van-field
      v-if='!newButton'
      label="处室"
      clearable
      v-model="chushi"
      input-align='right'
      />
     
      <van-field
      v-if='!newButton'
      label="所属区域"
      clearable
      v-model="address"
      input-align='right'
      />
    
      <van-field
      v-if='!newButton'
      label="办公室"
      clearable
      v-model="bangongju"
      input-align='right'
      />
      
      <van-field
      v-if='!newButton'
      label="座机"
      clearable
      v-model="zuoji"
      input-align='right'
      />
        
      <van-field
      v-if='!newButton'
      label="移动电话"
      clearable
      v-model="phone"
      input-align='right'
      />
      <dropdown :placeholder="placeholder3" :label='label3' :columns='columns3' @getValue='getValue3' :inputAlign='inputAlign' class="peple" :required='required' :value='valueMiaoshu'></dropdown>
       <dropdown :placeholder="placeholder4" :label='label4' :columns='columns4' @getValue='getValue4' :inputAlign='inputAlign' class="peple" :required='required' :value='valueDuixiang'></dropdown>
   
      <!-- <van-cell title="维修单号" :value=danhao size="large" /> -->
      <!-- <van-collapse v-model="activeNames" v-if='!newButton'>
        <van-collapse-item title="维修对象" name="1">
          <van-radio-group v-model="radio">
            <van-cell title="电脑" clickable @click="radio = '1'">
              <van-radio slot="right-icon" name="1" />
            </van-cell>
            <van-cell title="服务器" clickable @click="radio = '2'">
              <van-radio slot="right-icon" name="2" />
            </van-cell>
            <van-cell title="其他" clickable @click="radio = '3'">
              <van-radio slot="right-icon" name="3" />
            </van-cell>
          </van-radio-group>
        </van-collapse-item>
      </van-collapse> -->
      <!-- <van-collapse v-model="activeNames" v-if='newButton'>
        <van-collapse-item title="维修对象" name="1">
          <van-radio-group v-model="radio" disabled>
            <van-cell title="电脑" clickable @click="radio = '1'">
              <van-radio slot="right-icon" name="1" />
            </van-cell>
             <van-cell title="服务器" clickable @click="radio = '2'">
              <van-radio slot="right-icon" name="2" />
            </van-cell>
            <van-cell title="其他" clickable @click="radio = '3'">
              <van-radio slot="right-icon" name="3" />
            </van-cell>
          </van-radio-group>
        </van-collapse-item>
      </van-collapse> -->
      <!-- <van-field 
        v-if='!newButton'
        v-model='message1'
        label="故障描述"
        type="textarea"
        rows="1" 
        autosize
        placeholder="请输入故障描述"
        input-align='right'
        >
      </van-field>        
      </van-field> -->
      <van-cell title="故障描述" :value=miaoshu size="large" v-if='newButton' class="miaoshu"/>
      <!-- <van-field v-if='!newButton'
        label="报修时间"
        clickable
        readonly="readonly"
        :value="valueTime"
        input-align='right'
        placeholder="选择提交时间"
        @click="startTimePop = true && !newButton"
      />
      <van-popup v-model="startTimePop" position="bottom" v-if='!newButton'>
        <van-datetime-picker
          type="date"
          :min-date="minDate"
          :max-date="maxDate"
          @cancel="startTimePop = false"
          @confirm="onConfirm"
        />
      </van-popup>
       <van-cell title="报修时间" :value=time size="large" v-if='newButton'/> -->
    </van-cell-group>
     
    <van-button type="primary" size="large" class='button' v-if='!newButton' @click='gotolink'>提交工单</van-button>
  </div>   
</template>

<script>
import Vue from 'vue'
import Axios from 'axios'
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
      placeholder3:'请选择故障描述',
      label3:'故障描述',
      columns3: ['电脑坏了', '蓝屏了', '服务器异常'],
        placeholder4:'请选择维修对象',
      label4:'维修对象',
      columns4: ['电脑', '服务器', '主机','其他'],
       inputAlign:'right',
       required:true,
      valueDuixiang:'',
      valueMiaoshu:'',
      id:'',
      danwei:'',
      chushi:'',
      bangongju:'',
      address:'',
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
    getValue3(value){
      console.log(value)
      this.valueMiaoshu=value // 获取子页面的value
    },
    getValue4(value){
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
      console.log(this.id,this.danwei,this.chushi,this.address,this.bangongju&&this.zuoji,this.value,this.value2)
      if(this.id&&this.danwei&&this.chushi&&this.address&&this.bangongju&&this.zuoji&&this.valueMiaoshu&&this.valueDuixiang){
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
    Axios.post('/api/yibaoxiao').then((res)=>{
      console.log(res)
      this.id=res.data[0].name;
      this.danwei=res.data[0].danwei;
      this.chushi=res.data[0].chushi;
      this.phone=res.data[0].phone;
      this.bangongju=res.data[0].bangongju;
      this.address=res.data[0].address;
      this.zuoji=res.data[0].zuoji;
      this.danhao=res.data[0].danhao;
      // this.duixiang=res.data[0].duixiang;
      // this.miaoshu=res.data[0].miaoshu;
      this.time=res.data[0].time;
    }).catch((err)=>{

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

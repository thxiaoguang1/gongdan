<template>
  <div class="repadirLeft">
    <van-cell-group>
      <van-field
      label="姓名"
      clearable
      v-model="username"
      input-align='right'
      placeholder="请输入姓名"
      />
      <dropdown :placeholder="placeholder" :label='label'></dropdown>
      <dropdown :placeholder="placeholder2" :label='label2'></dropdown>
      <dropdown :placeholder="placeholder3" :label='label3'></dropdown>
      <dropdown :placeholder="placeholder4" :label='label4'></dropdown>
      <van-field
        label="联系电话"
        input-align='right'
        placeholder="请输入联系电话"
      />
    </van-cell-group>
    <van-button type="primary" size="large" class='button' v-if='this.$router.params.button' @click='gotolink'>保存</van-button>
  </div>   
</template>

<script>
import Vue from 'vue'
import Dropdown from './Dropdown'
import { Field, CellGroup, Cell, RadioGroup, Radio, Collapse, CollapseItem, DatetimePicker, Popup, Button, Picker } from 'vant';
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
    [Picker.name]: Picker,
  },
  props:['newButton'],
  name: 'PersonalList',
  data () {
    return {
      username:'',
      danwei:'',
      placeholder:'请选择单位',
      placeholder2:'请选择处室',
      placeholder3:'请选择办公区',
      placeholder4:'请选择所属区域',
      label:'单位',
      label2:'处室',
      label3:'办公区',
      label4:'所属区域',
      company:false,
      dropdanwei:'',
      message:'',
      value:'',
      activeNames: ['0'],
      radio: '1',
      startTimePop: false,
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
    onCompany(value){
      this.value=value;
      this.company = false;
    },
    onConfirm(value) {
      const d=new Date(value)
      const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
      this.value=resDate
      this.startTimePop = false;
    },
    gotolink(){
      this.$router.replace('/evaluate')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .button{
   margin-top:25px;
 }
</style>

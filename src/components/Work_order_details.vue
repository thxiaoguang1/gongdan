<template>
 
  <div class="repadirLeft">
    <van-cell-group>
      <van-field
      v-if='!newButton'
      label="姓名"
      clearable
      v-model="username"
      input-align='right'
      placeholder="请输入姓名"
      />
       <van-field
      v-if='newButton'
      label="姓名"
      disabled
      v-model="username"
      input-align='right'
      placeholder="请输入姓名"
      />
      <van-cell title="单位" value="内容" size="large" />
      <van-cell title="处室" value="内容" size="large" />
      <van-cell title="办公区" value="内容" size="large" />
      <van-cell title="所属区域" value="内容" size="large" />
      <van-field
        label="联系电话"
        v-if='!newButton'
        input-align='right'
        placeholder="请输入联系电话"
      />
       <van-field
        v-if='newButton'
        disabled
        label="联系电话"
        input-align='right'
        placeholder="请输入联系电话"
      />
      <van-cell title="维修单号" value="内容" size="large" />
      <van-collapse v-model="activeNames">
        <van-collapse-item title="维修对象" name="1">
          <van-radio-group v-model="radio">
            <van-cell title="单选框 1" clickable @click="radio = '1'">
              <van-radio slot="right-icon" name="1" />
            </van-cell>
            <van-cell title="单选框 2" clickable @click="radio = '2'">
              <van-radio slot="right-icon" name="2" />
            </van-cell>
          </van-radio-group>
        </van-collapse-item>
      </van-collapse>
      <van-field 
        v-if='!newButton'
        v-model='message'
        label="故障描述"
        type="textarea"
        rows="1" 
        autosize
        placeholder="请输入故障描述"
        input-align='right'
        >
      </van-field>
      <van-field 
        v-if='newButton'
        v-model='message'
        label="故障描述"
        type="textarea"
        disabled
        rows="1" 
        autosize
        placeholder="请输入故障描述"
        input-align='right'
        >
      </van-field>
      <van-field
        label="提交时间"
        clickable
        readonly="readonly"
        :value="value"
        input-align='right'
        placeholder="选择提交时间"
        @click="startTimePop = true && !newButton"
      />
      <van-popup v-model="startTimePop" position="bottom" >
        <van-datetime-picker
          type="date"
          :min-date="minDate"
          :max-date="maxDate"
          @cancel="startTimePop = false"
          @confirm="onConfirm"
        />
      </van-popup>
     
    </van-cell-group>
    <van-button type="primary" size="large" class='button' v-if='!newButton' @click='gotolink'>提交工单</van-button>
  </div>   
</template>

<script>
import Vue from 'vue'
import { Field, CellGroup, Cell, RadioGroup, Radio, Collapse, CollapseItem, DatetimePicker, Popup, Button } from 'vant';
export default {
   components: {
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
  },
  props:['newButton'],
  name: 'RepairLeft',
  data () {
    return {
      username:'',
      message:'',
      value:'',
      activeNames: ['0'],
      radio: '1',
      startTimePop: false,
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
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

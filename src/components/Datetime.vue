<template>
  <div>
   <van-field v-if="!newButton" 
      readonly
      clickable
      :label="label"
      :value="startTime"
      :required='required'
      :placeholder="placeholder"
      input-align='center'
      @message='message'
      @click="currentStartDate = true"
    />
    <van-popup v-model="currentStartDate" round v-if="!newButton" position="bottom" get-container="#app">
      <van-datetime-picker
        type='date'
        :min-date="minDate"
        @cancel="currentStartDate = false"
        @confirm="onConfirmStartTime"
      />  
    </van-popup>
  </div>   
</template>

<script>
import Vue from 'vue'
import { Field, CellGroup, Cell, RadioGroup, Radio, Collapse, CollapseItem, DatetimePicker, Popup, Button, Picker } from 'vant';
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
    [Picker.name]: Picker,
  },
  props:['newButton','placeholder','label','required'],
  // props:{
  //   newButton:{
  //     type: String
  //   },
  //   placeholder:{
  //     type: String
  //   }
  // },
  name: 'dropdown',
  data () {
    return {
      username:'',
      message:'',
      startTime:'',
      currentStartDate: false,
      minDate: new Date(),
      maxDate: new Date(2030, 10, 1),
      activeNames: ['0'],
      radio: '1',
      // msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    
    p(s) {
      return s < 10 ? '0' + s : s
    },
    onConfirmStartTime(value){
      const d = new Date(value)
      const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
      this.startTime=resDate;
      this.currentStartDate = false;
      // console.log(this.startTime)
       this.$emit('getTime',resDate)
    }
  },
  created() {
    
    // this.startTime=this.getStartTime.startTime;
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .button{
   margin-top:25px;
 }
</style>

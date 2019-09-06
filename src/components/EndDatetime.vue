<template>
  <div>
   <van-field v-if="!newButton" 
      readonly
      clickable
      label="结束时间"
      :value="endTime"
      required
      placeholder="请选择结束时间"
      input-align='right'
      @click="currentStartDate = true"
    />
    <van-popup v-model="currentStartDate" round v-if="!newButton" position="bottom" get-container="#app">
      <van-datetime-picker
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="currentStartDate = false"
        @confirm="onConfirmStartTime"
      />  
    </van-popup>
  </div>   
</template>

<script>
import Vue from 'vue'
import {mapActions,mapGetters} from 'vuex'
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
  props:['newButton','placeholder','label'],
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
      endTime:'',
      currentStartDate: false,
      minDate: new Date(),
      maxDate: new Date(2030, 10, 1),
      columns:['张三', '李四', '招儿', '小明', '小风'],
      activeNames: ['0'],
      radio: '1',
      // msg: 'Welcome to Your Vue.js App'
    }
  },
 computed:mapGetters(['getEndTime']),
  methods: {
    ...mapActions(['addEndTime']),
    p(s) {
      return s < 10 ? '0' + s : s
    },
    onConfirmStartTime(value){
      const d = new Date(value)
      const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
      const resTime = this.p(d.getHours()) + ':' + this.p(d.getMinutes()) + ':' + this.p(d.getSeconds())
      this.endTime=resDate+'  '+resTime;
      this.currentStartDate = false;
       const endTime={
        endTime:this.endTime,
        completed:false
      }
      this.addEndTime(endTime)
    }
  },
  created() {
    this.endTime=this.getEndTime.endTime;
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .button{
   margin-top:25px;
 }
</style>

<template>
  <div>
    <van-field
    :label="label"
    readonly
    v-model='value'
    :input-align='inputAlign'
    :required='required'
    :placeholder="placeholder"
    @click="showPicker = true"
    />
    <van-popup v-model="showPicker" position="bottom" round get-container="#app">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
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
  props:['placeholder','label','columns','inputAlign','required','value'],
  name: 'dropdown',
  data () {
    return {
      username:'',
      message:'',
      showPicker: false,
      activeNames: ['0'],
      radio: '1',
      // msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    onConfirm(value,index){
      console.log(value,index)
      this.showPicker = false;
      this.$emit('getValue',value)
      this.$emit('getIndex',index)
    },
  },
  created() {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .button{
   margin-top:25px;
 }
</style>

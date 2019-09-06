<template>
  <div>
    <van-panel v-for='(item,index) in items' class="evaluate" :key='index'>
      <div class="evaluate_list">
        <p>维修单号:{{item.danhao}}</p>
        <p>维修对象:{{item.duixiang}}</p>
        <p>所属区域:{{item.quyu}}</p>
        <p>办公室:{{item.bangongshi}}</p>
        <p>问题描述:{{item.miaoshu}}</p>
        <p>报修时间:{{item.time}}</p>
        <p>维修人员:{{item.name}}</p>
      </div>
      <van-button size="small" @click="details1"  class="button" v-if='!newButton'>查看并确认</van-button>
      <van-button size="small" @click="details2"  class="button" v-if='newButton'>查看详情</van-button>
    </van-panel>
    <!-- <van-button type="primary" size="large" class='button' v-if='!newButton' @click='gotolink'>提交工单</van-button> -->
  </div>   
</template>

<script>
import Vue from 'vue'
import Dropdown from './Dropdown'
import { Field, CellGroup, Cell, RadioGroup, Radio, Collapse, CollapseItem, DatetimePicker, Popup, Button, Card, Panel } from 'vant';
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
    [Card.name]: Card,
    [Panel.name]: Panel,
  },
  props:{
    newButton:Number
  },
  name: 'AssignList',
  data () {
    return {
      placeholder:'请选择维修人员',
      label:'维修指派',
      items:[
        {'danhao':'123123122131','duixiang':'电脑','time':'2019-09-18 13:20','quyu':'马甸','name':'张三','bangongshi':'c201','miaoshu':'主机坏了'},
        {'danhao':'123123122131','duixiang':'电脑','time':'2019-09-18 13:20','quyu':'三里河','name':'李四','bangongshi':'c202','miaoshu':'服务器崩溃'}
      ]
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
    details1(){
      this.$router.push({
        path:'/alreadyAssign',
        name:'AlreadyAssign',
        params:{ buttonBlock:'1' }
      })
    },
    details2(){
      this.$router.replace('/alreadyAssign')
    },
    created() {
      // this.$router.push({
      //   path:'/Success',
      //   name:'success',
      //   params:{ word1: '接单成功',word2: '查看当前处理情况'  }
      // })
    },
    // evaluate(){
    //   this.$router.replace('/score')
    // }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .evaluate{
    margin-top: 10px;
  }
  .evaluate_list{
    overflow: hidden;
  
  }
 .evaluate_list>p {
   font-size: 0.27333rem;
   float: left;
   color: #323233;
   margin-left: 15px;
   width: 170px;
 }
 .van-cell:not(:last-child)::after {
    border-bottom: 0.02667rem solid #fff!important;
  }
  .button{
    margin-left:10px;
    margin-bottom:10px;
  }
</style>

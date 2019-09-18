<template>
  <div>
    <van-nav-bar 
    fixed
    title="添加角色"
    left-text
    />
    <div class="evaluate">
      <van-panel v-for='(item,index) in items' :key='index'>
         <div class="evaluate_list position">
           <p>姓名:{{item.realName}}</p>
           <p>单位:{{item.unit}}</p>
           <p>处室:{{item.officeRoom}}</p>
           <p>所属区域:{{item.area}}</p>
           <p>办公室:{{item.office}}</p>
           <p>座机:{{item.tel}}</p>
           <p>移动电话:{{item.phone}}</p>
         </div>
         <van-button type="primary" size="large" class='button' v-if='!newButton' @click='gotolink(item)'>添加角色</van-button>
       </van-panel>
    </div>
   
   
  </div>
</template>

<script>
import Vue from 'vue'
import Axios from 'axios'
import Url from '@/api/index'
import Qs from 'qs'
import { NavBar, Field, CellGroup, Cell, Toast,RadioGroup, Radio, Collapse, CollapseItem, DatetimePicker, Popup, Button, Card, Panel } from 'vant';


export default {
  
  components:{
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
    [Toast.name]: Toast,
    [Panel.name]: Panel,
    [NavBar.name]: NavBar,
  },
  name: 'AddRole',
  data () {
    return {
      newButton:'',
      items:[]
      // msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    onClick(name, title) {
      this.newButton=name;
    },
    gotolink(item){
      this.$router.push({
        path:'/role',
        name:'Role',
        params:{ params:item }
      })
    }
  },
  created() {
     Axios.get(Url+'/gdSysUser/getUserList').then((res)=>{
      const data=res.data
        data.forEach((res)=>{
          let data=res
          let data1={'code':'DW','value':data.unit};
          let data2={'code':'CS','value':data.officeRoom};
          let data3={'code':'SSQY','value':data.area};
          Axios.post(Url+'/gdsysDictionary/getDataByCodeAndVal',Qs.stringify(data1)).then((res)=>{
            data.unit=(res.data)
          })
          Axios.post(Url+'/gdsysDictionary/getDataByCodeAndVal',Qs.stringify(data2)).then((res)=>{
            data.officeRoom=(res.data)
          })
          Axios.post(Url+'/gdsysDictionary/getDataByCodeAndVal',Qs.stringify(data3)).then((res)=>{
            data.area=(res.data)
          })
        
       })
        // data.realName=this.id;
        // data.unit=this.danweiIndex;
        // data.officeRoom=this.chushiIndex;
        // data.area=this.quyuIndex;
        // data.office=this.bangongju;
        // data.tel=this.zuoji;
        // data.phone=this.phone?this.phone:'';
       this.items=res.data
          // if(res.data.result==='success'){
          //   this.$router.push({
          //     path:'/success',
          //     name:'Success',
          //     params:{
          //       word1:'填写成功',word2:'返回查看个人信息'
          //     }
          //   })
          // }
        }) 
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .evaluate{
    margin-top: 20px;
  }
  
  .word{
    font-size: 0.5rem;
    height: 35px;
    line-height: 35px;
    color: #000;
    margin: 0;
    background: #fff;
    border: 0;
  }
  .word span{
    color:red;
  }
  .position{
    margin-left:10px;
  }
  .evaluate_list{
    overflow: hidden;
  }
 .evaluate_list>p{
    font-size: 0.27333rem;
    float: left;
    color: #323233;
    width: 160px;
    margin-left: 20px;
 }
 .border{
    border-bottom: 1px solid #eee;
    overflow:hidden;
 }
 .border>p{
   font-size: 0.27333rem;
   color: #323233;
 }
 .border>p:nth-child(1){
   float: left;
   margin-left: 15px;
 }
  .border>p:nth-child(2){
   float: right;
   margin-right: 15px;
 }
 .van-cell:not(:last-child)::after {
    border-bottom: 0.02667rem solid #fff!important;
  }

  .peple{margin-left: 15px;}

</style>

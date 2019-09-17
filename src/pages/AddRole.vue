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
           <p>姓名:{{item.name}}</p>
           <p>单位:{{item.danwei}}</p>
           <p>处室:{{item.chushi}}</p>
           <p>所属区域:{{item.quyu}}</p>
           <p>办公室:{{item.bangongshi}}</p>
           <p>座机:{{item.phone}}</p>
           <p>移动电话:{{item.phone}}</p>
         </div>
         <van-button type="primary" size="large" class='button' v-if='!newButton' @click='gotolink(item)'>添加角色</van-button>
       </van-panel>
    </div>
   
   
  </div>
</template>

<script>
import Vue from 'vue'
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
      items:[
        {'value':1,'xuhao':4,'name':'张三','bangonshi':'c204','miaoshu':'电脑蓝屏','danwei':'市场局','chushi':'维修一部','bangongshi':'三里河','quyu':'三里河','phone':'123123122131','duixiang':'电脑','time':'2019-09-18 13:28','state':'完成','danhao':'c123123123'},
        {'value':2,'xuhao':3,'name':'张三','bangonshi':'c201','miaoshu':'显示屏问题','danwei':'市场局','chushi':'维修一部','bangongshi':'三里河','quyu':'三里河','phone':'123123122131','duixiang':'电脑','time':'2019-09-18 13:28','state':'完成','danhao':'c223123123'},
         {'value':3,'xuhao':2,'name':'张三','bangonshi':'c202','miaoshu':'主机损坏','danwei':'市场局','chushi':'维修一部','bangongshi':'三里河','quyu':'三里河','phone':'123123122131','duixiang':'电脑','time':'2019-09-18 13:28','state':'完成','danhao':'c323123123'},
          {'value':4,'xuhao':1,'name':'张三','bangonshi':'c203','miaoshu':'主机损坏','danwei':'市场局','chushi':'维修一部','bangongshi':'三里河','quyu':'三里河','phone':'123123122131','duixiang':'电脑','time':'2019-09-18 13:28','state':'完成','danhao':'c423123123'},
      ]
      // msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    onClick(name, title) {
      this.newButton=name;
    },
    gotolink(){
      this.$router.push({
        path:'/role',
        name:'Role',
        params:{  }
      })
    }
  }
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

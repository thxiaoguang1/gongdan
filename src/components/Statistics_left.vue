<template>
  <div>
   
        <Datetime :required='required' @getTime='getTimeStart' :placeholder="placeholder1" :label='label1'></Datetime>
        <Datetime :required='required' @getTime='getTimeEnd' :placeholder="placeholder2" :label='label2'></Datetime>
         <dropdown :placeholder="placeholder3" :label='label3' :columns='columns3' @getValue='getName' :inputAlign='inputAlign' class="peple" :value='value' @v-if='!newButton'></dropdown>
          <dropdown :placeholder="placeholder4" :label='label4' :columns='columns4' @getValue='getDuixiang' :inputAlign='inputAlign' class="peple" :value='value' @v-if='!newButton'></dropdown>
          <dropdown :placeholder="placeholder5" :label='label5' :columns='columns5' @getValue='getDizhi' :inputAlign='inputAlign' class="peple" :value='value' @v-if='!newButton'></dropdown>
        <van-button type="primary" size="large" class="chaxun" @click="query">查询</van-button>
         <vxe-grid
          v-if='display'
          border
          resizable
          :columns="tableColumn"
          :data.sync="tableData"
          >
          </vxe-grid>
     
  </div>
</template>

<script>
import Vue from 'vue'
import vueTable from 'vue-table2'
import { NavBar, Tab, Tabs, Button,Field,Toast } from 'vant';
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
import Axios from 'axios'
import Datetime from '../components/Datetime'
import Dropdown from '../components/Dropdown'
import { mapGetters,mapActions } from "vuex";

Vue.use(VXETable)

export default {
  components:{
    vueTable,
    Datetime,
    Dropdown,
    [Field.name]: Field,
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Button.name]: Button,
    [Toast.name]: Toast,
  },
  name: 'Assign',
  computed:mapGetters(['getEndTime','getStartTime','getdanhao','getname','getduixiang','getdizhi']),
  data () {
    return {
      name:'',
      tableData:[],
      tableData2:[],
      placeholder3:'请选择维修人员',
      label3:'维修人员',
      columns3:['张三','李四','王二'],
      placeholder4:'请选择维修对象',
      label4:'维修对象',
      columns4:['电脑','显示器','座机'],
       placeholder5:'请选择地址',
      label5:'地址',
      columns5:['三里河','马甸'],
      value:'',
      display:false,
      required:true,
      inputAlign:'center',
      placeholder1:'请选择开始时间',
      label1:'开始时间',
      placeholder2:'请选择结束时间',
      label2:'结束时间',
      tableColumn: [
        { type: 'index', title: '序号',showOverflow: true },
        { field: 'name', title: '维修人',showOverflow: true},
        { field: 'completed', title: '已完成数量', showOverflow: true, 
          slots: 
            {
              
              default: ({ row }) => {
                return [
                  <p class="link" style="color: green;text-align:center" onClick={()=>this.onClickCompleted(row)}>{ row.completed }</p>
                ]
              }, 
            },
        },
         { field: 'notCompleted', title: '未完成数量', showOverflow: true,
          slots: 
            {
              
              default: ({ row }) => {
                return [
                  <p class="link" style="color: red;text-align:center" onClick={()=>this.onClickNotCompleted(row)}>{ row.notCompleted }</p>
                ]
              }, 
            },
           }
      ],
      newButton:0,
      // msg: 'Welcome to Your Vue.js App'
    }
  },
  created() {
    // this.tableData = window.MOCK_DATA_LIST.slice(0, 100)
  },
  methods: {
    ...mapActions(['addStartTime','addEndTime','addname','addduixiang','adddizhi']),
    onClick(name, title) {
      // console.log(name)
      this.newButton=name;
    },
    getName(value){
      const name={
        name:value
      }
    this.addname(name) // 获取子页面的value
    },
    getDuixiang(value){
      const duixiang={
        duixiang:value
      }
    this.addduixiang(duixiang) // 获取子页面的value
    },
    getDizhi(value){
      const dizhi={
        dizhi:value
      }
    this.adddizhi(dizhi) // 获取子页面的value
    },
    getTimeStart(value){
     const startTime={
       startTime:value
     }
     this.addStartTime(startTime)
    },
     getTimeEnd(value){
     const endTime={
       endTime:value
     }
     this.addEndTime(endTime)
    },
    onClickCompleted(value){
      console.log(value)
       this.$router.push({
        path:'/completed',
        name:'Completed',
        params:{ }
      })
    },
    onClickNotCompleted(value){
      console.log(value)
       this.$router.push({
        path:'/notcompleted',
        name:'NotCompleted',
        params:{ }
      })
    },
    query(){
      console.log(this.getStartTime.startTime)
      console.log(this.getEndTime.endTime)
      console.log(this.getname.name)
      console.log(this.getduixiang.duixiang)
      console.log(this.getdizhi.dizhi)
      if(this.getStartTime.startTime&&this.getEndTime.endTime){
        this.display=true;
      }else{
          Toast('请选择起止时间')
      } 
    },
  },
  
  created() {
    Axios.post('/api/test').then((res) => {
        this.tableData=res.data;
      }).catch((err) => {
        console.log(err)
      })
    Axios.post('/api/test2').then((res) => {
      this.tableData2=res.data;
    }).catch((err) => {
      console.log(err)
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

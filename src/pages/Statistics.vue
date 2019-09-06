<template>
  <div>
    <van-nav-bar 
    fixed
    title="统计"
    left-text
    />
    <van-tabs style="margin-top:45px" color='#07c160' animated @click='onClick'>
      
      <van-tab title="维修单统计">
        <Statistics-left></Statistics-left>
      </van-tab>
      <van-tab title="维修时间统计">
        <Statistics-center></Statistics-center>
      </van-tab>
      <van-tab title="当前未完成统计">
        <Statistics-right></Statistics-right>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Vue from 'vue'
import vueTable from 'vue-table2'
import { NavBar, Tab, Tabs, Button,Field,Toast } from 'vant';
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
import Axios from 'axios'
import StatisticsLeft from '../components/Statistics_left'
import StatisticsCenter from '../components/Statistics_center'
import StatisticsRight from '../components/Statistics_right'
import { mapGetters,mapActions } from "vuex";

Vue.use(VXETable)

export default {
  
  components:{
    vueTable,
    StatisticsLeft,
    StatisticsCenter,
    StatisticsRight,
    [Field.name]: Field,
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Button.name]: Button,
    [Toast.name]: Toast,
  },
  name: 'Assign',
  computed:mapGetters(['getEndTime','getStartTime','getdanhao','getname']),
  data () {
    return {
      name:'',
      tableData:[],
      tableData2:[],
       placeholder3:'请选择维修人员',
      label3:'维修人员',
      columns3:['张三','李四','王二'],
  
      display:false,
      required:true,
      inputAlign:'center',
      display2:false,
      placeholder1:'请选择开始时间',
      label1:'开始时间',
      placeholder2:'请选择结束时间',
      label2:'结束时间',
      tableColumn1: [
        { type: 'index', title: '序号',width: 40 },
        { field: 'name', title: '报修人',width: 65},
        { field: 'time', title: '维修时间', showHeaderOverflow: true },
        { field: 'address', title: '地址', showOverflow: true },
         { field: 'address', title: '地址', showOverflow: true }
      ],
      tableColumn2: [
        { type: 'index', title: '序号',width: 50 },
        { field: 'name', title: '姓名',width: 80},
        { field: 'time', title: '维修时间', showHeaderOverflow: true,width: 100 },
        { field: 'evaluate', title: '评价值', showOverflow: true },
        { field: 'address', title: '地址', showOverflow: true }
      ],
      newButton:0,
      // msg: 'Welcome to Your Vue.js App'
    }
  },
  created() {
    // this.tableData = window.MOCK_DATA_LIST.slice(0, 100)
  },
  methods: {
    ...mapActions(['addStartTime','addEndTime','addname']),
    onClick(name, title) {
      // console.log(name)
      this.newButton=name;
    },
    getValue(value){
      console.log(value)
      const name={
        name:value
        }
    this.addname(name) // 获取子页面的value
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
    query(){
      console.log(this.getStartTime.startTime)
      console.log(this.getEndTime.endTime)
      console.log(this.getname.name)
      if(this.getStartTime.startTime&&this.getEndTime.endTime){
        this.display=true;
      }else{
          Toast('请选择起止时间')
      } 
    },
    query2(){
      console.log(this.getStartTime.startTime)
      console.log(this.getEndTime.endTime)
      console.log(this.getdanhao.danhao)
       if(this.getStartTime.startTime&&this.getEndTime.endTime){
        this.display2=true;
      }else{
          Toast('请选择起止时间')
      } 
    }
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

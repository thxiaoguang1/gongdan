<template>
  <div>
    <Datetime :required='required' @getTime='getTimeStart' :placeholder="placeholder1" :label='label1'></Datetime>
    <!-- <dropdown :placeholder="placeholder6" :label='label6' :columns='columns6' @getValue='getTime' :inputAlign='inputAlign' class="peple" :value='value' @v-if='!newButton'></dropdown> -->
    <dropdown :placeholder="placeholder3" :label='label3' :columns='columns3' @getValue='getName' :inputAlign='inputAlign' class="peple" :value='name' @v-if='!newButton'></dropdown>
    <!-- <dropdown :placeholder="placeholder4" :label='label4' :columns='columns4' @getValue='getDuixiang' :inputAlign='inputAlign' class="peple" :value='value' @v-if='!newButton'></dropdown> -->
    <dropdown :placeholder="placeholder5" :label='label5' :columns='columns5' @getValue='getDizhi' :inputAlign='inputAlign' class="peple" :value='dizhi' @v-if='!newButton'></dropdown>
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
  computed:mapGetters(['getEndTime','getStartTime','getdanhao','getname','getduixiang','getdizhi','gettime']),
  data () {
    return {
      name:'',
      tableData:[],
      tableData2:[],
      placeholder3:'请选择维修人员',
      label3:'维修人员',
      columns3:['张三','李四','王二'],
      placeholder6:'请选择维修时间',
      label6:'维修时间',
      columns6:['1天','2天','3天','4天','5天','6天','7天','8天','9天','10天','11天','12天','13天','14天','15天','16天','17天','18天','19天','20天','21天','22天','23天','24天','25天','26天','27天','28天','29天','30天','30天以上'],
      placeholder4:'请选择维修对象',
      label4:'维修对象',
      columns4:['电脑','显示器','座机'],
       placeholder5:'请选择地址',
      label5:'地址',
      columns5:['三里河','马甸'],
      value:'',
      dizhi:'',
      name:'',
      display:false,
      required:true,
      inputAlign:'center',
      placeholder1:'请选择截止时间',
      label1:'截止时间',
      placeholder2:'请选择结束时间',
      label2:'结束时间',
      tableColumn: [
        { type: 'index', title: '序号',showOverflow: true },
        { field: 'startTime', title: '开始时间',width:100},
        { field: 'date', title: '天数', showOverflow: true, 
          slots: 
            {
              
              default: ({ row }) => {
                return [
                  <p class="link" style="color: red;text-align:center" onClick={()=>this.onClickNotCompleted(row)}>{ row.date }</p>
                ]
              }, 
            },
        },
        //  { field: 'endTime', title: '维修完成时间', showOverflow: true,
        //   slots: 
        //     {
              
        //       default: ({ row }) => {
        //         return [
        //           <p class="link" style="color: green;text-align:center" onClick={()=>this.onClickNotCompleted(row)}>{ row.endTime }</p>
        //         ]
        //       }, 
        //     },
        //    },
           { field: 'name', title: '维修人员', width: 100 },
      ],
      newButton:0,
      // msg: 'Welcome to Your Vue.js App'
    }
  },
  created() {
    // this.tableData = window.MOCK_DATA_LIST.slice(0, 100)
  },
  methods: {
    ...mapActions(['addStartTime','addEndTime','addname','addduixiang','adddizhi','addtime']),
    onClick(name, title) {
      // console.log(name)
      this.newButton=name;
    },
    getTime(value){
      const time={
        time:value
      }
    this.addname(time) // 获取子页面的value
    },
    getName(value){
      this.name=value;
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
      this.dizhi=value;
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
      console.log(this.getname.name)
      console.log(this.getduixiang.duixiang)
      console.log(this.getdizhi.dizhi)
      if(this.getStartTime.startTime){
        this.display=true;
      }else{
          Toast('请选择截止时间')
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

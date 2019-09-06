import Mock from 'mockjs'
 // 列表1
const data=[{
    id: 10001,
    name: '张三',
    num: '1',
    startTime: '2019-10-10',
    endTime:'2019-12-10',
    completed: '5',
    date:3,
    notCompleted: '1'
},{
    id: 10001,
    name: '李四',
    num: '3',
    startTime: '2019-10-10',
    evaluate: '3',
    date:3,
    endTime:'2019-12-10',
    address: '三里河',
    completed: '5',
    notCompleted: '1'
},{
    id: 10001,
    name: '赵丽颖',
    num: '11',
    date:3,
    startTime: '2019-10-10',
    endTime:'2019-12-10',
    evaluate: '5',
    address: '三里河',
    completed: '5',
    notCompleted: '1'
},{
    id: 10001,
    name: '王星',
    num: '10',
    date:3,
    startTime: '2019-10-10',
    endTime:'2019-12-10',
    evaluate: '4',
    address: '马甸',
    completed: '5',
    notCompleted: '1'
}];
 // 列表1
const data2=[{
    id: 10001,
    name: 'test1',
    time: '2019-10-10',
    evaluate: '5',
    address: '马甸'
},{
    id: 10001,
    name: 'test1',
    time: '2019-10-10',
    evaluate: '3',
    address: '三里河'
},{
    id: 10001,
    name: 'test1',
    time: '2019-10-10',
    evaluate: '5',
    address: '三里河'
},{
    id: 10001,
    name: 'test1',
    time: '2019-10-10',
    evaluate: '4',
    address: '马甸'
}];
  // 我要报修----已报修
  const yibaoxiao=[{
    name:'张三',
    danwei:'国家市场监督管理局',
    chushi:'开发一处',
    bangongju:'c205',
    address:'马甸',
    zuoji:'029-1111',
    phone:'18272827282',
    danhao:'c123123',
    duixiang:1,
    miaoshu:'电脑坏了，显示器不亮，加急处理电脑坏了，显示器不亮，加急处理电脑坏了，显示器不亮，加急处理',
    time:'2019-09-10'
  }]
const pjxq=[{state:'工单指派',state_time:'2019-01-22'},{state:'接受订单',state_time:'2019-01-22'},{state:'处理中',state_time:'2019-01-22'},{state:'处理完成',state_time:'2019-01-22'}]
Mock.mock('/api/test', 'post', data)
Mock.mock('/api/test2', 'post', data2)
Mock.mock('/api/yibaoxiao', 'post', yibaoxiao)
Mock.mock('/api/pjxq', 'post', pjxq)
export default Mock;
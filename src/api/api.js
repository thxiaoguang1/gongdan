import axios from 'axios'
let host = 'http://172.16.2.77:8080'
export const getDataByCode = params => { return axios.post(`${host}/gdsysDictionary/getDataByCode`, { params: params }) }
export const saveUser = params => { return axios.post(`${host}/gdSysUser/saveUser`,{ params: params }) }
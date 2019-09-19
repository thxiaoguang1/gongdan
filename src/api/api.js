import axios from 'axios'
import Qs from 'qs'
let host = 'http://172.16.2.77:8080'
export const getDataByCode = params => { return axios.post(`${host}/gdsysDictionary/getDataByCode`, Qs.stringify(params)) }
export const getDataByCodeAndVal = params => { return axios.post(`${host}/gdsysDictionary/getDataByCodeAndVal`, Qs.stringify(params)) }
export const editUser = params => { return axios.post(`${host}/gdSysUser/editUser`, Qs.stringify(params)) }
export const getRoles = () => { return axios.post(`${host}/gdRoles/getRoles`) }
export const saveUser = params => { return axios.post(`${host}/gdSysUser/saveUser`,Qs.stringify(params)) }
export const getUserList = params => { return axios.get(`${host}/gdSysUser/getUserList`) }
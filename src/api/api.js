import axios from 'axios'
import Qs from 'qs'
let host = 'http://172.16.2.77:8080'
export const getDataByCode = params => { return axios.post(`${host}/gdsysDictionary/getDataByCode`, Qs.stringify(params)) }
export const getDataByCodeAndVal = params => { return axios.post(`${host}/gdsysDictionary/getDataByCodeAndVal`, Qs.stringify(params)) }
export const editUser = params => { return axios.post(`${host}/gdSysUser/editUser`, Qs.stringify(params)) }
export const getRoles = () => { return axios.post(`${host}/gdRoles/getRoles`) }
export const saveUser = params => { return axios.post(`${host}/gdSysUser/saveUser`,Qs.stringify(params)) }
export const getUserList = () => { return axios.get(`${host}/gdSysUser/getUserList`) }
export const saveAdd = params => { return axios.post(`${host}/gdRepair/saveAdd`,Qs.stringify(params)) }
export const getRepairList = params => { return axios.post(`${host}/gdRepair/getRepairList`,Qs.stringify(params)) }
export const getRepairDetails = params => { return axios.post(`${host}/gdRepair/getRepairDetails`,Qs.stringify(params)) }
export const getRepairUserList = params => { return axios.post(`${host}/gdSysUser/getRepairUserList`,Qs.stringify(params)) }
export const repairAssigned = params => { return axios.post(`${host}/gdRepair/repairAssigned`,Qs.stringify(params)) }
export const getAssignList = params => { return axios.post(`${host}/gdRepair/getAssignList`,Qs.stringify(params)) }
export const getRepairById = params => { return axios.post(`${host}/gdRepair/getRepairById`,Qs.stringify(params)) }
export const getHandleList = params => { return axios.post(`${host}/gdRepair/getHandleList`,Qs.stringify(params)) }
export const repairProcess = params => { return axios.post(`${host}/gdRepair/repairProcess`,Qs.stringify(params)) }
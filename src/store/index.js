import Vue from "vue";
import Vuex from "vuex";
import repair from './modules/repair'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules:{
    repair,
  }
}) 
export default store;
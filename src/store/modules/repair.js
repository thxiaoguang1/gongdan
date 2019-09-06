const state={
    startTime:'',
    endTime:'',
    danhao:'',
    name:'',
    duixiang:'',
    dizhi:'',
    time:'',
}
const getters={
    getStartTime(payload){
        return payload.startTime
    },
    getEndTime(payload){
        return payload.endTime
    },
    getdanhao(payload){
        return payload.danhao
    },
    getname(payload){
        return payload.name
    },
    getduixiang(payload){
        return payload.duixiang
    },
    getdizhi(payload){
        return payload.dizhi
    },
    gettime(payload){
        return payload.time
    },
}
const mutations= {
    addStartTime(state,payload){
      state.startTime=payload;
    },
    addEndTime(state,payload){
        state.endTime=payload;
    },
    adddanhao(state,payload){
        state.danhao=payload;
    },
    addname(state,payload){
        state.name=payload;
    },
    addduixiang(state,payload){
        state.duixiang=payload;
    },
    adddizhi(state,payload){
        state.dizhi=payload;
    },
    addtime(state,payload){
        state.time=payload;
    },
   
};
const actions={
    addStartTime(state,payload){
        state.commit('addStartTime',payload)
    },
    addEndTime(state,payload){
        state.commit('addEndTime',payload)
    },
    adddanhao(state,payload){
        state.commit('adddanhao',payload)
    },
    addname(state,payload){
        state.commit('addname',payload)
    },
    addduixiang(state,payload){
        state.commit('addduixiang',payload)
    },
    adddizhi(state,payload){
        state.commit('adddizhi',payload)
    },
    addtime(state,payload){
        state.commit('addtime',payload)
    }
}
export default {state,getters,mutations,actions}
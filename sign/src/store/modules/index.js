const state = {
    longitude: '113.324520',
    latitude: '23.099994',
    list:[{
        title:"未开始",
        flag:true
    },{
        title:"未打卡",
        flag:false
    },{
        title:"未放弃",
        flag:false
    },{
        title:"全部",
        flag:false
    }],
    name:"",
    phone:"",
    time:"2019-07-01",
    addres:"",
    remarks:"",
    place:[{
        title:"南锣鼓巷",
        key:0
    },{
        title:"",
        key:1
    }]
}

const getter={}

const mutations = {
    upGetLocation(state,payload){
        state.longitude = payload.longitude;
        state.latitude = payload.latitude;
    },
    upIndex(state,payload){
        console.log(payload)
        state.list.map(item=>{
            item.flag = false;
        })
        state.list[payload.payload].flag = true;
    },
    changeTime(state,payload){
        console.log(payload)
        state.time = payload;
    },
    changeName(state,payload){
        state.name = payload;
    },
    changePhone(state,payload){
        state.phone = payload;
    },
    changeRemarks(state,payload){
        state.remarks = payload;
    }
}

const actions = {
    getLocation(state,payload){
        wx.getLocation({
            type: 'wgs84',
            success (res) {
                console.log('res...', res);
                state.commit('upGetLocation',res)
            }
        })    
    },
    getListDate(state,payload){
        wx.request({
            url:"127.0.0.1:7001/sign",
            methods:"GET",
            success(res){
                console.log(res.data)
            }
        })
    }
}

export default {
    namespaced:true,
    state,
    getter,
    mutations,
    actions
}
import request from '@/utils/request';

const state = {
    openid:'',
    phone:'',
    longitude: '113.324520',
    latitude: '23.099994',
    list:[{
        title:"未开始",
        flag:true,
        key:-1
    },{
        title:"已打卡",
        flag:false,
        key:0
    },{
        title:"已放弃",
        flag:false,
        key:1
    },{
        title:"全部",
        flag:false,
        key:2
    }],
    name:"",
    phone:"",
    time:"2019-07-01",
    addres:"",
    remarks:"",
    places:[{
        title:"南锣鼓巷",
        key:0
    },{
        title:"a",
        key:1
    },{
        title:"abc",
        key:2
    },{
        title:"de",
        key:3
    },{
        title:"ade",
        key:4
    }],
    lists:[],
    data:[],
    key:-1,
    ress:'',
    searches:[]
}

const getter={}

const mutations = {
    getCode(state,payload){
        state.openid = payload.openid;
        state.phone = payload.phone;
    },
    upGetLocation(state,payload){
        state.longitude = payload.longitude;
        state.latitude = payload.latitude;
    },
    upIndex(state,payload){
        state.key = state.list[payload.payload].key;
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
    },
    getList(state,payload){
        state.lists = payload; 
        state.data = state.lists.filter(item=>item.status === state.key);
        if(state.key===2){
            state.data = state.lists;
        }
    },
    search(state,payload){
        state.ress = payload.value;
        let data = [];
        state.places.map(item=>{
            if(item.title.indexOf(payload.value) === -1){
                return ;
            }else{
                data.push(item)
            }
        })
        state.searches = data
    },
    choose(state,payload){
        console.log(payload.key)
        let item = state.places.filter(item=>item.key === payload.key);
        state.ress = item[0].title;
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
        let res = request.get('/sign');
        res.then((res)=>{
            state.commit('getList',res.data)
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
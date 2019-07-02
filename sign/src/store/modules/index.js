import { login, getSign, addSign, signDetail } from '@/services';

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
    time:'2019-07-01',
    addres:"",
    latitudes:0,
    longitudes:0,
    remarks:"",//备注信息
    years:'',
    months:'',
    lists:[],
    data:[],
    key:-1,
    ress:'',
    addresss:"",
    searches:[],
    id:'',
    detail:{}
}

const getter={}

const mutations = {
    getCode(state,payload){
        state.openid = payload.openid;
        // state.phone = payload.phone;
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
    getTime(state,payload){
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth()+1;
        state.years = year;
        state.months = month >= 10 ? month : '0' + month;
        state.time = date.toLocaleString().replace(/\//g,  "-").replace(/上午|下午/,'');
        let lastIndex = (state.time).lastIndexOf(':');
        state.time = (state.time).substring(0,lastIndex);
    },
    changeTime(state,payload){
        state.time = payload.time;
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
        state.data.map(item=>{
            if(item.address.substring(0,1) === '{'){
                item.address = JSON.parse(item.address).address
            }
        })
    },
    getRess(state,payload){
        var sug = [];
        for (var i = 0; i < payload.data.length; i++) {
           sug.push({ // 获取返回结果，放到sug数组中
               title: payload.data[i].title, 
               id: payload.data[i].id,
               addr: payload.data[i].address,
               city: payload.data[i].city,
               district: payload.data[i].district,
               latitude: payload.data[i].location.lat,
               longitude: payload.data[i].location.lng
           });
        }
        state.searches = sug;
        state.ress = payload.value;
    },
    choose(state,payload){
        let item = state.searches.filter(item=>item.id === payload.key);
        state.ress = item[0].title;
        state.latitudes = item[0].latitude;
        state.longitudes = item[0].longitude;
        state.addresss = item[0].city+item[0].district+item[0].addr;
        state.id = item[0].id;
    },
    upDetail(state,payload){
        state.detail = payload
    }
}

const actions = {
    getLocation(store,payload){
        wx.getLocation({
            type: 'wgs84',
            success (res) {
                store.commit('upGetLocation',res)
            }
        })    
    },
    async getListDate(store,payload){
        let data = await getSign();
        console.log(data)
        store.commit('getList',data.data)
    },
    //登录
    async getCode(store,payload){
        let data = await login(payload.code);
        store.commit('getCode',{
            openid:data.data.openid,
            phone:data.data.phone
        })
        wx.setStorage({
            key:"openid",
            data:res.data.openid
        })
        //  .then(res=>{
        //     if(res.code===0){
        //         store.commit("getCode",{
        //             openid:res.data.openid,
        //             phone:res.data.phone
        //         })
        //         wx.setStorage({
        //             key:"openid",
        //             data:res.data.openid
        //         })
        //     }
        // })
    },
    addSigns(store,payload){//添加面试
        addSign({
            company:store.state.name,
            phone:store.state.phone,
            address:store.state.addresss,
            form_id:store.state.id,
            latitude:store.state.latitudes,
            longitude:store.state.longitudes,
            start_time:new Date(store.state.time).getTime(),
            description:store.state.remarks
        }).then(res=>{
            console.log(res)
            if(res.code === 0){
                wx.showModal({
                    title: '温馨提示',
                    content: '添加面试成功',
                    showCancel:false,
                    confirmText:"确定",
                    success (res) {
                        if (res.confirm) {
                            // state.name = '';
                            // state.phone = '';
                            // state.ress = '';
                            // state.remarks = '';
                            wx.navigateTo({
                                url: '/pages/order/main'
                            })
                        }
                    }
                })
            }
        })
    },
    //面试详情
    getDetail(store,payload){
        signDetail(payload.id).then(res=>{
            console.log(res);
            store.commit('upDetail',res.data)
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
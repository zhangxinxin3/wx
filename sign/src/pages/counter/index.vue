<template>
    <div class="wrapper">
        <div class="title">面试信息</div>
        <div class="wrap">
            <div class="wrapItem">
                <p>公司名称</p>
                <input type="text" placeholder="请输入公司名称" :value="name" v-model="name" @input="changeName">
            </div>
            <div class="wrapItem">
                <p>公司电话</p>
                <input type="text" placeholder="请输入面试联系人电话" :value="phone" v-model="phone" @input="changePhone">
            </div>
            <div class="wrapItem">
                <p>面试时间</p>
                <picker class="picker" mode="multiSelector" @change="bindMultiPickerChange" :value="multiIndex" :range="newMultiArray">
                    <span>{{time}}</span>
                </picker>
                <icon type="warn" size="24" color="#197DBF" @click="tobel"></icon>
            </div>
            <div class="wrapItem">
                <p>面试地址</p>
                <div @click="choose" v-if="ress === ''">选择面试地址</div>
                <div @click="choose" v-else>{{ress}}</div>
            </div>
        </div>
        <div class="title">备注信息</div>
        <div class="wrapElse">
            <textarea class="text" :value="remarks" @input="changeRemarks" placeholder="请输入备注信息"></textarea>    
        </div>
        <button class="btn" @click="sure">确定</button>
    </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
    data(){
        return {
            res:/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
            multiArray: [],
            multiIndex: [0, 0, 0]
        }
    },

    created(){
        this.$store.commit('index/getTime');
    },
    
    computed: {
        newMultiArray(){
            let array = [];
            const date = new Date();
            const days = [];
            const hours = [];
            const minutes = [];
            const year = date.getFullYear();
            const month = date.getMonth()+1;
            const day = date.getDate();
            const hour = date.getHours();

            var dates=new Date(year,month,0);
            var dayes=dates.getDate();

            console.log(typeof hour)

            for (let i = day; i <= day+10; i++) {
                days.push(i);
            }

            array.push(days);

            for (let i = hour+1; i < 24; i++) {
                hours.push(i);
            }
            
            for(let i = 0;i <= hour; i++){
                hours.push(i);
            }
            
            array.push(hours);

            
            for (let i = 0; i < 60; i++) {
                if(i%10 === 0){
                    minutes.push(parseInt(i/10)+'0');
                }
            }
            array.push(minutes);
            return array;
        },
        ...mapState({
            name:state=>state.index.name,
            phone:state=>state.index.phone,
            time:state=>state.index.time,
            remarks:state=>state.index.remarks,
            ress:state=>state.index.ress,
            years:state=>state.index.years,
            months:state=>state.index.months
        })
    },
    methods: {
        choose(){
            wx.navigateTo({
                url:"../../pages/address/main"
            })
        },
        tobel(){
            wx.showToast({
                title: '面试前一个小时我们会提醒你哦',
                icon:"none",
                duration: 2000
            })
        },
        changeName(e){//公司名称
            this.$store.commit('index/changeName',e.target.value);
        },
        changePhone(e){//电话
            this.$store.commit('index/changePhone',e.target.value);
            
        },
        changeRemarks(e){//备注信息
            this.$store.commit('index/changeRemarks',e.target.value);
        },
        sure(){//点击确定
            if(this.name === ''){
                wx.showToast({
                    title: '请输入公司名称',
                    icon:"none",
                    duration: 2000
                })
            }else{
                if(this.res.test(this.phone)){
                    if(this.ress === ''){
                        wx.showToast({
                            title: '请选择公司地址',
                            icon:"none",
                            duration: 2000
                        })
                    }else{
                        this.$store.dispatch('index/addSigns')
                    }
                }else{
                    wx.showToast({
                        title: '请输入面试联系人的手机或座机',
                        icon:"none",
                        duration: 2000
                    })
                }
            }
        },
        bindMultiPickerChange(e) {
            this.multiIndex = e.target.value;
            const index = this.multiIndex;
            const day = this.newMultiArray[0][index[0]];
            const hour = this.newMultiArray[1][index[1]];
            const minute = this.newMultiArray[2][index[2]];
            let time = this.years + "-" + this.months + "-" + day + " " + hour + ":" + minute;
            this.$store.commit('index/changeTime',{
                time
            })
        }
    }
}
</script>

<style scoped>
.wrapper{
    width: 100%;
    height: 100%;
    background:#eee;
    /* paddding-left */
}
.title{
    width: 100%;
    font-size:34rpx;
    padding:15rpx 0 15rpx 30rpx;
    box-sizing: border-box;
}
.wrap{
    width: 100%;
    padding-left:30rpx;
    box-sizing: border-box;
    background:#fff;
    display: flex;
    flex-direction: column;
}
.wrapItem{
    width: 100%;
    height: 100rpx;
    padding:18rpx 0;
    box-sizing: border-box;
    border-bottom:solid 1px #ccc;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.wrapItem p{
    font-size: 30rpx;
    width: 170rpx;
}
.wrapItem input,.wrapItem div,.wrapItem .picker{
    flex:1;
    font-size: 30rpx;
}
.wrapItem icon{
    margin-right: 10px;
}
.wrapElse{
    width:100%;
    padding:30rpx;
    box-sizing: border-box;
    background:#fff;
}
.text{
    width: 100%;
    height:200rpx;
    border:solid 1px #ccc;
    font-size: 30rpx;
    padding:5rpx;
    box-sizing: border-box;
}
.btn{
    width: 100%;
    height:100rpx;
    background:#999;
    color:#fff;
}
</style>

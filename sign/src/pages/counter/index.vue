<template>
    <div class="wrapper">
        <div class="title">面试信息</div>
        <div class="wrap">
            <div class="wrapItem">
                <p>公司名称</p>
                <input type="text" placeholder="请输入公司名称" :value="name" v-model="message" @input="changeName">
            </div>
            <div class="wrapItem">
                <p>公司电话</p>
                <input type="text" placeholder="请输入面试联系人电话" :value="phone" v-model="message" @input="changePhone">
            </div>
            <div class="wrapItem">
                <p>面试时间</p>
                <!-- <picker class="picker" mode="date" :value="time" start="2019-06-28" end="2020-09-01" @change="bindDateChange">
                    <div>
                        {{time}}
                    </div>
                </picker> -->
                <picker class="picker" mode="multiSelector" @change="bindMultiPickerChange" :value="multiIndex" :range="newMultiArray">
                    <span>{{time}}</span>
                </picker>
                <icon type="warn" size="24" color="#197DBF" @click="tobel"></icon>
            </div>
            <div class="wrapItem">
                <p>面试地址</p>
                <div @click="choose">选择面试地址</div>
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
            time: "2019-7-1 12:00",
      multiArray: [],
      multiIndex: [0, 0, 0],
      years : '',
      months : ''
        }
    },


    created(){
        const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth()+1;
      this.years = year;
      this.months = month >= 10 ? month : '0' + month;
    },
    
    computed: {
        
        newMultiArray: () => {
      let array = [];
      const date = new Date();
      const days = [];
      const hours = [];
      const minutes = [];
      for (let i = 1; i <= 31; i++) {
        if (i < 10) {
          i = "0" + i;
        }
        days.push("" + i);
      }
      array.push(days);
      for (let i = 0; i < 24; i++) {
        if (i < 10) {
          i = "0" + i;
        }
        hours.push("" + i);
      }
      array.push(hours);
      for (let i = 0; i < 60; i++) {
        if (i < 10) {
          i = "0" + i;
        }
        minutes.push("" + i);
      }
      array.push(minutes);
      return array;
    },
        ...mapState({
            name:state=>state.index.name,
            phone:state=>state.index.phone,
            time:state=>state.index.time,
            addres:state=>state.index.addres,
            remarks:state=>state.index.remarks
        })
    },
    methods: {
        choose(){
            wx.navigateTo({
                url:"../../pages/address/main"
            })
        },
        bindDateChange(e){//面试时间
            this.$store.commit("index/changeTime",e.mp.detail.value);
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
                console.log(this.res.test(this.phone))
                if(this.res.test(this.phone)){
                    if(this.addres === ''){
                        wx.showToast({
                            title: '请选择公司地址',
                            icon:"none",
                            duration: 2000
                        })
                    }else{
                        wx.showModal({
                            title: '温馨提示',
                            content: '添加面试成功',
                            showCancel:false,
                            confirmText:"确定",
                            success (res) {
                                if (res.confirm) {
                                    wx.navigateTo({
                                        url: '../order/main'
                                    })
                                }
                            }
                        })
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
      console.log("当前选择的时间", this.multiIndex);
      const index = this.multiIndex;
      console.log(this.newMultiArray)
      const day = this.newMultiArray[0][index[0]];
      const hour = this.newMultiArray[1][index[1]];
      const minute = this.newMultiArray[2][index[2]];
      this.time = this.years + "-" + this.months + "-" + day + " " + hour + ":" + minute;
      this.$store.commit('index/changeTime',{
          time:this.time
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

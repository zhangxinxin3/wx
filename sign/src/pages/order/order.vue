-<template>
    <div class="wrapper">
        <div class="wrapTop">
            <div v-for="(item,index) in list" 
                :key="index" 
                :class="item.flag?'active':''" 
                @click="tab(index)">
                {{item.title}}
            </div>
        </div>
        <!-- <div>
            当前分类还没有面试！
        </div> -->
        <div class="wrap">
            <div class="wrapItem">
                <div class="itemLeft">
                    <p>a</p>
                    <span>北京市通州区徐尹路</span>
                    <p>面试时间:2019-06-29 09:00</p>
                </div>
                <div class="itemRight">
                    <span>已放弃</span>
                    <span>未提醒</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapState,mapActions } from 'vuex';

export default {
    data(){
        return {
            index:0
        }
    },
    computed:{
        ...mapState({
            list:state=>state.index.list
        })
    },
    methods:{
        tab(index){
            this.index = index;
            this.$store.commit({
                type:"index/upIndex",
                payload:index
            })
        },
    },
    created(){
        this.$store.dispatch('index/getListDate')
    }

}
</script>

<style scoped>
.wrapper{
    width: 100%;
    height: 100%;
    background: #eee;
    display: flex;
    flex-direction: column;
}
.wrapTop{
    width: 100%;
    height:100rpx;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-top:solid 1px #ccc;
    background:#fff;
    margin-bottom:30rpx;
}
.wrapTop>div{
    height: 100%;
    display: flex;
    align-items: center;
}
.active{
    border-bottom:solid 1px #ccc;
    color:#197dbf;
}
.wrap{
    flex:1;
    width: 100%;
    display: flex;
    flex-direction: column;
    background:#fff;
}
.wrapItem{
    width: 100%;
    padding:20rpx 30rpx;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
}
.itemLeft{
    height: 100%;
    display: flex;
    flex-direction: column;
}
.itemLeft p{
    margin:20rpx 0;
    font-size: 34rpx;
}
.itemLeft span{
    color:#ccc;
    font-size:30rpx;
}
.itemRight{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}
.itemRight span{
    padding:10rpx;
    box-sizing: border-box;
    font-size: 32rpx;
}
.itemRight span:nth-child(1){
    color:#f56c6c;
    background:hsla(0,87%,69%,.1);
}
.itemRight span:nth-child(2){
    color:#909399;
    background:hsla(220,4%,58%,.1);
}
</style>

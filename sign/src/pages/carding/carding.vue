<template>
    <div class="wrapper">
        <div class="wrap">
            <div class="wrapItem">
                <p>面试地址：</p>
                <div>北京市通州区徐尹路北京市大兴区北环西路6号</div>
            </div>
            <div class="wrapItem">
                <p>面试时间：</p>
                <div>2019-06-29 09:002019-06-30 21:00</div>
            </div>
            <div class="wrapItem">
                <p>联系方式：</p>
                <div>15345678910</div>
            </div>
            <div class="wrapItem">
                <p>是否提醒：</p>
                <div>未提醒</div>
            </div>
            <div class="wrapItem">
                <p>面试状态：</p>
                <div>未开始</div>
            </div>
            <div class="wrapItem">
                <p>取消提醒：</p>
                <div>
                    <switch/>
                </div>
            </div>
        </div>
        <div class="btns">
            <button class="go">去打卡</button>
            <button class="giveUp">放弃面试</button>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.wrap{
    width: 100%;
    display: flex;
    flex-direction: column;
    border-top:solid 1px #ccc;
    border-bottom:solid 1px #ccc;
    padding-left:30rpx;
    box-sizing: border-box;
}
.wrapItem{
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom:solid 1px #ccc;
    padding:20rpx;
    box-sizing: border-box;
    justify-content: space-between;
}
.wrapItem:last-child{
    border-bottom: none;
}
.wrapItem>p{
    width: 160rpx;
    margin-right:20rpx;
    font-size: 30rpx;
    color:#999;
}
.wrapItem div{
    flex:1;
    font-size:30rpx;
}
.btns{
    width: 100%;
    display: flex;
    padding:30rpx 0;
    box-sizing: border-box;
    margin-top:30rpx;
}
.btns button{
    flex:1;
    margin:0 30rpx;
    height:100rpx;
}
.go{
    background:blue;
    color:#fff;
}
.giveUp{
    background:red;
    color:#fff;
}
</style>

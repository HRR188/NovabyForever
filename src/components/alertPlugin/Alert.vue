<template>
    <div class="alert-container" @click="cancel">
        <div class="alert">
            <p class="message">{{message}}</p>
            <p class="red-msg" v-if="redMsg">{{redMsg}}</p>
            <img src="../../assets/images/icon-close.png" alt="" v-if="type === 'confirm'">
            <div class="btn-container" v-if="type === 'confirm'">
                <div class="cancelTxt btn btn-default" v-on:click.stop="cancel()">{{cancelTxt}}</div>
                <div class="confirmTxt btn btn-default-border" v-on:click.stop="confirm()">{{confirmTxt}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import lockScreen from '../../mixins/lockScreen/lockScreen'

    export default {
        name:'alert',
        mixins: [lockScreen],
    };
</script>

<style>
    .alert-container{
        width: 100%;
        height: 100%;
        position: fixed;
        top:0;
        left:0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(59,59,59,0.53);
        z-index: 11000;
    }
    .alert-container img{
        position: absolute;
        top:10px;
        right:10px;
        width: 14px;
        height: 14px;
    }
    .alert-container .alert{
        width: 610px;
        height: auto;
        background: #FFFFFF;
        border-radius: 4px;
        font-size: 18px;
        padding-top: 66px;
        padding-bottom: 48px;
        text-align: center;
    }
    .alert-container .message{
        color: #515254;
        width: 100%;
        padding:0 10px;
        font-size: 18px;
    }
    .alert-container .red-msg{
        font-size: 16px;
        color: #EA6264;
        line-height: 32px;
    }
    .alert-container .btn-container{
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .alert-container .btn-container .btn{
        border-radius: 100px;
        width: 133px;
        height: 34px;
        font-size: 16px;
        line-height: 34px;
        margin: 40px 13px 0;
    }
</style>
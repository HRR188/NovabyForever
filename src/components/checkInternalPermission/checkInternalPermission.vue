<template>
    <div class="alert-container" @click="cancel">
        <div class="alert" @click.stop>
            <p class="message">Access keychain</p>
            <img class="close" src="../../assets/images/icon-close.png" v-on:click.stop="cancel">
            <div class="key-chain">
                <input type="text" placeholder="Access keychain" v-model="keyChain">
            </div>
            <p class="red-msg" v-if="alertMsg">{{alertMsg}}</p>
            <div class="btn-container">
                <div class="btn btn-default" v-on:click.stop="confirm" v-lang.submit></div>
                <div class="btn btn-default-border" v-on:click.stop="cancel" v-lang.cancel></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'check-internal-permission',
    }
</script>

<style scoped lang="scss">
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
        .alert{
            padding:24px;
            position: relative;
            .close{
                position: absolute;
                top:10px;
                right:10px;
                width: 14px;
                height: 14px;
            }
            .message{
                font-size: 18px;
                color: #515254;
                text-align: center;
                margin-bottom: 30px;
            }
            .key-chain{
                position: relative;
                width: 100%;
                input{
                    border: 1px solid #D2D2D2;
                    border-radius: 100px;
                    width: 100%;
                    height: 36px;
                    font-size: 14px;
                    color: #9292A0;
                    padding-left: 37px;
                }
                &:after{
                    content:url("../../assets/images/icon_password.png");
                    width: 11px;
                    position: absolute;
                    top:10px;
                    left: 16px;
                }
            }
            .red-msg{
                font-size: 12px;
                color: #EA6264;
                line-height: 32px;
                text-align: left;
                position: relative;
                &:before{
                    content:url("../../assets/images/icon_alert.png");
                    width: 11px;
                    margin-right: 7px;
                    margin-top: 2px;
                }
            }
            .btn-container{
                width: 100%;
                display: flex;
                justify-content: center;
                .btn{
                    border-radius: 100px;
                    width: 133px;
                    height: 34px;
                    font-size: 16px;
                    line-height: 34px;
                    margin: 40px 13px 0;
                }
            }
        }
    }
</style>
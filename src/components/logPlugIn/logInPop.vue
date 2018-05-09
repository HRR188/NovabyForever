<template>
    <div class="log-in-pop" @click.stop="">
        <span class="close" @click="closePop"></span>
        <h4 v-lang.signIn></h4>
        <div class="auto">
            <div class="email">
                <span></span>
                <input type="text" name="email" :placeholder="translate('emailAddress')" v-model="email">
            </div>
            <div class="password">
                <span></span>
                <input type="password" name="password" :placeholder="translate('password')" v-model="password" maxlength="20">
            </div>
            <!--<label>-->
            <!--<input type="checkbox" name="remember" checked="remember">Remember me-->
            <!--</label>-->
            <span class="errorMsg">{{errorMessage}}</span>
            <button class="btn btn-default" @click="emitLogin" v-lang.si></button>
            <div class="clearfix login-links">
                <a class="float-left" @click="emitSwitch" v-lang.cn></a>
                <a class="float-right" @click="emitForgot" v-lang.fo></a>
            </div>
            <!--<div class="or" style="display:none">-->
            <!--<div></div>-->
            <!--<p class="text-center">OR</p>-->
            <!--<div></div>-->
            <!--</div>-->
            <!--<div class="links-login clearfix" style="display:none">-->
            <!--<a href="" class="float-left">-->
            <!--<img src="../assets/images/project-fb.png" alt="">-->
            <!--Signin with Fackbook-->
            <!--</a>-->
            <!--<a href="" class="float-right">-->
            <!--<img src="../assets/images/project-tw.png" alt="">-->
            <!--Signin with Twitter-->
            <!--</a>-->
            <!--</div>-->
        </div>
        <!--<div class="form-note" v-show="noteStatus">{{vuerifyStr}}</div>-->
        <div class="bottom"></div>
    </div>
</template>

<script>
    export default {
        name: 'log-in-pop',
        props:{
            closePop:{
                required:true
            },
            errorMessage:{
                required:true
            }
        },
        data(){
            return {
                email:'',
                password:''
            }
        },
        messages:{
            en:{
                si:'Sign in',
                cn:'Create new account',
                fo:'I forgot my password'
            },
            zh:{
                si:'登录',
                cn:'创建新账户',
                fo:'忘记密码'
            }
        },
        methods:{
            emitSwitch:function () {
                this.$emit('switchStatus')
            },
            emitLogin:function () {
                let vm = this;
                this.$emit('logIn',{
                    email:vm.email,
                    password:vm.password
                })
            },
            emitForgot:function () {
                this.$emit('forgot')
            }
        }
    }
</script>

<style scoped lang="scss">
    .log-in-pop{
        width:512px;
        background-color: #fff;
        border-radius: 10px;
        position: relative;
        >.auto{
            width:408px;
            label{
                [type=checkbox]{
                    width:12px;
                    height:12px;
                    background: #FFFFFF;
                    border: 1px solid #BFBFBF;
                    border-radius: 2px;
                    display: inline-block;
                    margin-right:8px;
                }
                font-size: 12px;
                color: #9B9B9B;
            }
            button{
                width:100%;
                height:36px;
                text-align: center;
                line-height: 36px;
                margin-top:15px;
                font-size: 14px;
            }
        }
        .email,.password{
            position: relative;
            margin-bottom:15px;
            input{
                display: block;
                width:100%;
                height:36px;
                background: #F7F7F8;
                border: 1px solid #E8E8EA;
                border-radius: 100px;
                padding-left:50px;
                line-height: 36px;
                font-size: 14px;
                color: #9292A0;
            }
            span{
                position: absolute;
                display: inline-block;
                background-image: url(../../assets/images/login-sprite.png);
                background-repeat: no-repeat;
                left:25px;
            }
        }
        .email{
            span{
                width:15px;
                height:12px;
                top:13px;
                background-position: -21px 0;
            }
        }
        .password{
            span{
                width:12px;
                height:15px;
                top:10px;
                background-position: -40px 0;
            }
        }
        .login-links{
            margin:22px 0 54px;;
            a{
                font-size: 12px;
                color: #9B9B9B;
                cursor: pointer;
                &:hover{
                    text-decoration: underline;
                }
            }
        }
        .or{
            position: relative;
            p{
                font-size: 12px;
                color: #2A2A36;
            }
            >div{
                width:172px;
                height:1px;
                background-color:#E8E8EA;
                position: absolute;
                top:5px;
            }
            >div:first-child{
                left:0;
            }
            >div:last-child{
                right:0;
            }
        }
        .links-login{
            margin-top:22px;
            a{
                display: flex;
                width:195px;
                height:36px;
                font-size: 12px;
                color: #fff;
                align-items: center;
                justify-content: center;
                border-radius: 4px;
                &:first-child{
                    background: #38558F;
                    img{
                        width:10px;
                    }
                }
                &:last-child{
                    background: #07BBEE;
                    img{
                        width:22px;
                    }
                }
                img{
                    height: auto;
                    vertical-align: middle;
                    display: inline-block;
                    margin-right:15px;
                }
            }

        }
        .form-note{
            position: absolute;
            transform: translate(-50%,-50%);
            position: absolute;
            top: 50%;
            left: 50%;
            background-color: #2a2a36;
            font-size:16px;
            padding:20px;
            color:#fff;
            border-radius: 10px;
        }
        .bottom{
            position: absolute;
            width: 100%;
            height: 8px;
            background-image: linear-gradient(-198deg, #FFADAE 0%, #EA6264 100%);
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            left: 0;
            bottom: 0;
        }
    }
    .close{
        display: block;
        width:14px;
        height:14px;
        position: absolute;
        right:20px;
        top:20px;
        background: url(../../assets/images/login-sprite.png) 0 0 no-repeat;
        cursor: pointer;
    }
    h4{
        font-size: 24px;
        color: #2A2A36;
        text-align: center;
        font-weight: normal;
        margin:45px 0 35px;
    }
    .errorMsg{
        font-size: 12px;
        color:#EA6264;
    }
</style>

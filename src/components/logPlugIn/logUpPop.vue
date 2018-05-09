<template>
    <div class="log-up-pop" @click.stop>
        <transition name="fade" mode="out-in">
            <div class="log-up-box position-relative" v-if="!logUpStatus" key="logUp">
                <span class="close" @click="closePop"></span>
                <h1 class="text-center" v-lang.signUp></h1>
                <ul class="auto">
                    <li class="individual">
                        <a href="/sign-up" v-lang.ia></a>
                    </li>
                    <li class="business">
                        <a href="/business/one" v-lang.ba></a>
                    </li>
                </ul>
                <!--<ul>
                    <li class="clearfix">
                        <input type="text" class="float-left first-name" placeholder="First Name" v-model="firstName" maxlength="20">
                        <input type="text" class="float-right last-name" placeholder="Last Name" v-model="lastName" maxlength="20">
                    </li>
                    <li>
                        <input class="email" type="text" placeholder="Email" v-model="email">
                    </li>
                    <li>
                        <input class="password" type="password" placeholder="Password" v-model="password" maxlength="20">
                    </li>
                    <li style="margin-bottom: 10px;">
                        <input class="password" type="password" placeholder="Password again" v-model="conform" maxlength="20">
                    </li>
                </ul>
                <span class="errorMsg">{{errorMessage}}</span>
                <div class="accepted">
                    <label>
                        <input type="checkbox" v-model="accepted" >
                        You agree that you have read and accepted <a href="/termsAndConditions" target="_blank">Terms and Conditions</a>
                    </label>
                </div>
                <div class="submit-box">
                    <button @click="emitLogUp">Signup</button>
                </div>
                <div class="clearfix login-links">
                    <a class="float-left" @click="emitSwitch">Already have an account</a>
                    <a href="business/one" class="float-right" @click="closePop" style="color:#4990E2;">Create business account</a>
                </div>-->
                <div class="bottom"></div>
            </div>
            <!--<div v-else key="follow" class="follow">
                <div class="guide-box auto position-relative">
                    <h1 class="text-center">Meet great 3D artists</h1>
                    <form class="clearfix artists-list">
                        <a class="float-right" @click="closePop">Skip</a>
                        <ul class="float-left">
                            <li v-for="item in artists">
                                <img :src="item.user_avatar" alt="">
                                <div>
                                    <p>{{item.user_name}}</p>
                                    <span>{{item.user_job}}/{{item.user_country}}</span>
                                </div>
                                <label>
                                    <input type="checkbox" :value="item.user_id" v-model="item.checked">
                                </label>
                            </li>
                        </ul>
                        <button type="button" class="btn btn-default follow-btn" @click="emitFollow">Follow</button>
                    </form>
                    <div class="bottom"></div>
                </div>
            </div>-->
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'log-up-pop',
        props:{
            closePop:{
                required:true
            },
            errorMessage:{
                required:true
            },
            logUpStatus:{
                required:true
            },
            artistsList:{
                type:Array
            }
        },
        messages:{
            en:{
                ia:'Individual account',
                ba:'Business account'
            },
            zh:{
                ia:'个人账户',
                ba:'公司账户'
            }
        }
        /*watch:{
            artistsList:function () {
                this.artistsList.forEach(function (artist) {
                    artist.checked = true;
                });
                this.artists = this.artistsList;
                console.log(this.artists)
            }
        },
        computed: {
            checkedArtists: function () {
                return this.artists.filter(function (a) {
                    return a.checked
                }).map(function (a) {
                    return a.user_id
                })
            }
        },
        data(){
            return{
                logUpFinish:false,
                firstName:'',
                lastName:'',
                email:'',
                password:'',
                conform:'',
                accepted:false,
                artists:[]
            }
        },
        methods:{
            emitSwitch:function () {
                this.$emit('switchStatus')
            },
            emitLogUp:function () {
                if(this.accepted) {
                    let data = {
                        'email': this.email,
                        'password': this.password,
                        'password_confirmation': this.conform,
                        'firstname': this.firstName,
                        'lastname': this.lastName
                    };
                    this.$emit('logUp', data)
                }
            },
            emitFollow(){
                this.$emit('follow',this.checkedArtists)
            }
        }*/
    }
</script>

<style scoped lang="scss">
    .fade-enter-active + .fade-leave-active{
        transition: all .3s ease;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
    .log-up-box{
        width:512px;
        background-color:#fff;
        border-radius: 10px;
        padding:0 80px 1px 80px;
        >h1{
            font-size: 24px;
            color: #2A2A36;
            font-weight: normal;
            padding:42px 0;
        }
        .bottom{
            position: absolute;
            width:100%;
            height:8px;
            background-image: linear-gradient(-198deg, #FFADAE 0%, #EA6264 100%);
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            left:0;
            bottom:0;
            /*li{
                margin-bottom:15px;
                [type=text],[type=password]{
                    height:36px;
                    font-size: 14px;
                    background: #F7F7F8;
                    border: 1px solid #E8E8EA;
                    border-radius: 100px;
                    padding:8px 15px;
                }
                .first-name,.last-name{
                    width:220px;
                }
                .email,.password{
                    width:100%;
                }
            }
            .accepted{
                margin-top: 10px;
                label{
                    font-size: 12px;
                    color: #9B9B9B;
                    input{
                        display: inline-block;
                        width:12px;
                        height:12px;
                        margin-right:8px;
                    }
                    a{
                        color:#EA6264;
                        text-decoration: underline;
                    }
                }
            }
            .submit-box{
                margin:29px 0 0;
                button{
                    display: inline-block;
                    width:100%;
                    height:36px;
                    font-size: 14px;
                    color: #fff;
                    text-align: center;
                    background-color: #EA6264;
                    border-radius: 100px;
                    border:none;
                    cursor: pointer;
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
            }*/
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
        ul{
            width:345px;
            margin-bottom:64px;
            a{
                display: block;
                line-height: 72px;
                font-size: 18px;
                border-radius: 5px;
                text-align: center;
            }
        }
        .individual{
            margin-bottom:10px;
            a{
                border: 1px solid #EA6264;
                color: #EA6264;
                &:before{
                    content:'';
                    display: inline-block;
                    width:42px;
                    height:42px;
                    background-image: url(../../assets/images/individual-signup.png);
                    vertical-align: middle;
                    margin-right:30px;
                }
                &:hover{
                    background-color: rgba(234,98,100,0.15);
                }
            }
        }
        .business{
            a{
                border: 1px solid #4A90E2;
                color: #4A90E2;
                &:hover{
                    background-color: rgba(74,144,226,0.15);
                }
                &:before{
                    content:'';
                    display: inline-block;
                    width:42px;
                    height:42px;
                    background-image: url(../../assets/images/business-signup.png);
                    vertical-align: middle;
                    margin-right:30px;
                }
            }
        }
        /*.errorMsg{
            font-size: 12px;
            color:#EA6264;
        }*/
    }
    /*.guide-box{
        width:700px;
        height: 490px;
        background: #fff;
        border-radius: 10px;
        padding:0 50px;
        >h1{
            font-size: 24px;
            color: #2A2A36;
            font-weight: normal;
            margin:40px 0 30px;
        }
        .artists-list{
            text-align: center;
            >a{
                font-size: 14px;
                color: #9B9B9B;
            }
            >button{
                font-size: 14px;
            }
            ul{
                margin-top:10px;
                width:100%;
                padding-bottom:22px;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
            }
            li{
                float:left;
                width:290px;
                height:72px;
                border: 1px solid #D2D2D2;
                border-radius: 4px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom:18px;
                margin-right:0;
                &:nth-child(3n){
                    margin-right:0;
                }
                img{
                    display: inline-flex;
                    width:55px;
                    height:55px;
                    border-radius: 100%;
                    overflow: hidden;
                    margin-right:10px;
                }
                div{
                    width:150px;
                    margin-right:10px;
                    *{
                        overflow:hidden;;
                        text-overflow:ellipsis;
                        white-space:nowrap;
                        text-align:left;
                    }
                }
                p{
                    width:100%;
                    font-size: 18px;
                    color: #515254;
                }
                span{
                    display: block;
                    width:100%;
                    font-size: 12px;
                    color: #7A7A7A;
                    margin-top:5px;
                }
                input{
                    width:14px;
                    height:14px;
                }
                label{
                    display: inline-flex;
                    width:35px;
                }
            }
            .follow-btn{
                width: 117px;
                height: 32px;
            }
        }
        .bottom{
            position: absolute;
            width:100%;
            height:8px;
            background-image: linear-gradient(-198deg, #FFADAE 0%, #EA6264 100%);
            border-radius: 10px;
            left:0;
            bottom:0;
        }
    }*/
</style>

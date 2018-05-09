<template>
    <div class="password-container position-relative">
        <form @submit.prevent="handleSubmit">
            <p class="text-right">
                <button type="submit" class="save-btn btn-default btn" v-lang.save></button>
            </p>
            <div class="security-box auto position-relative">
                <ul class="password-box">
                    <li>
                        <p>{{translate('op')}}</p>
                        <input type="password" name="oldpassword" value="" v-model="oldpassword">
                    </li>
                    <li>
                        <p>{{translate('np')}}</p>
                        <input type="password" name="newpassword" v-model="newpassword">
                    </li>
                    <li>
                        <p>{{translate('cp')}}</p>
                        <input type="password" name="enterpassword" v-model="enterpassword">
                    </li>
                </ul>
                <!-- 手机修改密码暂时隐藏 start -->
                <!-- <p class="text-center tag-title" style="margin-top:55px;">Mobile</p>
                <ul class="mobile-box">
                  <li>
                    <p>Mobile:</p>
                    <select :disabled="disabledStatus">
                      <option>China (+86)</option>
                    </select>
                    <input type="text" class="mobile" v-model="mobile" :disabled="disabledStatus">
                    <button type="button" class="btn btn-default-border" v-show="editorBtn">editor</button>
                    <button type="button" class="btn btn-default-border" v-show="sendcodeBtn">Send Code</button>
                  </li>
                  <li>
                    <p>Verification:</p>
                    <input type="text" class="code">
                    <img v-if="mobileCodeStatus" src="../assets/images/validateFile-pass.png" alt="">
                    <img v-else="mobileCodeStatus" src="../assets/images/validateFile-fail.png" alt="">
                  </li>
                </ul> -->
                <!-- 手机修改密码暂时隐藏 end -->
                <div class="form-note" v-show="noteStatus">{{vuerifyStr}}</div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name:'personalPassword',
        data(){
            return {
                oldpassword:'',
                newpassword:'',
                enterpassword:'',
                sendcodeBtn:false,
                editorBtn:true,
                disabledStatus:true,
                mobile:"123456789",
                mobileCodeStatus:false,
                noteStatus:false,
                vuerifyStr:''
            }
        },
        messages:{
            en:{
                op:'Original password',
                np:'New password',
                cp:'Confirm password'
            },
            zh:{
                op:'原始密码',
                np:'新密码',
                cp:'确认新密码'
            }
        },
        // vuerify:{
        //     oldpassword:{
        //         test: /\w{6,}/,
        //         message: 'Please type password with 6-20 characters'
        //     },
        //     newpassword:{
        //         test: /\w{6,}/,
        //         message: 'Please type new password with 6-20 characters'
        //     },
        //     enterpassword:{
        //         test (val) {
        //             if(!this.newpassword == '' && this.newpassword == this.enterpassword) {
        //                 return true
        //             }
        //             else {
        //                 return false
        //             }
        //         },
        //         message: "These passwords don't match Try again"
        //     }
        // },
        computed: {
            errors () {
                return this.$vuerify.$errors
            },
            invalid () {
                return this.$vuerify.invalid
            }
        },
        methods:{
            handleSubmit () {
                const _this = this;
                // if (this.$vuerify.check()) {
                    let data = {
                        opass:this.oldpassword,
                        newpass:this.newpassword,
                        newpass_confirmation:this.enterpassword
                    };
                    this.$store.dispatch('changePassword',data).then(function (response) {
                        _this.vuerifyStr = response.msg;
                        _this.noteStatus = true;
                        setTimeout(() => {_this.noteStatus = false},1500);
                        if(response.code === 200) {
                            localStorage.clear();
                            _this.$store.commit('initUserDataMu');
                            _this.$router.push({path:'/sign-in'})
                        }
                    })
                // }
                // else{
                //     let errors = this.$vuerify.$errors;
                //     let errorArr = [];
                //     for(let val in errors) {
                //         errorArr.push(errors[val])
                //     }
                //     this.vuerifyStr = errorArr[0];
                //     this.noteStatus = true;
                //     setTimeout(() => {this.noteStatus = false},1500)
                // }
            }
        }
    }
</script>

<style lang="scss">
    .personal-warp{
        .password-container{
            .security-box{
                width:100%;
                background: #FFFFFF;
                border: 1px solid #F1F1F1;
                border-radius: 5px;
                padding:30px 42px;
                ul{
                    li{
                        margin-top:28px;
                    }
                    p{
                        font-size: 16px;
                        color: #515254;
                    }
                    input{
                        margin-top:5px;
                        height:36px;
                        background-color: #fff;
                        border: 1px solid #D2D2D2;
                        border-radius: 2px;
                        padding:10px;
                        font-size:16px;
                        display: inline-block;
                    }
                }
                .password-box{
                    input{
                        width:470px;
                        display: block;
                        margin-top:12px;
                    }
                }
            }
            .mobile-box{
                select{
                    background-color: #fff;
                    border:1px solid #D2D2D2;
                    border-radius:2px;
                    font-size: 16px;
                    color: #4A4A4A;
                    width:142px;
                    height:36px;
                    &[disabled]{
                        background-color:#E5E5E5;
                    }
                }
                .mobile{
                    width:185px;
                    margin-left:12px;
                    &[disabled]{
                        background-color: #E5E5E5;
                    }
                }
                button{
                    width:110px;
                    height:36px;
                    text-align: center;
                    line-height: 36px;
                    font-size: 16px;
                    margin-left:8px;
                }
                .code{
                    width:340px;
                }
                img{
                    vertical-align: middle;
                }
            }
        }
    }
</style>

<template>
    <section class="main">
        <div class="auto reset-password">
            <h1 class="text-center">{{translate('rp')}}</h1>
            <div class="form" v-if="reset">
                <ul>
                    <li class="email">
                        <p v-lang.ye></p>
                        <input type="text" v-model="email">
                        <button :disabled="sendCode" class="btn btn-default" @click="sendEmailCode">{{sendCodeBtnText}}</button>
                        <div v-show="sendCode">Resend after<span>{{time}}</span></div>
                    </li>
                    <li class="code">
                        <p v-lang.et></p>
                        <input type="text" v-model="pinCode">
                        <span v-show="pinCodeShow" class="no"></span>
                    </li>
                </ul>
                <div class="btn-warp flex">
                    <button class="btn btn-default upp" @click="validateCode" v-lang.next></button>
                </div>
            </div>
            <div class="form" v-else>
                <ul>
                    <li class="password">
                        <p v-lang.np></p>
                        <input type="password" maxlength="20" v-model="password">
                    </li>
                    <li class="password">
                        <p v-lang.cp></p>
                        <input type="password" maxlength="20" v-model="enterpassword">
                    </li>
                </ul>
                <div class="btn-warp flex">
                    <button class="btn btn-default upp" @click="changgePassword" v-lang.submit></button>
                </div>
            </div>
            <div class="form-note" v-show="noteStatus">{{vuerifyStr}}</div>
        </div>
    </section>
</template>
<script>
export default {
    name:'resetpassword',
    data(){
        return {
            reset:true,
            noteStatus:false,
            sendCodeBtnText:'Send Pin Code',
            vuerifyStr:'',
            email:'',
            sendCode:false,
            pinCode:'',
            pinCodeShow:false,
            time:60,
            password:'',
            enterpassword:''
        }
    },
    created(){
        if(this.language === 'zh'){
            this.sendCodeBtnText = '发送验证码'
        }
    },
    messages:{
        en:{
            rp:'Reset your password',
            ye:'Your Email address',
            et:'Enter the pin code',
            next:'next',
            np:'New Password',
            cp:'Confirm Password'
        },
        zh:{
            rp:'重置密码',
            ye:'你的邮件地址',
            et:'输入验证码',
            next:'下一步',
            np:'新的密码',
            cp:'确认密码'
        }
    },
    methods:{
        sendEmailCode(){
            const _this = this;
            let tem = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if(tem.test(this.email))
            {
                let data = {
                    email:this.email
                }
                this.$store.dispatch('sendEmailCodeAc',data).then(function (response) {
                    if(response.code == 200) {
                        _this.sendCode = true
                        _this.sendCodeBtnText = 'Resend pin code'
                        if(_this.language === 'zh'){
                            _this.sendCodeBtnText = '重新发送验证码'
                        }
                        let timeresult = setInterval(function(){
                            _this.time--
                            if(_this.time <= 0) {
                                clearInterval(timeresult)
                                _this.sendCode = false
                                _this.time = 60
                            }
                        },1000)
                    }
                });
            }
            else {
                this.vuerifyStr = 'Please type correct email address';
                if(this.language === 'zh'){
                    this.vuerifyStr = '请输入正确的电子邮箱地址'
                }
                this.noteStatus = true;
                let timer = setTimeout(() => {
                    this.noteStatus = false
                    clearTimeout(timer)
                },1500)
            }
        },
        validateCode(){
            const _this = this;
            if(this.pinCode != '') {
                let data = {
                    email:this.email,
                    code:this.pinCode
                }
                this.$store.dispatch('validationCodeAc',data).then(function (response) {
                    if(response.code == 200) {
                        _this.reset = false
                    }
                    else {
                        _this.pinCodeShow = true
                    }
                });
            }
            else {
                this.vuerifyStr = 'Please code';
                if(this.language === 'zh'){
                    this.vuerifyStr = '请输入验证码'
                }
                this.noteStatus = true;
                let timer = setTimeout(() => {
                    this.noteStatus = false
                    clearTimeout(timer)
                },1500)
            }
        },
        changgePassword(){
            const _this = this;
            if(this.password != '' && this.enterpassword != '') {
                if(this.password == this.enterpassword) {
                    let data = {
                        email:this.email,
                        code:this.pinCode,
                        password:this.password,
                        password_repeat:this.enterpassword
                    }
                    this.$store.dispatch('resetPasswordAc',data).then(function (response) {
                        if(response.code == 200) {
                            _this.vuerifyStr = response.msg
                            _this.noteStatus = true
                            setTimeout(() => {_this.noteStatus = false;_this.$router.push({path:'/sign-in'})},1000)
                        }
                        else {
                            _this.vuerifyStr = response.msg
                            this.noteStatus = true
                            let timer = setTimeout(() => {
                                this.noteStatus = false
                                clearTimeout(timer)
                            },1500)
                        }
                    });
                }
                else {
                    this.vuerifyStr = this.language === 'zh' ? '两次密码输入不一致' : 'The two passwords are inconsistent';
                    this.noteStatus = true;
                    let timer = setTimeout(() => {
                        this.noteStatus = false
                        clearTimeout(timer)
                    },1500)
                }

            }
            else {
                this.vuerifyStr = this.language === 'zh' ? '请输入6-20字符密码' : 'Please type password with 6-20 characters';
                this.noteStatus = true;
                let timer = setTimeout(() => {
                    this.noteStatus = false
                    clearTimeout(timer)
                },1500)
            }
        }
    }

}
</script>

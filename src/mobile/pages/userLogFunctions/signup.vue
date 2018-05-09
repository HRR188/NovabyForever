<template>
    <div class="mobile-main">
        <mobile-head></mobile-head>
            <div class="register-content">
                <div class="register-content-info">
                    <p v-lang.signUp></p>
                    <div class="register-form">
                        <form @submit.prevent="handleSubmit">
                            <div class="register-form-info">
                                <input type="text" name="email" :class="{deepcolor:haveQueryEmail}"
                                       :placeholder="translate('emailAddress')" v-model="email"
                                       :readonly="haveQueryEmail" />
                                <input type="text" class="bright-color"
                                       :placeholder="translate('firstName')" v-model="firstName" maxlength="20" />
                                <input type="text" class="bright-color"
                                       :placeholder="translate('lastName')" v-model="lastName" maxlength="20" />
                                <input class="bright-color" type="password" name="password" :placeholder="translate('password')"
                                       v-model="password" maxlength="20" />
                                <input class="bright-color" type="password" :placeholder="translate('conform')"
                                       v-model="conform" maxlength="20" />
                            </div>
                                <button type="submit" class="register-btn btn-default btn" >{{submitMsg.text}}</button>
                        </form>
                    </div>
                    <div class="form-note" v-show="noteStatus">{{vuerifyStr}}</div>
                </div>
            </div>
    </div>
</template>
<script>
    import mobileHead from '../../components/mobileHead.vue'

    export default {
        name: 'sign-up',
        data() {
            return {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                conform: '',
                accepted: true,
                noteStatus: false,
                vuerifyStr: '',
                submitMsg: {
                    text: 'Sign up',
                    status: false
                },
                haveQueryEmail: false,
                projectId: 0,
                goToNda: false,
                code: ''
            }
        },
        components:{
            mobileHead
        },
        messages: {
            en: {
                firstName: 'First name',
                lastName: 'Last name',
                email: 'Please type correct email address',
                password: 'Password',
                conform: "Passwords again",
                signUp: 'Sign up'
            },
            zh: {
                firstName: '请输入2-20字符的姓名',
                lastName: '请输入2-20字符的姓氏',
                email: '请输入正确的电子邮箱地址',
                password: '请输入6-20字符的密码',
                conform: '请确保两次输入密码一致',
                signUp: '登录'
            }
        },
        created() {
            if (this.language === 'zh') {
                this.submitMsg.text = '注册';
            }
            let queryEmail = this.$route.query;
            this.email = queryEmail.email;
            this.code = queryEmail.code;
            this.projectId = queryEmail.project;
            if (this.email && this.projectId) {
                this.haveQueryEmail = true;
                this.goToNda = true;
            }
        },
        methods: {
            handleSubmit() {
                let verifyList = {
                    firstName: {
                        test: 'regex',
                        rule: /\w{2,}/,
                        value: this.firstName,
                        message: this.translate('firstName')
                    },
                    lastName: {
                        test: 'regex',
                        rule: /\w{2,}/,
                        value: this.lastName,
                        message: this.translate('lastName')
                    },
                    email: {
                        test: 'email',
                        value: this.email,
                        message: this.translate('email')
                    },
                    password: {
                        test: 'regex',
                        rule: /\w{6,}/,
                        value: this.password,
                        message: this.translate('password')
                    },
                    conform: {
                        test: 'expression',
                        value: this.password !== '' && this.password === this.conform,
                        message: this.translate('conform')
                    }
                }

                this.$verify(verifyList).then((response) => {
                    if (response.res) {
                        let data = {
                            'email': this.email,
                            'password': this.password,
                            'password_confirmation': this.conform,
                            'firstname': this.firstName,
                            'lastname': this.lastName
                        };
                        if (!this.submitMsg.status) {
                            this.submitMsg.status = true;
                            this.submitMsg.text = 'Waiting';
                            let isZh = this.language === 'zh'
                            if (isZh) {
                                this.submitMsg.text = '注册中';
                            }
                            this.$store.dispatch('registerAc', data).then((response) => {
                                if (response.code === 200 && this.goToNda) {
                                    this.$router.push({path: '/nda/' + this.projectId + '/' + this.code})
                                }
                                else {
                                    this.vuerifyStr = this.translate('noMatch');
                                    this.noteStatus = true;
                                    let timer = setTimeout(() => {
                                        this.noteStatus = false;
                                        clearTimeout(timer)
                                    }, 1500)
                                }
                            });
                        }
                    }
                    else {
                        this.vuerifyStr = response.msg
                        this.noteStatus = true
                        let timer = setTimeout(() => {
                            this.noteStatus = false
                            this.submitMsg.status = false;
                            this.submitMsg.text = 'Sign up';
                            if (isZh) {
                                this.submitMsg.text = '注册';
                            }
                            clearTimeout(timer)
                        },1500)
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .mobile-main {
        width: 100%;
        height: 100vh;
        .register-content {
            background: #F7F8FA;
            height: 91.5%;
            display: flex;
            justify-content: center;
            .register-content-info {
                width: 90%;
                height: 100vh;
                margin-bottom: 44%;
                margin-top: 12%;
                p {
                    font-size:16px;
                    color: #515254;
                }
                .register-form {
                    margin-top: 7%;
                    .register-btn {
                        margin-top: 11%;
                        display: block;
                        width: 100%;
                        height: 32px;
                        font-size: 13px;
                    }
                    .register-form-info {
                        position: relative;
                        margin-bottom: 15px;
                        .deepcolor {
                            cursor: no-drop;
                            box-shadow: 40px 40px 40px 40px #EEEEEE inset
                        }
                        .bright-color {
                            cursor: no-drop;
                            box-shadow: 40px 40px 40px 40px #FFFFFF inset
                        }
                        input {
                            display: block;
                            width: 100%;
                            height: 32px;
                            background: #FFFFFF;
                            border: 1px solid #E8E8EA;
                            border-radius: 100px;
                            padding-left: 10px;
                            margin-bottom: 20px;
                            font-size: 12px;
                            letter-spacing: -0.87px;
                            color:#9292A0;
                            &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                                color: #9292A0;
                            }
                            &:-moz-placeholder { /* Mozilla Firefox 19+ */
                                color: #9292A0;
                            }
                            &:-ms-input-placeholder { /* Internet Explorer 10+ */
                                color: #9292A0;
                            }
                        }
                        span {
                            position: absolute;
                            display: inline-block;
                            background-image: url(../../../assets/images/login-sprite.png);
                            background-repeat: no-repeat;
                            left: 25px;
                        }
                    }
                }
            }
            .form-note{
                font-size: 14px;
                color: #9292A0;
            }
        }

    }

</style>
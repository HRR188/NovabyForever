<template>
    <div class="mobile-main">
        <mobile-head></mobile-head>
        <div class="login-content">
            <div class="login-content-info">
                <p v-lang.signIn></p>
                <div class="login-form">
                    <form @submit.prevent="handleSubmit">
                        <div class="email">
                            <span></span>
                            <input type="text" name="email" :class="{deepcolor:haveQueryEmail}"
                                   :placeholder="translate('emailAddress')" v-model="email"
                                   :readonly="haveQueryEmail"/>
                        </div>
                        <div class="password">
                            <span></span>
                            <input class="bright-color" type="password" name="password" :placeholder="translate('password')"
                                   v-model="password" maxlength="20"/>
                        </div>
                        <button type="submit" class="login-btn btn-default btn" v-lang.signIn></button>
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
        name: 'sign-in',
        data() {
            return {
                email: '',
                password: '',
                accepted: true,
                noteStatus: false,
                vuerifyStr: '',
                haveQueryEmail: false,
                projectId: 0,
                goToNda: false,
                code: ''
            }
        },
        components: {
            mobileHead
        },
        messages: {
            en: {
                signIn: 'Login',
                cn: 'Create new account',
                fo: 'I forgot my password',
                email: 'Please type correct email address',
                password: 'Password',
                noMatch: "Sorry, password and account don't match.",
                sorryForCannotLoginWithMobile: 'Sorry,mobile web login can open in the future'
            },
            zh: {
                signIn: '登录',
                cn: '创建新账户',
                fo: '忘记密码',
                email: '请输入正确的电子邮件地址',
                password: '密码',
                noMatch: '对不起，密码和帐号不匹配.',
                sorryForCannotLoginWithMobile: '对不起，手机网站登录未来将开放'
            }
        },
        created() {
            let queryEmail = this.$route.query;
            this.email = queryEmail.email;
            this.projectId = queryEmail.project;
            this.code = queryEmail.code;
            if (this.email && this.projectId) {
                this.haveQueryEmail = true;
                this.goToNda = true;
            }
        },
        methods: {
            handleSubmit() {
                let verifyList = {
                    email: {
                        test: 'email',
                        value: this.email.toLowerCase(),
                        message: this.translate('email')
                    },
                    password: {
                        test: 'regex',
                        rule: /\w{6,}/,
                        value: this.password,
                        message: this.translate('password')
                    }
                };

                this.$verify(verifyList).then((response) => {
                    if (response.res) {
                        let data = {
                            'email': this.email,
                            'password': this.password
                        };
                        this.$store.dispatch('loginAc', data).then((response) => {
                            if (response.code === 200 && this.goToNda) {
                                this.$router.push({path: '/nda/' + this.projectId + '/' + this.code})
                            } else if(response.code !== 200 && this.goToNda) {
                                this.vuerifyStr = this.translate('noMatch');
                                this.noteStatus = true;
                                let timer = setTimeout(() => {
                                    this.noteStatus = false;
                                    clearTimeout(timer)
                                }, 1500)
                            }else if(response.code === 200 && !this.goToNda) {
                                this.vuerifyStr = this.translate('sorryForCannotLoginWithMobile');
                                this.noteStatus = true;
                                let timer = setTimeout(() => {
                                    this.noteStatus = false;
                                    clearTimeout(timer)
                                }, 1500)
                            }
                        });
                    } else {
                        this.vuerifyStr = response.msg;
                        this.noteStatus = true;
                        let timer = setTimeout(() => {
                            this.noteStatus = false;
                            clearTimeout(timer)
                        }, 1500)
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
        .login-content {
            background: #F7F8FA;
            height: 91.5%;
            display: flex;
            justify-content: center;
            .login-content-info {
                width: 90%;
                height: 100vh;
                /*position: absolute;*/
                margin-bottom: 44%;
                margin-top: 12%;
                p {
                    font-size:16px;
                    color: #515254;
                }
                .login-form {
                    margin-top: 7%;
                    .login-btn {
                        margin-top: 11%;
                        display: block;
                        width: 100%;
                        height: 32px;
                        font-size: 14px;
                    }
                    .email, .password {
                        position: relative;
                        margin-bottom: 15px;
                        input {
                            display: block;
                            width: 100%;
                            height: 32px;
                            background: #F7F7F8;
                            border: 1px solid #E8E8EA;
                            border-radius: 100px;
                            padding-left: 50px;
                            font-size: 14px;
                            color: #9292A0;
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
                    .email {
                        .deepcolor {
                            cursor: no-drop;
                            box-shadow: 40px 40px 40px 40px #EEEEEE inset
                        }
                        span {
                            width: 15px;
                            height: 12px;
                            top: 10px;
                            background-position: -21px 0;
                        }
                    }
                    .password {
                        color: #9292A0;
                        .bright-color {
                            cursor: no-drop;
                            box-shadow: 40px 40px 40px 40px #FFFFFF inset
                        }
                        span {
                            width: 12px;
                            height: 15px;
                            top: 8px;
                            background-position: -40px 0;
                        }
                    }
                }
                .form-note{
                    font-size: 14px;
                    color: #9292A0;
                }
            }
        }
    }

</style>
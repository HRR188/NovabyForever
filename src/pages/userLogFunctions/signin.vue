<template>
    <section>
        <div class="main">
            <div class="login auto position-relative">
                <!-- <span class="close"></span> -->
                <h4 v-lang.signIn></h4>
                <div class="auto">
                    <form @submit.prevent="handleSubmit">
                        <div class="email">
                            <span></span>
                            <input type="text" name="email" :class="{deepcolor:haveQueryEmail}" :placeholder="translate('emailAddress')" v-model="email" :readonly="haveQueryEmail">
                        </div>
                        <div class="password">
                            <span></span>
                            <input type="password" name="password" :placeholder="translate('password')" v-model="password" maxlength="20">
                        </div>
                        <!--<label>-->
                        <!--<input type="checkbox" name="remember" checked="remember">Remember me-->
                        <!--</label>-->
                        <button type="submit" class="btn btn-default" v-lang.si></button>
                    </form>
                    <div class="clearfix login-links">
                        <router-link to="/sign-up" class="float-left" v-lang.cn></router-link>
                        <router-link to="/reset-password" class="float-right" v-lang.fo></router-link>
                    </div>
                    <!-- 第三方登录暂时隐藏 start -->
                    <!--<div class="or" style="display:none">-->
                    <!--<div></div>-->
                    <!--<p class="text-center">OR</p>-->
                    <!--<div></div>-->
                    <!--</div>-->
                    <!--<div class="links-login clearfix" style="display:none">-->
                    <!--<a href="" class="float-left">-->
                    <!--<img src="../../assets/images/project-fb.png" alt="">-->
                    <!--Signin with Fackbook-->
                    <!--</a>-->
                    <!--<a href="" class="float-right">-->
                    <!--<img src="../../assets/images/project-tw.png" alt="">-->
                    <!--Signin with Twitter-->
                    <!--</a>-->
                    <!--</div>-->
                    <!-- 第三方登录暂时隐藏 end -->
                </div>
                <div class="form-note" v-show="noteStatus">{{vuerifyStr}}</div>
                <div class="bottom"></div>
            </div>
        </div>
    </section>
</template>
<script>
    export default{
        name: 'signin',
        data(){
            return {
                email:'',
                password:'',
                accepted:true,
                noteStatus:false,
                vuerifyStr:'',
                submitStatus:{
                    text:'Sign in',
                    status:false
                },
                haveQueryEmail: false,
                projectId:0,
                goToNda : false,
                code:''
            }
        },
        messages:{
            en:{
                si:'Sign in',
                cn:'Create new account',
                fo:'I forgot my password',
                email:'Please type correct email address',
                password:'Please type password with 6-20 characters',
                noMatch:"Sorry, password and account don't match."
            },
            zh:{
                si:'登录',
                cn:'创建新账户',
                fo:'忘记密码',
                email:'请输入正确的电子邮件地址',
                password:'请输入6-20字符的密码',
                noMatch:'对不起，密码和帐号不匹配.'
            }
        },
        created(){
            let queryEmail = this.$route.query;
            this.email = queryEmail.email;
            this.projectId = queryEmail.project;
            this.code = queryEmail.code;
            if(this.email && this.projectId){
                this.haveQueryEmail = true;
                this.goToNda = true;
            }
        },
        methods:{
            handleSubmit() {
                let verifyList  = {
                    email:{
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
                    if(response.res){
                        let data = {
                            'email':this.email,
                            'password':this.password
                        };
                        this.$store.dispatch('loginAc',data).then((response) => {
                            if(response.code === 200) {
                                if(this.goToNda){
                                    this.$router.push({ path: '/novahub/nda/'+this.projectId+'/'+this.code })
                                }else{
                                    this.$router.push({ path: '/home' })
                                }
                            }
                            else {
                                this.vuerifyStr = this.translate('noMatch');
                                this.noteStatus = true;
                                let timer = setTimeout(() => {
                                    this.noteStatus = false;
                                    clearTimeout(timer)
                                },1500)
                            }
                        });
                    }
                    else {
                        this.vuerifyStr = response.msg;
                        this.noteStatus = true;
                        let timer = setTimeout(() => {
                            this.noteStatus = false;
                            clearTimeout(timer)
                        },1500)
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .deepcolor{
        cursor: no-drop;
        box-shadow: 40px 40px 40px 40px #EEEEEE inset
    }
</style>
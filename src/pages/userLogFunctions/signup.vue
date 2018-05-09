<template>
    <section class="main">
        <div class="signup-box auto position-relative">
            <h1 class="text-center" v-lang.signUp></h1>
            <!--第三方登录暂时不开放 start-->
            <!-- <div class="signup-links">
                <div class="clearfix">
                    <a href="" class="fackbook float-left">
                        <img src="../assets/images/project-fb.png" alt="">
                        Signin with Fackbook
                    </a>
                    <a href="" class="twitter float-right">
                        <img src="../assets/images/project-tw.png" alt="">
                        Signin with Twitter
                    </a>
                </div>
                <div class="or position-relative">
                    <div></div>
                    <p class="text-center">OR</p>
                    <div></div>
                </div>
            </div> -->
            <!--第三方登录暂时不开放 end-->
            <form @submit.prevent="handleSubmit">
                <ul>
                    <li class="clearfix">
                        <input type="text" class="float-left first-name" :placeholder="translate('firstName')" v-model="firstName" maxlength="20">
                        <input type="text" class="float-right last-name" :placeholder="translate('lastName')" v-model="lastName" maxlength="20">
                    </li>
                    <li>
                        <input class="email" type="text" :class="{deepcolor:haveQueryEmail}" :placeholder="translate('emailAddress')" v-model="email" :readonly="haveQueryEmail">
                    </li>
                    <li>
                        <input class="password" type="password" :placeholder="translate('password')" v-model="password" maxlength="20">
                    </li>
                    <li>
                        <input class="password" type="password" :placeholder="translate('rp')" v-model="conform" maxlength="20">
                    </li>
                </ul>
                <div class="accepted text-center">
                    <label>
                        <input type="checkbox" v-model="accepted" >
                        <span v-if="language === 'zh'">你已经阅读并且同意novaby <router-link :to="{name:'termsAndConditions'}" target="_blank">用户协议和条款</router-link></span>
                        <span v-else>You agree that you have read and accepted <router-link :to="{name:'termsAndConditions'}" target="_blank">Terms and Conditions</router-link></span>
                    </label>
                </div>
                <div class="submit-box">
                    <button type="submit">{{submitMsg.text}}</button>
                </div>
                <!--<router-link :to="{name:'joinBusinessOne'}" class="link-business text-center" v-lang.cb></router-link>-->
            </form>
            <div class="form-note" v-show="noteStatus">{{vuerifyStr}}</div>
            <div class="bottom"></div>
        </div>
    </section>
</template>
<script>
  export default{
      name: 'signup',
      data () {
          return {
              firstName:'',
              lastName:'',
              email:'',
              password:'',
              conform:'',
              accepted:true,
              noteStatus:false,
              vuerifyStr:'',
              submitMsg:{
                  text:'Sign up',
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
              rp:'Re-enter password',
              cb:'Create business account',
              firstName:'First name',
              lastName:'Last name',
              email: 'Please type correct email address',
              password: 'Please type password with 6-20 characters',
              conform: "These passwords don't match Try again"
          },
          zh:{
              rp:'再次输入密码',
              cb:'创建商业用户',
              firstName:'请输入2-20字符的姓名',
              lastName:'请输入2-20字符的姓氏',
              email: '请输入正确的电子邮箱地址',
              password: '请输入6-20字符的密码',
              conform: '请确保两次输入密码一致'
          }
      },
      created(){
          if (this.language === 'zh') {
              this.submitMsg.text = '注册';
          }
          let queryEmail = this.$route.query;
          this.email = queryEmail.email;
          this.code = queryEmail.code;
          this.projectId = queryEmail.project;
          if( this.email && this.projectId){
              this.haveQueryEmail = true;
              this.goToNda = true;
          }
      },
      methods: {
          handleSubmit () {
              let verifyList  = {
                    firstName:{
                        test: 'regex',
                        rule: /\w{2,}/,
                        value: this.firstName,
                        message: this.translate('firstName')
                    },
                    lastName:{
                        test: 'regex',
                        rule: /\w{2,}/,
                        value: this.lastName,
                        message: this.translate('lastName')
                    },
                    email:{
                        test:'email',
                        value: this.email,
                        message: this.translate('email')
                    },
                    password: {
                        test: 'regex',
                        rule: /\w{6,}/,
                        value: this.password,
                        message: this.translate('password')
                    },
                    conform:{
                        test: 'expression',
                        value: this.password !== '' && this.password === this.conform,
                        message: this.translate('conform')
                    }
              }

              this.$verify(verifyList).then((response) => {
                   if(response.res) {
                       let data = {
                          'email':this.email,
                          'password':this.password,
                          'password_confirmation':this.conform,
                          'firstname':this.firstName,
                          'lastname':this.lastName
                      };
                      if(!this.submitMsg.status) {
                          this.submitMsg.status = true;
                          this.submitMsg.text = 'Waiting';
                          let isZh = this.language === 'zh'
                          if (isZh) {
                              this.submitMsg.text = '注册中';
                          }
                          this.$store.dispatch('registerAc',data).then((response) => {
                              if(response.code === 200) {
                                  if(this.goToNda){
                                      this.$router.push({ path: '/novahub/nda/'+this.projectId+'/'+this.code })
                                  }else{
                                      this.$router.push({ path: '/guide' })
                                  }
                              }
                              else {
                                  this.vuerifyStr = response.msg;
                                  this.noteStatus = true;
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
                          });
                      }
                   }
                   else {
                       this.vuerifyStr = response.msg
                       this.noteStatus = true
                       let timer = setTimeout(() => {
                            this.noteStatus = false
                            clearTimeout(timer)
                       },1500)
                   }
              })
          }
      }
  }
</script>
<style lang="scss" scoped="">
    .deepcolor{
        cursor: no-drop;
        box-shadow: 40px 40px 40px 40px #EEEEEE inset
    }
</style>
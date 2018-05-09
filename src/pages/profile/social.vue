<template>
    <div class="social-container">
        <p v-lang.social></p>
        <ul class="networks-link auto clearfix">
          <li class="facebook" :class="{openlinks:facebookLink.status}">
              <!-- openlinks 类控制是否已经开启link -->
            <span>Facebook</span>
            <!-- <button class="btn btn-default" :class="{disconnect:facebookLink.status}" @click="facebook">{{facebookLink.text}}</button> -->
            <fb-signin-button class="btn btn-default"
                :params="fbSignInParams"
                @success="onSignInSuccess"
                @error="onSignInError">
                {{translate('link')}}
            </fb-signin-button>
          </li>
          <li class="twitter" :class="{openlinks:twitterLink.status}">
            <span>Twitter</span>
            <button class="btn btn-default" :class="{disconnect:twitterLink.status}" @click="twitter">{{translate('link')}}</button>
          </li>
          <li class="instagram" :class="{openlinks:linkedinLink.status}">
            <span>Linkedin</span>
            <button class="btn btn-default" :class="{disconnect:linkedinLink.status}" @click="linkedin">{{translate('link')}}</button>
          </li>
          <li class="pinterest" :class="{openlinks:pinterestLink.status}">
            <span>Pinterest</span>
            <button class="btn btn-default" :class="{disconnect:pinterestLink.status}" @click="pinterest">{{translate('link')}}</button>
          </li>
        </ul>
    </div>

</template>

<script>
export default {
    name:'personalSocial',
    created(){
        (function(d, s, id){
            let js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
            15}(document, 'script', 'facebook-jssdk'));
            window.fbAsyncInit = function() {
               FB.init({
                   appId :'171866643244371',
                   xfbml : true,
                   version : 'v2.8' //facebook登录版本
                });
                FB.getLoginStatus((response) => {
                    if(response.status == 'connected') {
                        this.$store.dispatch('facebookLinkAc',userId).then(function (response) {
                            if(response.code == 200) {
                                this.facebookLink.status = true;
                                this.facebookLink.text = 'Disconnect'
                            }
                        })
                    }
                //console.log(response);
               //response.status 如果有connected 可以直接请求 /api/social/fbconnect
               //断开连接直接请求  /api/social/fbdisconnect
               //两个都只需要携带token post 方式  无需其它参数
               //statusChangeCallback(response);

                });
            };
        let href = window.location.href;
        if(href.indexOf('novaby') !== -1) {
            if(href.indexOf('test.novaby.com') === -1) { //生产环境
                this.locationHref = true
            }
            else {  //测试环境
                this.locationHref = false
            }
        }
        else {  //开发环境
            this.locationHref = false
        }
    },
    data () {
        return {
            facebookLink:{
                status:false
            },
            twitterLink:{
                status:false
            },
            linkedinLink:{
                status:false
            },
            pinterestLink:{
                status:false
            },
            fbSignInParams: {
                scope: 'email,user_likes',
                return_scopes: true
            },
            locationHref:false //打开第三方url的状态 false 测试环境下,true生产环境
        }
    },
    messages:{
        en:{
            social:"social",
            link:'Link'
        },
        zh:{
            social:'社交网络',
            link:'关联'
        }
    },
    mounted(){
        let userId = this.$store.state.user.userId;
        this.$store.dispatch('linkStatusAc',userId).then((response) => {
            if(response.data.status.user_facebook) {
                this.facebookLink.status = true;
                this.facebookLink.text = 'Disconnect'
            }
            if(response.data.status.user_linkedin) {
                this.linkedinLink.status = true;
                this.linkedinLink.text = 'Disconnect'
            }
            if(response.data.status.user_pinterest) {
                this.pinterestLink.status = true;
                this.pinterestLink.text = 'Disconnect'
            }
            if(response.data.status.user_twitter) {
                this.twitterLink.status = true;
                this.twitterLink.text = 'Disconnect'
            }
        });
    },
    methods:{
        onSignInSuccess(){

        },
        onSignInError(){

        },
        facebook(){
            if(this.facebookLink.status) {  // 如果已经链接了,需要取消链接
                this.$store.dispatch('facebookDisconnectAc').then((response) => {
                    if(response.code == 200) {
                        this.facebookLink.status = false;
                        this.facebookLink.text = 'Link'
                    }
                })
            }
            else {
                // (function(d, s, id){
                //     var js, fjs = d.getElementsByTagName(s)[0];
                //     if (d.getElementById(id)) {return;}
                //     js = d.createElement(s); js.id = id;
                //     js.src = "//connect.facebook.net/en_US/sdk.js";
                //     fjs.parentNode.insertBefore(js, fjs);
                //     15}(document, 'script', 'facebook-jssdk'));
                    // window.fbAsyncInit = function() {
                    //    FB.init({
                    //        appId :'171866643244371',
                    //        xfbml : true,
                    //        version : 'v2.8' //facebook登录版本
                    //     });
                    //     FB.getLoginStatus(function(response) {
                    //     console.log(response);
                    //    //response.status 如果有connected 可以直接请求 /api/social/fbconnect
                    //    //断开连接直接请求  /api/social/fbdisconnect
                    //    //两个都只需要携带token post 方式  无需其它参数
                    //    //statusChangeCallback(response);
                    //     });
                    // };
            }

        },
        linkedin(){
            if(this.linkedinLink.status) {   //  如果已经链接
                this.$store.dispatch('linkedinDisconnectAc').then((response) => {
                    if(response.code == 200) {
                        this.linkedinLink.status = false;
                        this.linkedinLink.text = 'Link'
                    }
                })
            }
            else {
                let token = localStorage.getItem('token'),openUrl;
                if(this.locationHref) {
                    openUrl = ` https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=75ijmpkvri5gc3&state=123&redirect_uri=https://api.novaby.com/oauth/linkedincb?token=${token}`;
                }
                else {
                    openUrl = ` https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=75ijmpkvri5gc3&state=123&redirect_uri=http://testapi.novaby.com/oauth/linkedincb?token=${token}`;
                }
                window.open(openUrl)
            }
        },
        twitter(){
            if(this.twitterLink.status) {  // 如果已经链接了
                this.$store.dispatch('twitterDisconnectAc').then((response) => {
                    if(response.code == 200) {
                        this.twitterLink.status = false;
                        this.twitterLink.text = 'Link'
                    }
                })
            }
            else {
                this.$store.dispatch('twitterLinkAc').then((response) => {
                    if(response.code == 200) {
                        window.open(response.url)
                    }
                })
            }
        },
        pinterest(){
            if(this.pinterestLink.status) {  // 如果是已经链接了
                this.$store.dispatch('pinterestDisconnectAc').then((response) => {
                    if(response.code == 200) {
                        this.pinterestLink.status = false;
                        this.pinterestLink.text = 'Link'
                    }
                })
            }
            else {
                let openUrl;
                if(this.locationHref) {
                    openUrl = 'https://accounts-oauth.pinterest.com/login/?next=https%3a%2f%2fapi.pinterest.com%2foauth%2f%3fclient_id%3d4902905476527698490%26redirect_uri%3dhttps%3a%2f%2fapi.novaby.com%2foauth%2fpinconnect%26response_type%3dcode%26scope%3dread_public'
                }
                else {
                    openUrl = 'https://accounts-oauth.pinterest.com/login/?next=https%3a%2f%2fapi.pinterest.com%2foauth%2f%3fclient_id%3d4902905476527698490%26redirect_uri%3dhttp%3a%2f%2ftestapi.novaby.com%2foauth%2fpinconnect%26response_type%3dcode%26scope%3dread_public'
                }
                window.open(openUrl)
            }
        }
    }
}
</script>

<style lang="scss">
.personal-warp{
    .social-container{
        margin-top:20px;
        background-color:#fff;
        padding:30px 42px;
        >p{
            font-size: 18px;
            color: #515254;
        }
        .networks-link{
          li{
            float:left;
            width:100%;
            margin-top:30px;
            span{
              font-size: 20px;
              color: #4A4A4A;
              line-height: 40px;
              float:left;
              &:before{
                content:'';
                display: inline-block;
                vertical-align: middle;
                width:40px;
                height:40px;
                background-image: url(../../assets/images/links-sprite.png);
                background-repeat: no-repeat;
                margin-right:15px;
              }
            }
            .btn{
              float: right;
              width: 90px;
              height:34px;
              line-height: 34px;
              font-size:14px;
              &.disconnect {
                  background-color: #D5D9DF;
                  color: #fff;
              }
            }
          }
          .facebook{
            span:before{
              background-position: -57px 0;
            }
          }
          .facebook.openlinks{
            span:before{
              background-position: 0 0;
            }
          }
          .twitter{
            span:before{
              background-position: -57px -50px;
            }
          }
          .twitter.openlinks{
            span:before{
              background-position: 0 -50px;
            }
          }
          .instagram{
            span:before{
              background-position: -57px -101px;
            }
          }
          .instagram.openlinks{
            span:before{
              background-position: 0 -101px;
            }
          }
          .pinterest{
            span:before{
              background-position: -57px -155px;
            }
          }
          .pinterest.openlinks{
            span:before{
              background-position: 0 -155px;
            }
          }
        }
    }
}
</style>

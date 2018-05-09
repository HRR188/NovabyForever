<template>
    <footer class="footer-warp bg-F7F8FA">
        <div class="flex footer-content">
            <div class="clearfix" style="width: 100%">
                <ul class="float-left">
                    <li>
                        <router-link to="/aboutus">{{translate('about')}}</router-link>
                    </li>
                    <li>
                        <router-link to="/termsAndConditions">{{translate('tac')}}</router-link>
                    </li>
                    <li>
                        <router-link to="/license">{{translate('license')}}</router-link>
                    </li>
                    <li>
                        <router-link to="/privacyPolicy">{{translate('pripcy')}}</router-link>
                    </li>
                    <li>
                        <router-link to="/copyrightPolicy">{{translate('copcy')}}</router-link>
                    </li>
                    <li>
                        <router-link to="/refundPolicy">{{translate('refpcy')}}</router-link>
                    </li>
                    <li>
                        <router-link to="/feedback">{{translate('feedback')}}</router-link>
                    </li>
                </ul>
                <div class="share-box float-right">
                    <a href="https://twitter.com/novabycompany" target="_blank" class="twitter"></a>
                    <a href="https://www.facebook.com/NovabyCompany/" target="_blank" class="facebook"></a>
                    <a href="https://www.instagram.com/novabycompany/" target="_blank" class="instagram"></a>
                    <!--<a href="#" class="pinterest"></a>-->
                </div>
            </div>
        </div>
        <p>©&nbsp;Novaby 2017</p>
    </footer>
</template>
<script>
    export default{
        name: 'custom-footer',
        data(){
            return {

            }
        },
        messages:{
            en:{
                about:'About us',
                tac:'Terms and Conditions',
                license:'License',
                pripcy:'Privacy Policy',
                copcy:'Copyright Policy',
                refpcy:'Refund Policy',
                feedback:'Feedback'
            },
            zh:{
                about:'关于我们',
                tac:'服务条款',
                license:'许可',
                pripcy:'隐私政策',
                copcy:'版权政策',
                refpcy:'退款政策',
                feedback:'反馈'
            }
        }
    }
</script>
<style lang="scss">
    .footer-warp{
        width:100%;
        padding-bottom:55px;
        padding-top:30px;
        .footer-content{
            justify-content: center;
            padding:0 250px;
            li{
                float: left;
                margin-right: 24px;
                a{
                    font-size: 14px;
                    color: #2A2A36;
                    &:active{
                        text-decoration: underline;
                    }
                    &:hover{
                        text-decoration: underline;
                    }
                }
            }
            .share-box{
                a{
                    display: inline-block;
                    width:26px;
                    height:26px;
                    background-image: url(../../assets/images/share-link.png);
                    background-repeat: no-repeat;
                    margin-right:10px;
                }
                .twitter{
                    background-position: -90px 0;
                }
                .facebook{
                    background-position: 0 0;
                }
                .instagram{
                    background-position: -30px 0;
                }
                .pinterest{
                    background-position: -60px 0;
                }
            }
        }
        >p{
            width: 1046px;
            font-size: 14px;
            color: #959595;
            float: left;
            margin: 12px auto 0 250px;
        }

    }
</style>

<template>
        <div class="mobile-main">
            <mobile-head></mobile-head>
            <div class="nda-success-content">
                <div class="nda-success-content-info">
                    <img src="../../../assets/images/icon_have_join_project.png" alt="">
                    <p class="join-success-title">{{translate('joinSuccess')}}</p>
                    <p class="join-success-content">{{projectName}}</p>
                    <div class="go-to-home">
                        <p>{{translate('wantToProject')}}
                            <!--未有手机版的主页跳转链接，直接跳转pc版-->
                            &nbsp;<a href="http://www.novaby.com">www.novaby.com</a>
                        </p>
                        <p>{{translate('workOnComputer')}}</p>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
    import mobileHead from '../../components/mobileHead.vue'

    export default {
        name: 'ndaSuccess',
        components:{
            mobileHead
        },
        data(){
            return{
                projectName: ''
            }
        },
        messages: {
            en: {
                joinSuccess: 'You have successfully joined the project :',
                wantToProject: 'If you want a project, go to',
                workOnComputer: 'and work on the computer.'
            },
            zh: {
                joinSuccess: '恭喜您，加入项目成功:',
                wantToProject: '如果您想创建一个项目，请前往',
                workOnComputer: '在电脑端工作'
            }
        },
        created(){
            this.getProjectInfo();
        },
        methods:{
            async getProjectInfo() {
                let result = await this.$store.dispatch('saas/projectSetting/getProjectSetting', {id: this.$route.params.id});
                if (result.code === 200) {
                    this.projectName = result.data.project.name;
                }
            },
        }
    }
</script>
<style lang="scss" scoped>
    .mobile-main {
        width: 100%;
        height: 100vh;
        .nda-success-content {
            background: #F7F8FA;
            height: 91.5%;
            display: flex;
            justify-content: center;
            .nda-success-content-info{
                width: 90%;
                height: 78vw;
                margin-bottom: 44%;
                margin-top: 12%;
                background: #FFFFFF;
                align-items: center;
                display: flex;
                flex-direction: column;
                img{
                    margin-top: 10%;
                    width: 19%;
                    height: 22%;
                }
                .join-success-title{
                    margin-top: 2%;
                    color: #515254;
                }
                .join-success-content{
                    margin-top: 12%;
                    font-size: 20px;
                    color: #515254;
                    text-align: center;
                }
                .go-to-home{
                    margin-top: 12%;
                    text-align: center;
                    p{
                      font-size: 13px;
                      color: #9B9B9B;
                      display: flex;
                        &:last-child{
                           justify-content: center;
                        }
                        a {
                            font-size: 13px;
                            display: inline;
                            color: #EA6264;
                        }
                    }

                }
            }
        }
    }
</style>
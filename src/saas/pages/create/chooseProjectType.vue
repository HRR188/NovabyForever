<template>
    <div class="choose-project-type-container">
        <p class="page-title" v-lang.p1>!</p>
        <router-link :to="{name:'createProject',params:{type:'outsource'}}" class="project-type">
            <img src="../../../assets/images/saas/create/icon_people.png" alt="">
            <div class="words">
                <p class="p1" style="color: #4A90E2;" v-lang.p2>
                <p class="p2" v-lang.p3></p>
                <p class="p3" v-lang.p4></p>
            </div>
        </router-link>
        <div @click="createInternalProject" class="project-type pointer">
            <img src="../../../assets/images/saas/create/icon_earth.png" alt="">
            <div class="words">
                <p class="p1" style="color: #ea6264;" v-lang.p5></p>
                <p class="p2" v-lang.p6></p>
                <p class="p3" v-lang.p7></p>
            </div>
        </div>
        <div class="btn-container">
            <router-link :to="{name:'saasProjectsList'}" class="btn btn-default" v-lang.p8></router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "choose-project-type",
        messages:{
            en:{
                p1:'Start to work',
                p2:'I want to hire 3D artists to work for me',
                p3:'Publish your requirement in 1 minute',
                p4:'Match your requirement with global 3D artists, improve delivery quality, and reduce delay risk',
                p5:'I want to create a collaboration project for my team',
                p6:' ',
                p7:'Invite team members, and significantly improve delivery efficiency',
                p8:'Later'
            },
            zh:{
                p1:'开始工作',
                p2:'我要找外包团队做3D模型',
                p3:'1分钟发布需求',
                p4:'匹配全球模型师团队，提高交付质量，降低延期风险',
                p5:'我要为团队创建内部协作项目',
                p6:' ',
                p7:'邀请团队成员加入，显著提高协作效率',
                p8:'稍后再说'
            }
        },
        methods:{
            async createInternalProject() {
                let result = await this.$store.dispatch('checkPermission/checkInternalPermission');
                if(result === 200){
                    this.$router.push({name:'createProject',params:{type:'internal'}})
                }
                else{
                    let respo = await this.$checkInternalPermission();
                    if(respo.data === 'confirm'){
                        this.$router.push({name:'createProject',params:{type:'internal'}})
                    }
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .choose-project-type-container{
        width: 738px;
        margin: 25px auto;
        background-color: white;
        .project-type{
            padding:54px 80px;
            display: flex;
            justify-content: space-between;
            .words{
                width: 395px;
                color: #A7A2A2;
                .p1{
                    font-size: 16px;
                }
                .p2{
                    margin-top: 15px;
                    font-size: 12px;
                }
                .p3{
                    margin-top: 23px;
                    font-size: 14px;
                    line-height: 20px;
                }
            }
            &:hover{
                background-color: #FBFBFB;
            }
        }
        .btn-container{
            display: flex;
            justify-content: center;
            .btn{
                width: 112px;
                height: 30px;
                font-size: 16px;
                color: #FFFFFF;
                line-height: 30px;
                margin:15px auto 67px;
            }
        }
    }
</style>
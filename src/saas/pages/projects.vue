<template>
    <div class="saas-project-list">
        <div class="tabs">
            <div class="tab" :class="{active:selectedTab === 'outsource'}" v-lang.op @click="selectedTab = 'outsource'"></div>
            <div class="tab" :class="{active:selectedTab === 'internal'}" v-lang.ip @click="clickInternal"></div>
        </div>
        <template v-if="gotData">
            <template v-if="projects.length">
                <template v-for="project in projects">
                    <router-link :to="{name:getProjectGoto(project.redirect),params:{id:project.prj_id}}">
                        <div class="project" :style="{'background-image': 'url('+project.prj_cover+')'}" @click="markAsRead(project.prj_id)">
                            <div class="mark"></div>
                            <span class="prj-news" v-if="project.prj_update">New</span>
                            <p class="prj-name">{{project.prj_name}}</p>
                            <div style="position:absolute;bottom:17px;left:17px;">
                                <span class="prj-status" v-if="project.prj_progress == 1 || project.prj_progress == 2">{{getProjectStatus(project.prj_progress)}}</span>
                                <div v-if="project.prj_progress == 4 || project.prj_progress == 5" class="prj-result">
                                    <img src="../../assets/images/saas/icon-pass.png" alt="" v-if="project.prj_progress == 4">
                                    <img src="../../assets/images/saas/icon-fail.png" alt="" v-if="project.prj_progress == 5">
                                    {{getProjectStatus(project.prj_progress)}}
                                </div>
                                <p class="prj-time" v-if="project.prj_progress == 4 || project.prj_progress == 5">{{getTime(project.prj_created_at)}}</p>
                            </div>
                            <div class="btn-box" v-if="project.can_delete">
                                <button class="delete" @click.stop="deleteProject($event,project.prj_id)"></button>
                            </div>
                        </div>
                    </router-link>
                </template>
                <div class="project fake-project" v-for="pro in fakeProject">
                </div>
            </template>
            <template v-else>
                <div class="non-project">
                    <img src="../../assets/images/saas/add-new-project.png" alt="">
                    <p v-if="selectedTab === 'outsource'" v-lang.opempty></p>
                    <p v-if="selectedTab === 'internal'" v-lang.ipempty></p>
                    <!--<div class="btn btn-default btn-175 add-new" @click="addNew">-->
                        <!--<div class="icon-plus">+</div>-->
                        <!--{{translate('an')}}-->
                    <!--</div>-->
                </div>
            </template>
        </template>
    </div>
</template>

<script>
    export default {
        name: 'saas-list',
        data(){
            return {
                projects:[],
                gotData:false,
                selectedTab:'outsource' //outsource,internal
            }
        },
        messages:{
            en:{
                opempty:'You don\'t have any outsourcing project',
                ipempty:'You don\'t have any internal project',
                an:'Add new project',
                op:'Outsourcing project',
                ip:'Internal projects'
            },
            zh:{
                opempty:'你还没有外包项目',
                ipempty:'你还没有内部项目',
                an:'创建新项目',
                op:'外包项目',
                ip:'内部项目'
            }
        },
        created(){
            this.getProjects()
        },
        computed:{
            fakeProject:function () {
                let value = 3 - this.projects.length%3;
                return value === 3?0:value
            }
        },
        watch:{
            selectedTab(val){
                this.getProjects()
            }
        },
        methods:{
            async clickInternal() {
                let result = await this.$store.dispatch('checkPermission/checkInternalPermission');
                if(result === 200){
                    this.selectedTab = 'internal'
                }
                else{
                    let respo = await this.$checkInternalPermission();
                    if(respo.data === 'confirm'){
                        this.selectedTab = 'internal'
                    }
                }
            },
            getProjects:function () {
                this.projects = [];
                this.gotData = false;
                this.$store.dispatch('saas/projects/getProjects',this.selectedTab === 'outsource'?0:1).then(response => {
                    this.projects = response.data.projects.project;
                    this.gotData = true;
                })
            },
            getProjectStatus:function (statue) {
                if(this.language === 'zh'){
                    switch(statue){
                        case 1:
                            return '报价中';
                        case 2:
                            return '进行中';
                        case 4:
                            return '通过';
                        case 5:
                            return '失败'
                    }
                }
                else{
                    switch(statue){
                        case 1:
                            return 'Quoting';
                        case 2:
                            return 'Ongoing';
                        case 4:
                            return 'Pass';
                        case 5:
                            return 'Fail'
                    }
                }
            },
            getProjectGoto:function (status) {
                return 'saasModelSpecification'
                // switch(status){
                //     case 0:
                //         return 'saasInvite';
                //     case 1:
                //         return 'saasRequirement';
                //     case 2:
                //         return 'saasSelect';
                //     case 3:
                //         return 'saasBid';
                //     case 4:
                //         return 'task';
                //     case 5:
                //         return 'saasResult'
                // }
            },
            addNew:function () {
                this.$router.push({name:'chooseProjectType'})
            },
            getTime:function (time) {
                let reg = new RegExp('"',"g");
                let date = new Date(time*1000);
                return date.toString().replace(reg, "")
            },
            markAsRead:function (id) {
                this.$store.dispatch('saas/markAsRead',id)
            },
            deleteProject:function (e,id) {
                e.preventDefault();
                this.$alert({type:'confirm',message:'Are you sure to remove this project?'}).then(response => {
                    if(response.data === 'confirm'){
                        this.$store.dispatch('saas/projects/removeProject',id);
                        this.projects = this.projects.filter(project => {
                            return id !== project.prj_id
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
.saas-project-list{
    width: 1120px;
    margin:0 auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .tabs{
        display: flex;
        width: 100%;
        margin:30px 0;
        .tab{
            font-size: 18px;
            color: #2A2A36;
            margin-right: 70px;
            padding-bottom: 6px;
            &.active{
                color: #EA6264;
                border-bottom: 2px solid #EA6264;
            }
        }
    }
    a{
        margin-bottom:30px;
        .project{
            width:352px;
            height:198px;
            border-radius: 5px;
            padding:25px;
            transition:all ease .5s;
            position: relative;
            background-size: cover;
            background-position: center;
            &.fake-project{
                background: none;
                &:hover{
                    box-shadow: none;
                }
            }
            &:hover{
                box-shadow: 5px 10px 8px 0 rgba(208, 208, 208, 0.3);
            }
            .mark{
                position: absolute;
                top:0;
                left:0;
                opacity: 0.3;
                z-index: 0;
                border-radius: 5px;
            }
            .prj-name{
                font-size: 20px;
                color: #fff;
                margin-bottom:16px;
                font-weight: 300;
                min-height: 46px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                position: absolute;
                left:17px;
                top:27px;
            }
            .prj-status{
                font-size:12px;
                color:#fff;
                display: inline-block;
                border: 1px solid #fff;
                border-radius: 2px;
                width:62px;
                height:25px;
                text-align: center;
                line-height: 25px;
            }
            .prj-news{
                position: absolute;
                top:8px;
                right:8px;
                font-size: 10px;
                color:white;
                background: #EA6264;
                border-radius: 100px;
                padding:2px 6px;
            }
            .prj-result{
                font-size: 12px;
                color: #FFFFFF;
                display: flex;
                align-items: center;
                img{
                    margin-right: 10px;
                }
            }
            .prj-time{
                font-size: 10px;
                color: #FFFFFF;
                margin-top: 8px;
            }
            .btn-box{
                position: absolute;
                width:100%;
                left:0;
                top:12px;
                visibility: hidden;
                .delete{
                    float: right;
                    display: inline-block;
                    width:18px;
                    height:18px;
                    margin-right:12px;
                    border:none;
                    cursor: pointer;
                    background-image: url(../../assets/images/uploads-sprite.png);
                    background-repeat: no-repeat;
                    background-position: 0 0;
                    border:none;
                    background-color: rgba(0,0,0,0);
                    cursor: pointer;
                }
            }
            &:hover{
                .btn-box{
                    visibility: visible;
                }
            }
        }
    }
    .fake-project{
        width:352px;
        height:140px;
    }
    .non-project{
        width: 100%;
        height: 100%;
        margin-top: 130px;
        text-align: center;
        p{
            font-size: 26px;
            color: #4A4A4A;
            margin-top: 54px;
            margin-bottom: 54px;
        }
        .add-new{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: auto;
            margin-left: auto;
            .icon-plus{
                width: 18px;
                height: 18px;
                border: 2px solid white;
                line-height: -1px;
                border-radius: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                padding-bottom: 2px;
                margin-right: 5px;
            }
        }
    }
}
</style>
<template>
    <div class="team-container">
        <div class="info-container w-940 auto" v-if="teamInfo">
            <p class="text-right" v-if="teamInfo.is_me === 1">
                <template>
                    <router-link :to="{name:'personalEditTeam'}" class="edit-btn">
                        <img src="../../assets/images/icon_edit.png" alt="">
                        {{translate('editTeam')}}
                    </router-link>
                </template>
            </p>
            <div class="team-name flex">
                <p class="text-left title" v-lang.teamTitle></p>
                <p class="text-left name">{{teamInfo.team_name}}</p>
            </div>
            <div class="team-invition" v-if="teamInfo.is_me === 1">
                <p class="title" v-lang.invition></p>
                <div class="search">
                    <input :placeholder="translate('enterAccount')" @click="inputChange" @keyup.enter="searchUser" @keyup.space="searchUser" v-model="account"/>
                    <div class="dropDown flex" v-show="isShowDrop">
                        <template v-if="isFindUser">
                            <div class="serach-pane flex">
                                <p class="searchRes">{{user.user_name}}</p>
                                <p class="searchEmial">({{user.user_email}})</p>
                            </div>
                            <template v-if="user.user_team === 0">
                                <img  class="add-img" src="../../assets/images/team/add.png" @click="addInvateMember(user)"/>
                            </template>
                            <template v-if="user.user_team === 1">
                                <p v-lang.alreadyInTeam></p>
                            </template>
                        </template>
                        <template v-else>
                            <p class="searchRes">{{noUser}}</p>
                        </template>
                    </div>
                </div>
                <div class="userList" v-for="item in userList" :key="item.item" v-if="!isInviteSucess">
                    <div class="userInfo flex">
                        <div class="user-pane flex">
                            <div class="member-box position-relative">
                                <img :src="item.user_avatar" alt="" class="img-max portrait-img">
                                <template v-if="item.user_type === 4">
                                    <img src="../../assets/images/business-icon.png" class="user-status">
                                </template>
                                <template v-else-if="item.user_type === 3">
                                    <img src="../../assets/images/user-model-icon.png" class="user-status">
                                </template>
                            </div>
                            <p class="searchRes">{{item.user_name}}</p>
                            <p class="searchEmial">({{item.user_email}})</p>
                        </div>
                        <p class="delete" v-lang.delete @click="deleteInvateMember(item)"></p>
                    </div>
                </div>
                <div class="invite-sucess" v-if="isInviteSucess">
                    <p v-lang.inviteSucess></p>
                </div>
                <div class="invite-btn auto" v-if="!isInviteSucess" @click="inviteMembers" :class="{active: userList.length > 0}">{{translate('invition')}}</div>
            </div>
            <div class="team-memberList">
                <member-list :isEdit='false' :teamId='teamInfo.team_id' :memberList='teamInfo.team_members'></member-list>
            </div>
        </div>
        <div class="empty-container w-940 auto" v-else>
            <div class="self-empty-pane" v-if="isMeStatus">
                <div class="create-guide-team flex" v-if="isCreatTeam">
                    <p v-lang.guideTitle></p>
                    <button class="create-btn"  @click="isCreatTeam = false" v-lang.createTeam></button>
                </div>
                <div class="create-team" v-else>
                    <p v-lang.creTeamName></p>
                    <input :placeholder="translate('enterTeamName')" v-model="teamName"/>
                    <div class="btn-pane flex">
                        <button class="create-btn creat auto"  @click="createTeam" v-lang.create></button>
                    </div>
                </div>
            </div>
            <div class="other-empty-pane flex" v-else>
                <img src="../../assets/images/team/noMember.png"/>
                <p v-lang.noMembers></p>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import memberList from './memberList'

    export default {
        name:"personalAbout",
        data(){
            return {
                teamInfo:'',
                isMeStatus:false,
                isCreatTeam: true,
                teamName:'',
                account:'',
                isShowDrop: false,
                isShowAdd: false,
                noUser:'',
                isFindUser: true,
                user:{},
                userList:[],
                isInviteSucess: false
            }
        },
        messages:{
            en:{
                noMembers: 'The user do not joined any team yet.',
                editTeam:'Edit team',
                teamTitle: 'Team Name',
                guideTitle: 'Create your first team now!',
                createTeam: 'Create team',
                creTeamName: 'Team Name',
                enterTeamName: 'Enter the team name',
                create: 'Create',
                invition: 'Invitation',
                enterAccount: 'Enter the registered account(E-mail)',
                noUser: 'System can not find the user',
                delete: 'Delete',
                inviteSucess: 'Invitation sent successfully!',
                alreadyInTeam:'This user is already in a team'
            },
            zh:{
                noMembers: '该用户暂时没有团队.',
                editTeam:'修改团队信息',
                teamTitle: '团队名称',
                guideTitle: '创建你的第一支团队!',
                createTeam: '创建团队',
                creTeamName: '团队名称',
                enterTeamName: '输入团队名称',
                create: '创建',
                invition: '邀请',
                enterAccount: '输入注册账号(电子邮件)',
                noUser: '系统找不到该用户',
                delete: '删除',
                inviteSucess: '邀请发送成功!',
                alreadyInTeam:'这位用户已经加入一个小组'
            }
        },
        created(){
            this.isMeStatus = String(this.$route.params.id) === String(this.userId);
            this.getTeamInfo()
        },
        methods: {
            inputChange(){
                if(this.isInviteSucess){
                    this.isInviteSucess = false;
                    this.userList = []
                }
            },
            getTeamInfo() {
                this.$store.dispatch('getTeamInfo', {id: this.$route.params.id}).then((response) => {
                    if(response.code === 200) {
                        this.teamInfo = response.data
                    }
                })
            },
            createTeam() {
                if(!this.teamName) {
                    return
                }
                this.$store.dispatch('createTeam', {name: this.teamName}).then((response) => {
                    if(response.code === 200) {
                        //create sucess
                        this.getTeamInfo()
                    }
                })
            },
            checkEmail() {
                return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(this.account);
            },
            searchUser() {
                if(this.checkEmail()) {
                    this.$store.dispatch('searchUser', {email: this.account}).then((response) => {
                        if(response.code === 200) {
                            this.user = response.data.user;
                            this.isFindUser = true;
                            this.isShowDrop = true
                        }
                        else if(response.code === -1) {
                            //not find user
                            this.noUser = this.translate('noUser');
                            this.isFindUser = false;
                            this.isShowDrop = true
                        }
                    })
                }
            },
            addInvateMember(user) {
                this.isShowDrop = false;
                this.userList.push(user)
            },
            deleteInvateMember(user) {
                this.userList.forEach((item, index) => {
                    if(user === item) {
                        this.userList.splice(index, 1)
                    }
                })
            },
            inviteMembers() {
                let len = this.userList.length;
                if(len > 0) {
                    let idArrs = [];
                    this.userList.forEach((item)=>{
                        idArrs.push(item.user_id)
                    });

                    let params = {
                        ids: idArrs,
                        team_id: this.teamInfo.team_id
                    };
                    this.$store.dispatch('inviteMembers', params).then((response) => {
                        if(response.code === 200) {
                            this.isInviteSucess = true;
                            this.account = ''
                        }
                    })
                }
            }
        },
        computed:mapState({
            userId: state => state.user.userId,
        }),
        components: {
            memberList
        }
    }
</script>

<style lang="scss" scoped>
    /*.personal-warp{*/
    .team-container{
        padding-top: 20px;
        padding-bottom: 50px;
        .info-container {
            .edit-btn{
                display: inline-block;
                width:100px;
                height:25px;
                line-height: 25px;
                text-align: center;
                font-size: 12px;
                color: #515254;
                margin-bottom:10px;
                background: #fff;
                border: 1px solid #C8C8C8;
                border-radius: 100px;
                img{
                    vertical-align: middle;
                }
            }
            .team-name {
                background-color: #ffffff;
                height: 105px;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;
                padding-left: 40px;
                .title {
                    font-size: 18px;
                    color: #515254;
                }
                .name {
                    margin-top: 10px;
                    font-size: 16px;
                    color:#7A7A7A;
                }
            }
            .team-invition {
                background-color: #ffffff;
                margin-top: 20px;
                padding: 25px 40px;
                .title {
                    font-size: 18px;
                    color: #515254;
                }
                .search {
                    width: 858px;
                    height: 72px;
                    input {
                        margin-top: 14px;
                        width: 858px;
                        height: 36px;
                        border: 1px solid #D2D2D2;
                        border-radius: 2px;
                        text-indent: 10px;
                    }
                    .dropDown {
                        height: 36px;
                        padding-left: 10px;
                        padding-right: 5px;
                        justify-content: space-between;
                        align-items: center;
                        border: {
                            left: 1px solid #D2D2D2;
                            right: 1px solid #D2D2D2;
                            bottom: 1px solid #D2D2D2;
                        };
                        border-bottom-left-radius: 2px;
                        border-bottom-right-radius: 2px;
                        .searchRes {
                            font-size: 16px;
                            color: #7A7A7A;
                        }
                        .searchEmial {
                            font-size: 16px;
                            color: #000000;
                        }
                        .add-img {
                            width: 24px;
                            height: 24px;
                            cursor: pointer;
                        }
                    }
                }
                .userList {
                    .userInfo {
                        padding: 15px 0px;
                        justify-content: space-between;
                        align-items: center;
                        border-bottom: 1px solid #EDEBEB;
                        .user-pane {
                            align-items: center;
                            .member-box {
                                width: 28px;
                                height: 28px;
                                .portrait-img{
                                    border-radius: 100%;
                                }
                                .user-status{
                                    position:absolute;
                                    right:0;
                                    top:0;
                                    width: 8px;
                                    height: 8px;
                                }
                            }
                            .searchRes {
                                margin-left: 14px;
                                font-size: 16px;
                                color: #7A7A7A;
                            }
                            .searchEmial {
                                font-size: 16px;
                                color: #000000;
                            }
                        }
                        .delete {
                            font-size: 14px;
                            color: #C1C1C1;
                            cursor: pointer;
                        }
                    }
                }
                .invite-sucess {
                    padding: 60px 0px 80px;
                    text-align: center;
                    p {
                        font-size: 16px;
                        color: #9B9B9B;
                    }
                }
                .invite-btn {
                    margin-top: 25px;
                    width: 120px;
                    height: 36px;
                    line-height: 36px;
                    border: 1px solid #D5D9DF;
                    border-radius: 100px;
                    text-align: center;
                    font-size: 16px;
                    color: #D5D9DF;
                    cursor: pointer;
                    background-color: #ffffff;
                }
                .active {
                    border-color: #EA6264;
                    color: #EA6264;
                }
            }
            .team-memberList {
                margin-top: 20px;
            }
        }
        .empty-container{
            .self-empty-pane {
                background-color: #ffffff;
                .create-guide-team {
                    height: 293px;
                    flex-direction: column;
                    align-items: center;
                    p {
                        margin-top: 87px;
                        font-size: 22px;
                        color:'#7a7a7a';
                    }
                }
                .create-team {
                    height: 293px;
                    padding: 25px 40px 0px;
                    p {
                        font-size: 18px;
                        color:#515254;
                    }
                    input {
                        margin-top: 10px;
                        width: 858px;
                        height: 36px;
                        border: 1px solid #D2D2D2;
                        font-size: 16px;
                        border-radius: 2px;
                        text-indent: 10px;
                    }
                    .btn-pane {
                        justify-content: center;
                    }
                    .creat {
                        width: 128px;
                        height: 38px;
                    }
                }
                .create-btn {
                    margin-top: 53px;
                    width: 128px;
                    height: 38px;
                    border-radius: 100px;
                    font-size: 18px;
                    color: #fff;
                    text-align: center;
                    border: none;
                    background: #EA6264;
                    cursor: pointer;
                }
            }
            .other-empty-pane {
                background-color: #ffffff;
                height: 337px;
                align-items: center;
                justify-content: center;
                p{
                    margin-left: 30px;
                    font-size: 16px;
                    color: #7A7A7A;
                }
            }
        }
    }
    /*}*/
</style>

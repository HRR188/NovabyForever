<template>
    <div>
        <saas-wrapper v-show="this.canInvite">
            <saas-title :title="translate('in')"></saas-title>
            <div class="project-member-container">
                <div class="search">
                    <input class="search-input"
                           :placeholder="translate('enterAccount')"
                           @keyup.enter="checkUser"
                           @keyup.space="checkUser"
                           @keydown.delete="emailList = []"
                           v-model="account"
                    />
                </div>
                <button class="btn btn-invite pointer auto"
                        :disabled="!emailList.length"
                        @click="inviteMembers">
                    {{translate('invite')}}
                </button>
            </div>
        </saas-wrapper>
        <saas-wrapper v-show="isInnerProject">
            <loading ref="loadingMember">
                <saas-title :title="translate('memberList')"></saas-title>
                <div class="project-information-container" style="padding:30px 20px;">
                    <div class="show-roles-select">
                        <span class="pointer"
                              :class="{active: selectedRole === role.name}"
                              v-for="role in roles"
                              @click.stop="selectedRole = role.name"
                        >{{translate(role.name)}}</span>
                    </div>
                    <div class="member-list-container">
                        <ul class="wrapper">
                            <li v-for="member in selectedMemberList">
                                <div class="avatar" :style="{backgroundImage:'url('+member.user_avatar+')'}">
                                </div>
                                <div class="member-content">
                                    <div class="name-content">
                                        <span class="name">{{member.user_name}}</span>
                                        <img src="../../../assets/images/icon_project_starter.png"
                                             v-if="member.is_creator" class="avatar-class">
                                    </div>
                                    <span class="email">{{member.user_email}}</span>
                                    <span class="is-admin" v-if="!member.operate">{{translate(member.role_name)}}</span>
                                    <div class="slide-down" v-else>
                                        <member-slide-down
                                                :defaultValue="member.role_name"
                                                :values="roles"
                                                ref="memberSlideDown"
                                                @saveChangeMembers="saveChangeMembers"
                                                :userInfo="member"
                                        ></member-slide-down>
                                    </div>
                                    <div class="option-btns-no-operate" v-if="!member.is_creator">
                                        <span class="pointer"
                                              style="font-size: 12px;color: #9B9B9B;"
                                              v-if="member.invite_status">{{translate('joined')}}
                                        </span>
                                        <span class="pointer join-resend"
                                              v-else
                                              @mouseenter="member.showRecend = true"
                                              @mouseleave="member.showRecend = false"
                                              @click="reInviteMember(member.user_email)">
                                            <span v-if="!member.showRecend">
                                                {{translate('pending')}}
                                            </span>
                                            <span v-else>
                                                {{translate('resend')}}
                                            </span>
                                         </span>
                                        <span v-if="member.operate" class="pointer remove "
                                              @click="removeMember(member.user_id)" v-lang.remove>
                                         </span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </loading>
        </saas-wrapper>
        <saas-wrapper>
            <loading ref="loadingProject">
                <saas-title :title="translate('pi')"></saas-title>
                <div class="project-information-container" style="padding:30px 20px;">
                    <p class="small-title" v-lang.pn></p>
                    <input type="text" v-model="projectName" v-if="canUpdateProject">
                    <p class="name" v-else>{{projectName}}</p>
                    <p class="small-title" v-lang.pc></p>
                    <project-image-upload
                            v-if="canUpdateProject"
                            :multipleFile="false"
                            :maxQuantity="1"
                            :type="'image'"
                            :uploadTo="'cloud'"
                            :saveImageSrc="true"
                            :imgUrl="projectImage"
                            @fileStatusChange="imageStatusChange"
                    ></project-image-upload>
                    <img v-else class="img" :src="projectImage" alt="">
                    <p class="small-title" v-lang.pd></p>
                    <textarea v-if="canUpdateProject" name="" id="" cols="30" rows="10"
                              v-model="projectDesc"></textarea>
                    <p v-else class="desc pre-line">{{projectDesc}}</p>
                    <div class="btns" v-if="canUpdateProject">
                        <button class="btn btn-default upp" @click="save" v-lang.save :disabled="!verify"></button>
                    </div>
                </div>
            </loading>
        </saas-wrapper>
    </div>
</template>

<script>
    import saasTitle from '../../components/saasTitle.vue'
    import saasWrapper from '../../components/saasWrapper.vue'
    import loading from '../../components/loading.vue'
    import projectImageUpload from '../../../components/imageUpload/newProjectImageUpload.vue'
    import emptyList from '../../components/emptyList'
    import memberSlideDown from '../../../saas/components/memberSlideDown.vue'

    class Member {
        constructor({is_creator = false, operate = false, role_name, user_avatar, user_email, user_id, user_name, user_role, user_type, invite_status, showRecend = false}) {
            this.is_creator = is_creator; //是否项目创建者0否，1是
            this.operate = operate;
            this.role_name = role_name;
            this.user_avatar = user_avatar;
            this.user_email = user_email;
            this.user_id = user_id;
            this.user_name = user_name;
            this.user_role = user_role;
            this.user_type = user_type;
            this.invite_status = invite_status; //	0等待，1加入
            this.showRecend = showRecend
        }
    }

    export default {
        name: "project-setting",
        props: {
            id: {
                required: true
            }
        },
        components: {
            saasTitle,
            saasWrapper,
            loading,
            projectImageUpload,
            emptyList,
            memberSlideDown
        },
        data() {
            return {
                imgLength: 0,
                account: '',
                userList: [],
                user: {},
                memberList: [],
                roles: [],
                canInvite: false,
                joined: false,
                emailList: [],
                selectedRole: '',
                coverImage: {},
                setting: {},
                canUpdateProject: false,
                gotData: false,
                projectName: '',
                projectImage: '',
                projectDesc: '',
                isInnerProject: true
            }
        },
        messages: {
            en: {
                pi: 'Project Information',
                in: 'Invite',
                ss: 'Save successful!',
                pn: 'Project name',
                pc: 'Project cover (For better display, please add a cover picture for your project)',
                pd: 'Project description',
                invite: 'Invite',
                remove: 'Remove',
                memberList: 'Member List',
                Administrator: 'Administrator',
                Member: 'Member',
                enterAccount: 'Multiple accounts(E-mail) need be separated by commas.And click enter to commit',
                joined: 'Joined',
                pending: "Pending Invite",
                resend: 'Resend Invite',
            },
            zh: {
                pi: '项目信息',
                in: '邀请成员',
                ss: '保存成功！',
                pn: '项目名称',
                pc: '项目封面',
                pd: '项目描述',
                invite: '邀请',
                remove: '移除',
                memberList: '成员列表',
                Administrator: '管理员',
                Member: '成员',
                enterAccount: '多个账户（注册邮件）以逗号分割.点击回车完成输入',
                joined: '已加入',
                pending: "等待加入",
                resend: '重新发送',
            }
        },
        created() {
            this.init()
        },
        computed: {
            selectedMemberList: function () {
                return this.memberList.filter(member => {
                    if (member.role_name) {
                        return member.role_name.toLowerCase() === this.selectedRole.toLowerCase()
                    }
                })
            },
            verify: function () {
                if (!this.projectName) {
                    return false
                }
                else if (!this.imgLength) {
                    return false
                }
                else {
                    return this.projectDesc.length
                }
            },
        },
        methods: {
            checkUser() {
                this.account = this.account.replace(/(^\,*)|(\,*$)/g, "");
                let accountList = [];
                if (this.account.indexOf(",") !== -1) {
                    accountList = this.account.split(",");
                    accountList.forEach((val) => {
                        if (this.checkEmail(val) && this.besureNotRepeatEmailList(val)) {
                            this.emailList.push(val);
                        }
                    });
                } else {
                    if (this.checkEmail(this.account) && this.besureNotRepeatEmailList(this.account)) {
                        this.emailList.push(this.account)
                    }
                }
            },
            checkEmail(val) {
                return (/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(val))
                      && this.preventRepeatInvite(val);
            },
            preventRepeatInvite(val) {
                let flag = true;
                let len =  this.memberList.length;
                for(let i=0; i<len; i++){
                    if(val !== this.memberList[i].user_email){
                        continue;
                    }else{
                        flag = false;
                    }
                }
                return flag;
            },
            besureNotRepeatEmailList(val) {
                if(this.emailList.length){
                    if(this.emailList.indexOf(val) !== -1){
                        return false;
                    }
                }
                return true;
            },
            async inviteMembers() {
                if (this.emailList.length > 0) {
                    let response = await this.$store.dispatch('saas/projectSetting/inviteMembers', {
                        emails: this.emailList,
                        project_id: this.id
                    });
                    if (response.code === 200) {
                        response.data.user.forEach(member => {
                            this.memberList.push(new Member(member));
                        });
                        this.emailList = [];
                        this.account = [];
                    }
                    else {
                        this.$alert({type: 'alert', message: 'Please check network and invite again'})
                    }
                }
            },
            async reInviteMember(email) {
                let response = await this.$alert({
                    type: 'confirm',
                    message: 'Are you sure to resend invite this user from the project ?'
                });
                if (response.data === 'confirm') {
                    this.$store.dispatch('saas/projectSetting/inviteMembers', {
                        emails: [email],
                        project_id: this.id
                    })
                }
            },
            async init() {
                let result = await this.$store.dispatch('saas/projectSetting/getProjectSetting', {id: this.id});
                if (result.code === 200) {
                    this.canInvite = result.data.functions.Invite.operate;
                    this.projectDesc = result.data.project.description;
                    this.projectName = result.data.project.name;
                    this.projectImage = result.data.project.photo;
                    this.canUpdateProject = result.data.functions.projectInformation.operate;
                    this.imgLength = 1;
                    this.$refs.loadingProject.showSlots();
                }
                let response = await this.$store.dispatch('saas/projectSetting/getMembers', {id: this.id});
                if (response.code === 200) {
                    response.data.users.forEach(user => {
                        this.memberList.push(new Member(user));
                    });
                    //:todo trans the response role name to en
                    if(response.data.roles[0].name === '管理员'){
                        this.roles = [{id:7,name:'Administrator'},{id:8,name:'Member'}];
                        this.selectedRole = this.roles[0].name
                    }else if(response.data.roles[0].name === 'Administrator'){
                        this.roles = response.data.roles;
                        this.selectedRole = this.roles[0].name
                    }else{
                        this.isInnerProject = false;
                    }
                }
                this.$refs.loadingMember.showSlots();
            },
            async removeMember(id) {
                let response = await this.$alert({
                    type: 'confirm',
                    message: 'Are you sure to remove this user from the project ?'
                });
                if (response.data === 'confirm') {
                    let respo = await this.$store.dispatch('saas/projectSetting/removeMembers', {
                        id: this.id,
                        user_id: id
                    });
                    if (respo.code === 200) {
                        this.memberList = this.memberList.filter(user => {
                            return user.user_id !== id
                        })
                    }
                    else {
                        console.log(respo)
                    }
                }
            },
            async saveChangeMembers({userInfo}) {
                this.$store.dispatch('saas/projectSetting/saveMembers', {
                    id: this.id,
                    users: [{
                        id: userInfo.user_id,
                        role: userInfo.user_role
                    }]
                })
            },
            async save() {
                if (this.verify) {
                    let data = {
                        id: this.id,
                        name: this.projectName,
                        description: this.projectDesc,
                        photo: {
                            src: this.coverImage.getSrc,
                            size: this.coverImage.getSize
                        }
                    };
                    let result = await this.$store.dispatch('saas/projectSetting/saveProjectSetting', data);
                    if (result.code === 200) {
                        this.$alert({type: 'alert', message: this.translate('ss')})
                    }
                }
            },
            imageStatusChange: function ({data}) {
                this.imgLength = data.length;
                if (this.imgLength) {
                    this.coverImage = data[0]
                }
            },

        }
    }
</script>

<style scoped lang="scss">
    .project-member-container, .project-information-container {
        padding: 60px 20px 29px 20px;
        .active {
            color: #EA6264;
        }
    }

    .project-member-container {
        .btn-invite {
            background-color: #EA6264;
            margin-top: 48px;
            width: 120px;
            height: 36px;
            line-height: 36px;
            font-size: 16px;
            display: block;
            text-align: center;
            border-radius: 100px;
            color: #fff;
            &:hover {
                background-color: #CD5355;
            }
            &:active {
                background-color: #BC3A3C;
            }
            &[disabled] {
                background: transparent;
                border: 1px solid #D2D2D2;
                border-radius: 100px;
                color: #9B9B9B;
            }
            &.disabled {
                color: #9B9B9B;
                background: transparent;
                border: 1px solid #D2D2D2;
                border-radius: 100px;
            }
        }
        .search {
            height: 72px;
            input {
                margin-top: 14px;
                width: 100%;
                height: 36px;
                border: 1px solid #D2D2D2;
                border-radius: 2px;
                text-indent: 10px;
                font-size: 16px;
                color: #4A4A4A;
                &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                    color: #9B9B9B;
                }
                &:-moz-placeholder { /* Mozilla Firefox 19+ */
                    color: #9B9B9B;
                }
                &:-ms-input-placeholder { /* Internet Explorer 10+ */
                    color: #9B9B9B;
                }
            }
        }
    }

    .saas-wrapper {
        margin-bottom: 10px;
    }

    .sass-wrapper:last-child {
        margin-bottom: 0;
    }

    .project-information-container {
        .admin-member-contanier {
            min-height: 419px
        }
        .show-roles-select {
            font-size: 12px;
            color: #7A7A7A;
            &last-child {
                margin-right: 0;
            }
            span {
                display: inline-block;
                margin-right: 36px;
            }
            .change-color-red {
                color: #EA6264
            }
        }
        .small-title {
            font-size: 16px;
            color: #4A4A4A;
            margin-bottom: 12px;
        }
        .desc {
            font-size: 16px;
            color: #4A4A4A;
        }
        input, textarea {
            width: 855px;
        }
        input {
            border: 1px solid #d2d2d2;
            border-radius: 2px;
            height: 42px;
            font-size: 16px;
            color: #9b9b9b;
            padding: 10px;
            margin-bottom: 18px;
        }
        textarea {
            border: 1px solid #d2d2d2;
            border-radius: 2px;
            padding: 10px;
        }
        .btns {
            display: flex;
            justify-content: center;
            .btn {
                width: 112px;
                height: 30px;
                font-size: 16px;
                margin-top: 55px;
                margin-left: auto;
                margin-right: auto;
            }
        }
    }

    .member-list-container {
        height: auto;
        .back {
            position: absolute;
            top: 25px;
            left: 25px;
            height: 14px;
            transform: scaleX(-1);
        }
        .wrapper {
            /*margin-top: 34px;*/
            display: flex;
            flex-wrap: wrap;
            li {
                display: flex;
                margin-top: 34px;
                width: 25%;
                &:hover .remove {
                    opacity: 1;
                }
                .name-content {
                    font-size: 14px;
                    color: #7A7A7A;
                    width: 128px;
                    display: flex;
                    .name {
                        width: 114px;
                        margin-right: 3px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis
                    }
                }
                .select {
                    margin-left: auto;
                    margin-right: 16px;
                }
                .option-btns-no-operate, .option-btns-operate {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 3px;
                }
                .option-btns-no-operate {
                    margin-top: 3px;
                }
                .joined.join-resend {
                    font-size: 12px;
                    color: #9B9B9B;
                }
                .join-resend {
                    font-size: 12px;
                    color: #9B9B9B;
                }
                .remove {
                    font-size: 12px;
                    color: #EA6264;
                    opacity: 0;
                    transition: all 0.5s;
                    margin-left: 3px;
                    &:hover {
                        opacity: 1;
                    }
                }
                .avatar {
                    height: 78px;
                    width: 78px;
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: center;
                    border-radius: 100%;
                }
                .member-content {
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                    margin-left: 10px;
                    .email {
                        font-size: 10px;
                        color: #9B9B9B;
                        margin-top: 4px;
                    }
                    .avatar-class {
                        height: 11px;
                        width: 12px;
                        display: inline-block;
                        margin-top: 3px;
                    }
                    .is-admin {
                        font-size: 12px;
                        margin-top: 6px;
                        color: #7A7A7A;
                    }
                }
            }
        }
    }
</style>
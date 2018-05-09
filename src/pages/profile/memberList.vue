<template>
    <div class="member-container w-940 auto" v-if="memberList.length > 0">
        <p v-lang.memberList class="title"></p>
        <div class="list-pane flex">
            <div class="member flex" v-for="item in memberList" :key="item.user_id">
                <div class="member-box position-relative">
                    <img :src="item.user_avatar" alt="" class="img-max portrait-img">
                    <template v-if="item.user_type === 4">
                        <img src="../../assets/images/business-icon.png" class="user-status">
                    </template>
                    <template v-else-if="item.user_type === 3">
                        <img src="../../assets/images/user-model-icon.png" class="user-status">
                    </template>
                </div>
                <p class="name">{{item.user_name}}</p>
                <div v-if="isEdit">
                    <div class="delete" @click="deleteMember(item.user_id)"  v-if="userId !== item.user_id">
                        <p v-lang.delete></p>
                    </div>
                     <div class="disable" v-else>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: 'memberList',
    data () {
        return {}
    },
    props: {
        isEdit: {
            required:true,
            type:Boolean,
            default:false
        },
        teamId: {
            required:true,
            type: Number
        },
        memberList: {
            required:true,
            type:Array,
            default() {
                return []
            }
        }
    },
    messages:{
        en:{
            memberList: 'Member List',
            delete: 'Delete',
            deleteMsg: 'Are you sure you want to remove this member?'
        },
        zh:{
            memberList: '成员列表',
            delete: '删除',
            deleteMsg: '你确定要删除这个成员吗?'
        }
    },
    methods: {
        deleteMember(userId) {
            this.$alert({type:'confirm',message:this.translate('deleteMsg')}).then((response) => {
                if(response.data === 'confirm'){
                    let params = {
                        user_id: userId,
                        id: this.teamId
                    }
                    this.$store.dispatch('deleteMember', params).then((response) => {
                        if(response.code === 200) {
                            this.memberList.forEach((item, index) => {
                                if(userId === item.user_id) {
                                    this.memberList.splice(index, 1)
                                }
                            })
                        }
                    })
                }
            })
        }
    },
    computed:mapState({
        userId: state => state.user.userId
    }),
}
</script>

<style lang="scss" scoped>
    .member-container {
        background-color: #ffffff;
        padding: 25px 40px 0px;
        .title {
            margin-bottom: 30px;
            font-size: 18px;
            color: #515254;
        }
        .list-pane {
            flex-direction: row;
            align-items: center;
            flex-wrap: wrap;
            .member {
                width: 150px;
                margin-bottom: 50px;
                margin-right: 20px;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                .member-box {
                    width: 64px;
                    height: 64px;
                    .portrait-img{
                        border-radius: 100%;
                    }
                    .user-status{
                        position:absolute;
                        right:0;
                        top:0;
                        width: 16px;
                        height: 16px;
                    }
                }
                .name {
                    margin-top: 12px;
                    font-size: 16px;
                    color:#7a7a7a;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                }
                .delete {
                    margin-top: 10px;
                    width: 49px;
                    height: 21px;
                    line-height: 21px;
                    text-align: center;
                    border: 1px solid #B2B2B2;
                    border-radius: 2px;
                    cursor: pointer;
                    p {
                        font-size: 12px;
                        color: #d0d0d0;
                    }
                    &:hover {
                        background-color: #EFEFEF;
                        border-color: #E3E3E3;
                    }
                }
                .disable {
                    margin-top: 10px;
                    width: 49px;
                    height: 21px; 
                }
            }
        }
    }
</style>



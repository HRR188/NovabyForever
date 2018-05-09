<template>
    <section class="main">
        <div class="auto w-940 message-center-warp">
            <h1 class="text-center" v-lang.m1></h1>
            <div class="message-operation flex">
                <button class="btn all-read" @click="readMsgAc()" v-lang.m2></button>
                <button class="btn remove" @click="removeMsgAc()" v-lang.m3></button>
            </div>
            <ul class="message-center-list" id="message-center-list" v-if="messageList.length">
                <li v-for="(msg , index) in messageList" :class="{new:msg.msg_read}">
                    <!-- 如果是team邀请消息 -->
                    <template v-if="msg.caction === 'E'">
                        <div class="no-system-msg clearfix">
                            <p class="system-msg-txt" v-lang.m4></p>
                            <p class="name">{{msg.from.username}}</p>
                            <p class="msg-content msg-name">{{msg.msg}}</p>
                            <p class="msg-date">{{time(index) | time}}</p>
                        </div>
                        <div class="msg-btn">
                            <div class="flex" v-if="msg.status === 0">
                                <div class="default-btn agree-btn" @click="agree(msg.msg_rid)">{{translate('agree')}}</div>
                                <div class="default-btn reject-btn" @click="reject(msg.msg_rid)">{{translate('reject')}}</div>
                            </div>
                            <div v-else>
                                <p class="status-msg">{{getMesStustas(msg.status)}}</p>
                            </div>
                        </div>
                    </template>
                    <!-- 如果是系统消息 -->
                    <template v-else-if="msg.caction === 'C'">
                        <div class="system-msg" @click="goToMsgDetail(msg ,'system')" :data-index="index">
                            <p class="name" v-lang.m4></p>
                            <p class="msg-date">{{time(index) | time}}</p>
                            <div>{{msg.msg}}</div>
                        </div>
                    </template>
                    <!-- 跳转至个人主页 -->
                    <template v-else-if="msg.caction === 'B'">
                        <div class="no-system-msg clearfix" @click="goToMsgDetail(msg,'personal')">
                            <!-- <img :src="items.from.avatar" alt=""> -->
                            <div>
                                <portrait :portraitUrl="msg.from.avatar" :type="msg.from.user_type" :width="16" :height="16"></portrait>
                            </div>
                            <p class="name">{{msg.from.username}}</p>
                            <p class="msg-content">{{msg.msg}}</p>
                            <p class="msg-date">{{time(index) | time}}</p>
                        </div>
                    </template>
                    <!-- 跳转至私密项目 -->
                    <template v-else-if="msg.caction === 'D'">
                        <router-link :to="{name:'saasModelSpecification',params:{id:msg.msg_rid}}" target="_blank">
                            <div class="no-system-msg clearfix">
                                <div>
                                    <portrait :portraitUrl="msg.from.avatar" :type="msg.from.user_type" :width="16" :height="16"></portrait>
                                </div>
                                <p class="name">{{msg.from.username}}</p>
                                <p class="msg-content">{{msg.msg}}</p>
                                <p class="msg-date">{{time(index) | time}}</p>
                            </div>
                        </router-link>
                    </template>

                    <!-- 聊天消息通知 -->
                    <template v-else-if="msg.caction === 'F'" target="_blank">
                        <router-link :to="{name:'saasChat',params:{id:msg.msg_rid}}" :key="msg.msg_rid">
                            <div class="message-item no-system" >
                                <div class="text-message">
                                    <div class="message-daily">{{msg.msg}}</div>
                                </div>
                            </div>
                        </router-link>
                    </template>

                    <!--  跳转至项目详情 -->
                    <template v-else>
                        <router-link :to="{name:'model-detail',params:{id:msg.msg_rid}}" target="_blank">
                            <div class="no-system-msg clearfix">
                                <div>
                                    <portrait :portraitUrl="msg.from.avatar" :type="msg.from.user_type" :width="16" :height="16"></portrait>
                                </div>
                                <p class="name">{{msg.from.username}}</p>
                                <p class="msg-content">{{msg.msg}}</p>
                                <p class="msg-date">{{time(index) | time}}</p>
                            </div>
                        </router-link>
                    </template>
                    <span class="remove-msg" @click="removeMsgAc(msg.msg_id)"></span>
                </li>
            </ul>
            <div class="nomore-message text-center" v-else v-lang.noMessage>

            </div>
            <!--<loading :loadingMsg="loading"></loading>-->
        </div>
    </section>
</template>
<script>
    import portrait from '../../components/user/headPortrait'
    import loading from '../../components/commons/loading'
    import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'

    export default{
        name:'message-center',
        components:{
            loading,
            portrait
        },
        created(){
            this.resetFn()
        },
        data(){
            return {
                messageList:[]
            }
        },
        messages:{
            en:{
                m1:'Notification',
                m2:'Mark all as read',
                m3:'Delete all',
                m4:'System message',
                noMessage:'You don\'t have any notifications',
                agree:'Agree',
                reject: 'Reject',
                agreed: 'Agreed',
                rejected :'Rejected'
            },
            zh:{
                m1:'提醒',
                m2:'标记全部为已读',
                m3:'删除全部',
                m4:'系统消息',
                noMessage:'你没有任何消息',
                agree:'同意',
                reject: '拒绝',
                agreed: '已同意',
                rejected :'已拒绝'
            }
        },
        watch:{
            $route:'resetFn',
            systemMsgs:function () {
                this.messageList = this.systemMsgs
            },
            allMsgs:function () {
                this.messageList = this.allMsgs
            }
        },
        computed:{
            ...mapGetters('message',[
                'systemMsgs','allMsgs'
            ])
        },
        methods:{
            ...mapActions('message',[
                'getMsgs','removeMsgAc','readMsgAc'
            ]),
            time(index) {
                return {
                    start: this.messageList[index].msg_time,
                    end: this.messageList[index].time
                }
            },
            resetFn(){
                let type = this.$route.params.id;
                let _this = this
                this.getMsgs(0).then(()=>{
                    if(type === 'all'){
                        _this.messageList = _this.allMsgs
                    }
                    else{
                        _this.messageList = _this.systemMsgs
                    }
                })
            },
            goToMsgDetail(msg,type){
                this.readMsgAc(msg.msg_id)
                if(type === 'system') {  // 前往消息中心
                    //this.$router.push({name:'message-center',params:{id:'system'}})
                }
                else if(type === 'personal') { // 前往个人主页
                    this.$router.push({name:'personalAbout',params:{id:msg.msg_rid}})
                }
                else {   //  前往模型详情
                    // this.$router.push({name:'model-detail',params:{id:msg.msg_rid}})
                }
            },
            setStutas(status, msg_rid) {
                this.messageList.forEach(item => {
                    if(msg_rid === item.msg_rid) {
                        item.msg_read = 0
                        item.status = status
                    }
                })
            },
            getMesStustas(status) {
                let msg = ''
                if(status === 1) {
                    msg = this.translate('agreed')
                }
                else if(status === 2) {
                    msg = this.translate('rejected')
                }

                return msg
            },
            agree(inviteId) {
                this.$store.dispatch('joinMembers', {id: inviteId}).then((response) => {
                    if(response.code === 200) {
                        //同意后处理
                        this.setStutas(1, inviteId)
                    }
                })
            },
            reject(inviteId) {
                this.$store.dispatch('rejectMembers', {id: inviteId}).then((response) => {
                    if(response.code === 200) {
                        //拒绝后处理
                        this.setStutas(2, inviteId)
                    }
                })
            }
        }
    }
</script>
<style lang="scss">
.message-center-warp{
    >h1{
        margin-top:50px;
        font-size: 30px;
        color: #515254;
        font-weight: normal;
    }
    .message-operation{
        margin-top:58px;
        justify-content: flex-end;
        button{
            height:32px;
            line-height: 32px;
            font-size: 12px;
            border-radius: 100px;
            background-color:#F7F8FA;
        }
        .all-read{
            width:115px;
            border: 1px solid #4990E2;
            color:#4990E2;
            margin-right:20px;
        }
        .remove{
            color: #95979A;
            width:78px;
            border:1px solid #95979A;
        }
    }
    .message-center-list{
        margin-top:18px;
        >li{
            background: #FFFFFF;
            border: 1px solid #E0E0E0;
            border-radius: 4px;
            padding:20px 22px 20px 30px;
            margin-bottom:30px;
            position: relative;
            &.new:before{
                content:'';
                display: block;
                position: absolute;
                left:10px;
                top:50%;
                width:6px;
                height:6px;
                margin-top:-3px;
                border-radius: 100%;
                background-color:#4990E2;

            }
            .remove-msg{
                position: absolute;
                top:8px;
                right:8px;
                cursor: pointer;
                display: block;
                cursor: pointer;
                width:8px;
                height:8px;
                background:url(../../assets/images/remove-msg.png);
            }
            >a{
                display: block;
            }
            .no-system-msg{
                cursor: pointer;
                >div{
                    width:56px;
                    height:56px;
                    float: left;
                }
                .name{
                    line-height: 56px;
                    font-size: 18px;
                    color: #4990E2;
                    margin-left:15px;
                    float: left;
                }
                .msg-content{
                    font-size: 18px;
                    color: #7A7A7A;
                    margin-left:30px;
                    float: left;
                    line-height: 56px;
                }
                .msg-date{
                    float: right;
                    font-size: 14px;
                    color: #BCC3C9;
                    line-height: 56px;
                }
                .msg-name {
                    margin-left: 0
                }
                .system-msg-txt {
                    font-size: 18px;
                    color: #515254;
                }
            }
            .msg-btn {
                .default-btn {
                    width: 56px;
                    height: 23px;
                    font-size: 12px;
                    line-height: 23px;
                    text-align: center;
                    border-radius: 100px;
                    cursor: pointer;
                }
                .agree-btn {
                    color :#EA6264;
                    border: 1px solid #EA6264;
                }
                .reject-btn {
                    margin-left: 15px;
                    color: #95979A;
                    border: 1px solid #95979A;
                }
                .status-msg {
                    font-size: 12px;
                    color: #95979A;
                }
            }
            .system-msg{
                cursor: pointer;
                .name{
                    float: left;
                    font-size: 18px;
                    color: #515254;
                }
                .msg-date{
                    float: right;
                    font-size: 14px;
                    color: #BCC3C9;
                }
                >div{
                    font-size: 14px;
                    color: #7A7A7A;
                    width:100%;
                    clear: both;
                    padding-top:12px;
                }
            }

        }
    }
    .nomore-message{
        font-size: 18px;
        color: #7A7A7A;
        height: 140px;
        line-height: 140px;
    }
}
</style>

<template>
    <div class="message" :class="{ newmsg: unreadMsgs.length }" @mouseover="messageShowStatus = true" @mouseout="messageShowStatus = false">
        <!-- newmsg 类 控制是否是新的消息样式 -->
        <!--<a></a>-->
        <a></a>
        <p>
            <span>{{unreadMsgs.length > 100? '99+' : unreadMsgs.length}}</span>
        </p>
        <!--消息下拉列表 start-->
        <div class="message-list-box" v-show="messageShowStatus">
            <div v-if="unreadMsgs.length">
                <div class="all-read flex">
                    <button type="button" class="btn" @click="readMsgAc()">Mark all as read</button>
                </div>
                <ul class="message-list" id="message-list">
                    <li v-for="(msg , index) in unreadMsgs" :class="{'new':msg.msg_read}">
                        <!-- 如果是team邀请消息 -->
                        <template v-if="msg.caction === 'E'">
                            <router-link :to="{name:'message-center',params:{id:'all'}}" :key="msg.msg_rid">
                                <div class="message-item no-system">
                                    <people-portrait :portraitUrl="msg.from.avatar" :type="msg.from.user_type" :width="16" :height="16"></people-portrait>
                                    <div class="text-message">
                                        <span>{{msg.from.username}}</span>
                                        <p>{{time(index) | time}}</p>
                                        <div class="message-daily">{{msg.msg}}</div>
                                    </div>
                                </div>
                            </router-link>
                        </template>
                        <!-- 如果是系统消息 -->
                        <template v-else-if="msg.caction === 'C'">
                            <router-link :to="{name:'message-center',params:{id:'system'}}" :key="msg.msg_rid">
                                <div class="message-item no-system" @click="goToMsgDetail(msg)">
                                    <div class="text-message">
                                        <span style="color:#515254;">System message</span>
                                        <p>{{time(index) | time}}</p>
                                        <div class="message-daily">{{msg.msg}}</div>
                                    </div>
                                </div>
                            </router-link>
                        </template>
                        <!-- 跳转至个人主页 -->
                        <template v-else-if="msg.caction === 'B'">
                            <router-link :to="{name:'personalAbout',params:{id:msg.msg_rid}}" :key="msg.msg_rid">
                                <div class="message-item no-system" @click="goToMsgDetail(msg)">
                                    <people-portrait :portraitUrl="msg.from.avatar" :type="msg.from.user_type" :width="16" :height="16"></people-portrait>
                                    <div class="text-message">
                                        <span>{{msg.from.username}}</span>
                                        <p>{{time(index) | time}}</p>
                                        <div class="message-daily">{{msg.msg}}</div>
                                    </div>
                                </div>
                            </router-link>
                        </template>
                        <!-- 跳转至模型详情 -->
                        <template v-else-if="msg.caction === 'A'" target="_blank">
                            <router-link :to="{name:'model-detail',params:{id:msg.msg_rid}}" :key="msg.msg_rid">
                                <div class="message-item no-system" @click="goToMsgDetail(msg)">
                                    <people-portrait :portraitUrl="msg.from.avatar" :type="msg.from.user_type" :width="16" :height="16"></people-portrait>
                                    <div class="text-message">
                                        <span>{{msg.from.username}}</span>
                                        <p>{{time(index) | time}}</p>
                                        <div class="message-daily">{{msg.msg}}</div>
                                    </div>
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
                            <router-link :to="{name:'saasModelSpecification',params:{id:msg.msg_rid}}" :key="msg.msg_rid" target="_blank">
                                <div class="message-item no-system" @click="goToMsgDetail(msg)">
                                    <people-portrait :portraitUrl="msg.from.avatar" :type="msg.from.user_type" :width="16" :height="16"></people-portrait>
                                    <div class="text-message">
                                        <span>{{msg.from.username}}</span>
                                        <p>{{time(index) | time}}</p>
                                        <div class="message-daily">{{msg.msg}}</div>
                                    </div>
                                </div>
                            </router-link>
                        </template>
                        <span class="remove-msg" @click="removeMsgAc(msg.msg_id)"></span>
                    </li>
                </ul>
                <router-link :to="{name:'message-center',params:{id:'all'}}" class="link-all" v-lang.sa></router-link>
            </div>
            <div class="no-message text-center" v-else>
                <p v-lang.m1></p>
                <router-link :to="{name:'message-center',params:{id:'all'}}" class="text-center" v-lang.sa></router-link>
            </div>
        </div>
        <!--消息下啦列表 end-->
    </div>
</template>

<script>
    import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'
    import peoplePortrait from '../../user/headPortrait'
    export default {
        name: "msg",
        components:{
            peoplePortrait
        },
        data(){
            return{
                messageShowStatus: false,
            }
        },
        messages:{
            en:{
                m1:'You don\'t have any notifications.',
                sa:'See All'
            },
            zh:{
                m1:'您还没有任何提醒。',
                sa:'查看全部'
            }
        },
        computed:{
            ...mapGetters('message',[
                'unreadMsgs'
            ]),
        },
        methods:{
            ...mapActions('message',[
                'getMsgs','removeMsgAc','readMsgAc'
            ]),
            time(index) {
                return {
                    start: this.unreadMsgs[index].msg_time,
                    end: this.unreadMsgs[index].time
                }
            },
            goToMsgDetail(msg){
                this.readMsgAc(msg.msg_id);
            },
        }
    }
</script>

<style scoped lang="scss">

</style>
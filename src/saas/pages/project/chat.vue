<template>
    <saas-wrapper class="saas-chat-container">
        <loading ref="loading">
            <saas-title :title="translate('ms')"></saas-title>
            <div class="user-list">
                <div v-for="type in userList" class="user-type" v-show="type.list.length" :class="{close:type.close}">
                    <div class="title" @click="type.close = !type.close">{{type.name}}</div>
                    <ul>
                        <li class="pointer" v-for="user in type.list" :class="{active:+user.id === +userId,new:user.hasNewMsg}" @click="selectUser(user.id)">
                            <div class="portrait">
                                <protrait :portraitUrl="user.avatar" :type="user.type" :width="12" :height="13"></protrait>
                            </div>
                            <span class="name p-one-line">{{user.name}}</span>
                            <img v-if="user.creator" class="flag" src="../../../assets/images/saas/icon_flag.png" alt="">
                        </li>
                    </ul>
                </div>
            </div>
            <div class="user-chat" id="message-wrapper">
                <div>
                    <div class="message-container" v-for="message in messageList" :class="{'my-message':+message.user.id === +myId}">
                        <p class="name" v-if="+message.user.id !== +myId">{{message.user.name}} &nbsp; {{getTime(message.time)}}</p>
                        <p class="name" v-else>{{getTime(message.time)}} &nbsp; {{message.user.name}}</p>
                        <div class="portrait">
                            <protrait :portraitUrl="message.user.avatar" :type="message.user.type" :width="12" :height="13"></protrait>
                        </div>
                        <div class="message">
                            <span>{{message.message}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="chat">
                <textarea name="" id="" cols="30" rows="8" placeholder="Say something..." v-model="str"></textarea>
                <button class="btn btn-default" @click="send">Send</button>
            </div>
        </loading>
    </saas-wrapper>
</template>
<script>
    import saasWrapper from '../../components/saasWrapper'
    import loading from '../../components/loading.vue'
    import protrait from '../../../components/user/headPortrait.vue'
    import saasTitle from '../../components/saasTitle.vue'
    import socket from '../../../api/socket'

    let _socket;
    export default {
        name:'saasChat',
        data(){
            return {
                name:'',
                str:'',
                userList:[],
                messageList:[]
            }
        },
        messages:{
            en:{
                ms:'Message'
            },
            zh:{
                ms:'消息'
            }
        },
        props:{
            id:{
                required:true
            },
            userId:{
                required:false
            }
        },
        components:{
            saasTitle,
            protrait,
            saasWrapper,
            loading
        },
        computed:{
            myAvatar(){
                return this.$store.state.user.userAvatar
            },
            myType(){
                return this.$store.state.user.userType
            },
            myId(){
                return this.$store.state.user.userId
            },
            myName(){
                return this.$store.state.user.userName
            }
        },
        watch:{
            $route:function () {
                this.getUserMessages()
            }
        },
        async created(){
            await this.getUserList();
            this.$refs.loading.showSlots();
            await this.getUserMessages();
            this.initSocket()
        },
        beforeDestroy(){
            // 监听Socket的关闭
            _socket.close()
        },
        methods:{
            send(){
                let data = {
                    "cmd":"send_message",
                    "from_user_id":this.myId,
                    "to_user_id":this.userId,
                    "message": this.str,
                    "project_id" : this.id
                };
                data = JSON.stringify(data);
                _socket.send(data);
                let context = {
                    message:this.str,
                    time:(new Date() / 1000),
                    user:{
                        avatar:this.myAvatar,
                        type:this.myType,
                        id:this.myId,
                        name:this.myName
                    }
                };
                this.messageList.push(context);
                this.scrollToBottom();
                this.str = ''
            },
            initSocket:function () {
                let _this = this;
                function onOpen() {
                    // 发送一个初始化消息
                    let register_info = {
                        cmd : 'register',
                        token : localStorage.getItem('token'),
                        project_id:_this.id
                    };
                    _socket.send(JSON.stringify(register_info));
                }
                function onMessage(event) {
                    try {
                        let result = JSON.parse(event.data);
                        // 注册 socket 返回
                        if (result.cmd === 'register_response') {
                            if (result.status === 'success') {
                                // app.from_user_id = result.register_user_id;
                                console.log('web_socket register success');
                            }
                        }
                        // 发送消息 返回
                        else if(result.cmd === 'send_response'){

                        }
                        // 接收消息
                        else if (result.cmd === 'revice_message') {
                            if(result.project_id === _this.id){
                                if(+'-1' !== +result.to_user_id){
                                    if(+_this.userId === +result.from_user_id){
                                        let context = {
                                            message:result.message,
                                            time:result.time,
                                            user:result.user
                                        };
                                        _this.messageList.push(context);
                                        _this.scrollToBottom()
                                    }
                                    else{
                                        _this.getUser(result.from_user_id,true)
                                    }
                                }
                                else{
                                    if(+_this.userId === +'-1'){
                                        let context = {
                                            message:result.message,
                                            time:result.time,
                                            user:result.user
                                        };
                                        _this.messageList.push(context);
                                        _this.scrollToBottom()
                                    }
                                    else{
                                        _this.getUser('-1',true)
                                    }
                                }
                            }
                        }
                    }
                    catch(err){
                        console.log(err);
                    }
                }
                function onClose(event) {
                    console.log('Client notified socket has closed',event);
                }
                _socket = socket({port:'message',onOpen,onMessage,onClose});
            },
            async getUserMessages() {
                if(this.userId){
                    let response = await this.$store.dispatch('saas/chat/getChatUserHistory',{id:this.id,user_id:this.userId});
                    this.messageList = response.data.history;
                    this.scrollToBottom()
                }
            },
            async getUserList() {
                let respo = await this.$store.dispatch('saas/chat/getChatUserList',{id:this.id});
                respo.data.user.forEach(user => {
                    user.close = false
                });
                this.userList = respo.data.user
            },
            selectUser(id){
                this.getUser(id,false);
                this.$router.push({name:'saasChatUser',params:{userId:id}})
            },
            getUser(id,value){
                this.userList.forEach(type => {
                    type.list.forEach(user => {
                        if(+user.id === +id){
                            user.hasNewMsg = value;
                            this.$forceUpdate();
                        }
                    })
                })
            },
            scrollToBottom(){
                setTimeout(()=>{
                    let container = document.getElementById("message-wrapper");
                    if(container){
                        container.scrollTop = container.scrollHeight;
                    }
                },0)
            },
            getTime:function (time) {
                let date = new Date(time*1000);
                return ('00'+date.getHours()).substring(('00'+date.getHours()).length-2)+':'
                    +('00'+date.getMinutes()).substring(('00'+date.getMinutes()).length-2)+':'
                    +('00'+date.getSeconds()).substring(('00'+date.getSeconds()).length-2)
                    +' '+date.getFullYear()+'/'
                    +('00'+(date.getMonth()+1)).substring(('00'+(date.getMonth()+1)).length-2) +'/'
                    +('00'+date.getDate()).substring(('00'+date.getDate()).length-2)+' '
            },
        }
    }
</script>
<style lang="scss">
    .saas-chat-wrap{
        background-color:#fff;
        .chat-container{
            >ul{
                height:870px;
                overflow: auto;
                width:248px;
                border-right:1px solid #E8E8E8;
                li{
                    display: flex;
                    align-items: center;
                    height:94px;
                    cursor: pointer;
                    padding:0 20px;
                    div{
                        width:64px;
                        height:64px;
                    }
                    p{
                        font-size: 16px;
                        color: #515254;
                        margin-left:8px;
                        width:100%;
                        overflow:hidden;
                        white-space:nowrap;
                        text-overflow:ellipsis;
                    }
                    &.active{
                        background-color:  #F3F3F3;;
                    }
                }
            }
            .chat-msg{
                height:870px;
                width:calc(100% - 248px);
                >p{
                    padding:15px 0 15px 24px;
                    font-size: 16px;
                    color: #515254;
                }
                .chat{
                    height:618px;
                    overflow-y: auto;
                    padding:25px 20px;
                    .your,.myself{
                        display: flex;
                        margin-bottom:50px;
                    }
                    .your{
                        justify-content: flex-start;
                        .content{
                            background: #D9F4FE;
                            margin:0 0 0 10px;
                            display: flex;
                            align-items: center;
                            &:before{
                                content: '';
                                display: block;
                                width: 0;
                                height: 0;
                                position: absolute;
                                left: -6px;
                                top: 10px;
                                border-top: 4px solid #fff;
                                border-right: 8px solid #D9F4FE;
                                border-bottom: 4px solid #fff;
                            }
                        }
                    }
                    .myself{
                        justify-content: flex-end;
                        .content{
                            background-color:  #F3F3F3;
                            margin-right:10px;
                            display: flex;
                            align-items: center;
                            &:before{
                                content: '';
                                display: block;
                                width: 0;
                                height: 0;
                                position: absolute;
                                right: -6px;
                                top: 10px;
                                border-top: 4px solid #fff;
                                border-left: 8px solid #F3F3F3;
                                border-bottom: 4px solid #fff;
                            }
                        }
                    }
                    .protrait{
                        width:55px;
                        height:55px;
                    }
                    .content{
                        display: flex;
                        align-items: center;
                        padding:12px 18px;
                        font-size: 12px;
                        color: #7A7A7A;
                        position: relative;
                        border-radius: 2px;
                        max-width: 500px;
                        p{
                            line-height: 20px;
                        }
                    }
                }
                .inputting{
                    height:200px;
                    border-top:1px solid #E8E8E8;
                    padding:15px 20px;
                    textarea{
                        display: block;
                        width:100%;
                        height:120px;
                        border:none;
                        font-size: 12px;
                        color: #7A7A7A;
                        resize: none;
                    }
                    div{
                        margin-top:20px;
                    }
                    button{
                        font-size: 14px;
                        width:80px;
                        height:30px;
                    }
                }
            }
        }
    }
    .saas-chat-container{
        .user-list,.user-chat{
            height: 635px;
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            overflow-y: auto;
            overflow-x: hidden;
            &.none{
                justify-content: center;
                align-items: center;
            }
        }
        .user-list{
            width: 224px;
            border-right: 1px solid #EEEEEE;
            .user-type{
                margin-top: 16px;
                width: 100%;
                &.close{
                    .title{
                        &:before{
                            transform: rotate(-90deg);
                        }
                    }
                    ul{
                        max-height: 0;
                        overflow: hidden;
                    }
                }
                .title{
                    font-size: 14px;
                    color: #ACACB2;
                    padding-left: 20px;
                    display: flex;
                    align-items: center;
                    &:before{
                        content:"";
                        height: 0;
                        width: 0;
                        border-width: 8px 6px 0 6px;
                        border-color:#ACACB2 transparent transparent transparent;
                        border-style: solid;
                        margin-right: 7px;
                        transition: transform .5s;
                    }
                }
                ul{
                    max-height: 2000px;
                    transition: max-height .5s;
                    li{
                        padding:10px 20px;
                        height: 60px;
                        display: flex;
                        align-items: center;
                        position: relative;
                        .portrait{
                            width: 40px;
                            height: 40px;
                            margin-right: 10px;
                        }
                        .name{
                            font-size: 14px;
                            color: #515254;
                            flex: 1;
                        }
                        .flag{
                            margin-left: auto;
                        }
                        &:hover{
                            background: #F4F4F4;
                        }
                        &.active{
                            background: #F4F4F4;
                        }
                        &.new{
                            &:before{
                                content:"";
                                width: 4px;
                                height: 4px;
                                background-color: red;
                                border-radius: 100%;
                                position: absolute;
                                top:28px;
                                left:8px;
                            }
                        }
                    }
                }
            }
        }
        .user-chat{
            width: auto;
            flex:1;
            padding:20px 40px;
            .message-container{
                display: flex;
                flex-wrap: wrap;
                width: 100%;
                margin-bottom: 37px;
                .name{
                    width: 100%;
                    font-size: 12px;
                    color: #7A7A7A;
                    height: 20px;
                    padding:0 70px;
                }
                .portrait{
                    width: 40px;
                    height: 40px;
                    margin-right: 10px;
                }
                .message{
                    border-radius: 2px;
                    flex: 1;
                    display: flex;
                    &:before{
                        content:"";
                        height: 0;
                        width: 0;
                        border-width: 8px 12px 8px 0;
                        border-color:transparent #D9F4FE transparent transparent;
                        border-style: solid;
                        margin-top: 10px;
                    }
                    span{
                        padding:10px 20px;
                        background: #D9F4FE;
                        font-size: 12px;
                        color: #7A7A7A;
                        text-align: justify;
                        line-height: 20px;
                    }
                }
                &.my-message{
                    flex-direction: row-reverse;
                    .name{
                        text-align: right;
                    }
                    .portrait{
                        margin-right: 0;
                        margin-left: 10px;
                    }
                    .message{
                        flex-direction: row-reverse;
                        &:before{
                            border-width: 8px 0 8px 12px;
                            border-color:transparent transparent transparent #F3F3F3;
                        }
                        span{
                            background: #F3F3F3;
                        }
                    }
                }
            }
        }
        .chat{
            width: 100%;
            height: 237px;
            background: #FDFDFE;
            border-top: 1px solid #EEEEEE;
            padding:40px;
            position: relative;
            textarea{
                background: #FFFFFF;
                border: 1px solid #D2D2D2;
                border-radius: 2px;
                width: 100%;
                padding:10px;
                resize: none;
            }
            .btn{
                width: 80px;
                height: 30px;
                font-size: 14px;
                color: #FFFFFF;
                position: absolute;
                right: 40px;
                bottom: 20px;
            }
        }
        .slots{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
        }
    }
</style>
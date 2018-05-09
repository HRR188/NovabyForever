<template>
    <div class="tabs-container">
        <div class="tabs">
            <ul>
                <li v-for="tab in tabs" :class="{'is-active':tab.isActive}" @click="selectedTab(tab)">
                        {{tab.name}}
                </li>
            </ul>
            <div v-if="showUploadBtn" class="upload-btn">
                <router-link :to="{name:'uploadNewModel'}">
                    <img src="../../assets/images/icon-upload.png" alt="" >
                    Upload
                </router-link>
            </div>
        </div>
        <div class="details">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'tabs',
        props:{
            name:{
                type:String
            }
        },
        data(){
            return{
                tabs:[],
                showUploadBtn:false,
                showQuotesBtn:false,
                requestSwitch:{
                    uploadsMoreSwitch1:false,
                    likesMoreSwitch1:true,
                    followersMoreSwitch1:true,
                    followingMoreSwitch1:true
                }

            }
        },
        mounted(){
            for(let i = 0;i<this.$children.length;i++){
                if(this.$children[i].name){
                    this.tabs.push(this.$children[i]);
                }
            }

            if(this.$route.path === '/models'){
                this.showUploadBtn = true;
            }
            let activeTabName = '';
            if(this.name === 'models'){
                if(this.$store.state.modelsList.modelsTabName){
                    activeTabName = this.$store.state.modelsList.modelsTabName
                }
            }
            else if(this.name === 'projects'){
                if(this.$store.state.novahub.projects.projectsTabName){
                    activeTabName = this.$store.state.novahub.projects.projectsTabName
                }
            }
            this.tabs.forEach(function (tab,index) {
                if(activeTabName){
                    tab.isActive = tab.name === activeTabName;
                }
                else{
                    if(!index){
                        tab.isActive = true;
                        return null;
                    }
                }
            })
        },
        methods:{
            selectedTab:function (selectedTab) {
                if(selectedTab.requireAuth && !this.$store.state.user.loginStatus){
                    this.$logPop().then( (response) => {
                        if(response){
                            this.tabs.forEach(function (tab) {
                                tab.isActive = tab.name === selectedTab.name;
                            });
                            this.$emit('switchTab',selectedTab.name);
                            if(this.name === 'models'){
                                this.$store.commit('modelsList/setModelsTabName',selectedTab.name)
                            }
                            else if(this.name === 'projects'){
                                this.$store.commit('novahub/projects/setProjectsTabName',selectedTab.name)
                            }
                        }
                    })
                }
                else{
                    this.tabs.forEach(function (tab) {
                        tab.isActive = tab.name === selectedTab.name;
                    });
                    this.$emit('switchTab',selectedTab.name);
                    if(this.name === 'models'){
                        this.$store.commit('modelsList/setModelsTabName',selectedTab.name)
                    }
                    else if(this.name === 'projects'){
                        this.$store.commit('novahub/projects/setProjectsTabName',selectedTab.name)
                    }
                }
            }
        }
    }
</script>

<style>
    .tabs-container{
        width: 100%;
    }
    .tabs-container .tabs{
        width: 100%;
        height: 50px;
        background: #FFFFFF;
        border-top:1px solid #EFEFF1;
        border-bottom:1px solid #EFEFF1;
        position: relative;
    }
    .tabs-container .tabs .upload-btn{
        width: 80px;
        height: 28px;
        font-size: 10px;
        color: #FFFFFF;
        border-radius: 100px;
        line-height: 28px;
        background: #EA6264;
        position: absolute;
        right: 95px;
        top: 10px;
        text-align: center;
    }
    .tabs-container .tabs .upload-btn img{
        margin-top: 9px;
        margin-right: 4px;
    }
    .tabs-container .tabs ul{
        width: 100%;
        display: flex;
        justify-content: center;
        flex-wrap: nowrap;
    }
    .tabs-container .tabs ul li{
        font-size: 16px;
        color: #2A2A36;
        line-height: 50px;
        min-width: 120px;
        text-align: center;
        position: relative;
        margin:0 30px;
        cursor: pointer;
    }
    .tabs-container .tabs ul li.is-active{
        color:#EA6264;
    }
    .tabs-container .tabs ul li.is-active:after{
        content:'';
        width: 100%;
        position: absolute;
        left:0;
        bottom: 2px;
        border-bottom: 2px solid #EA6264;;
    }
</style>

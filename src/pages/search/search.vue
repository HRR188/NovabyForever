<template>
    <section class="main search-warp" @click.stop="chooseType = false">
        <div class="search-top position-relative">
            <img src="../../assets/images/search-bg.png" alt="" class="img-max">
            <h3 class="text-center position-absolute">Type something to search</h3>
            <div class="search-text w-940 position-absolute">
                <input type="text" v-model="searchPageData" @keyup.enter="search" class="float-left"/>
                <span @click.stop="chooseType = true"></span>
                <button type="button" class="btn btn-default float-right upp" @click="search" v-lang.search></button>
                <ul class="position-absolute" v-show="chooseType">
                    <li v-for="(item,index) in searchType" class="upp" :class="{active:item.status}" @click="saveSearchType(index)">{{translate(item.text)}}</li>
                </ul>
            </div>
        </div>
        <ul class="flex sub-menu">
            <li>
                <router-link :to="{name:'searchUser'}">{{translate('user')}}({{userNum || 0}})</router-link>
            </li>
            <li>
                <router-link :to="{name:'searchModels'}">{{translate('model')}}({{modelNum || 0}})</router-link>
            </li>
        </ul>
        <div class="w-940 auto">
            <router-view></router-view>
        </div>
    </section>
</template>
<script>
import {mapState} from 'vuex'
export default {
    name: 'search',
    created(){
        this.init()
    },
    messages:{
        en:{
            user:'Users',
            model:'Models'
        },
        zh:{
            user:'用户',
            model:'模型'
        }
    },
    data(){
        return {
            chooseType:false,
        }
    },
    computed:{
        searchPageData:{
            get(){
                 return this.$store.state.search.searchMessage;
            },
            set(val){
                 this.$store.commit('search/saveSearch',val)
            }
        },
        ...mapState('search',[
            'searchType','searchMessage','userNum','modelNum'
        ])
    },
    methods:{
        search(){
            this.init()
        },
        async init(){
            let userData = {
                act:'user',
                keywords:this.searchPageData,
                page:1
            };
            let modelData = {
                act:'model',
                keywords:this.searchPageData,
                page:1
            };
            let type = null;
            this.searchType.forEach((item) => {
                if(item.status) {
                    type = item.text
                }
            });
            let userNum,modelNum;
            await this.$store.dispatch('search/search',userData).then((response) => {
                if(response.code === 200) {
                    userNum = response.data.count
                }
                this.$store.dispatch('search/search',modelData).then((res) => {
                    if(res.code === 200) {
                        modelNum = res.data.count
                    }
                });
                if(type === null) {
                    this.$router.push({name:'searchUser'});
                }
                else {
                    if(type === 'User') {
                        this.$router.push({name:'searchUser'});
                    }
                    else {
                        this.$router.push({name:'searchModels'});
                    }
                }
            });
        },
        saveSearchType(index){
            this.$store.commit('search/saveSearchType',index);
            this.chooseType = false
        }
    }
}
</script>
<style lang="scss">
.search-warp{
    .search-top{
        height:208px;
        >h3{
            font-size: 40px;
            color: #fff;
            font-weight:normal;
            margin:0;
            font-family: bebas-neue;
            width:100%;
            left:0;
            top:42px;
        }
        .search-text{
            bottom:42px;
            left:50%;
            transform: translate(-50%,0);
            input{
                display: inline-block;
                width:800px;
                height:40px;
                padding:10px 30px 10px 45px;
                background: #FFFFFF;
                border: 1px solid #E0E0E0;
                border-radius: 100px;
                color: #515254;
                font-size:18px;
            }
            span{
                display: inline-block;
                left: 12px;
                top: 15px;
                width: 25px;
                height: 12px;
                border: none;
                background-image:url(../../assets/images/search-icon.png);
                position: absolute;
                cursor: pointer;
            }
            button{
                width:120px;
                height:40px;
                line-height: 40px;
                font-size: 16px;
            }
            ul{
                width:230px;
                background: #FFFFFF;
                border: 1px solid #EFEFF1;
                box-shadow: 0 2px 13px 0 rgba(208,208,208,0.50);
                border-radius: 5px;
                left:0;
                top:45px;
                height: 99px;
            }
            li{
                border-bottom:1px solid #EFEFF1;
                line-height: 48px;
                padding-left:20px;
                font-size: 16px;
                color: #4A4A4A;
                cursor: pointer;
                height: 49px;
                &:last-child{
                    border-bottom:none;
                }
                &.active{
                    color:#EA6264;
                }
            }
        }
    }
    .sub-menu{
        height: 50px;
        justify-content: center;
        background-color: #fff;
        border-bottom:1px solid #EFEFF1;
        a{
            display:block;
            line-height: 48px;
            font-size: 16px;
            color: #2A2A36;
            margin:0 35px;
            &.router-link-active{
                color: #EA6264;
                border-bottom:2px solid #EA6264;
            }
        }
    }
    .filter-icon{
        font-size: 16px;
        color: #2A2A36;
        display: inline-block;
        margin:25px 0 0 25px;
        &:before{
            content:'';
            display: inline-block;
            width:16px;
            height:16px;
            background-image: url(../../assets/images/search-filter-icon.png);
            background-repeat: no-repeat;
            margin-right:10px;
            vertical-align: text-bottom;
            background-position: -22px 0;
        }
        &.active{
            color: #EA6264;
            &:before{
                background-position: 0 0;
            }
        }
    }
    .search-user,.search-models{
        margin-top:25px;
        background-color:#fff;
        margin-bottom:72px;
    }
    .filter-box{
        margin-top:25px;
        padding:0 25px 40px;
        border-bottom:1px solid  #E1E1E1;
        >.flex{
            justify-content: space-around;
        }
        dt{
            font-size: 14px;
            color: #515254;
            margin-bottom:15px;
        }
        label{
            display: block;
            margin-bottom:10px;
        }
        select{
            background: #fff;
            border: 1px solid #D2D2D2;
            border-radius: 2px;
            width:162px;
            height:30px;
            font-size: 14px;
            color: #9B9B9B;
        }
        .filter-btn-box{
            padding:85px 0 0 25px;
            button{
                width:160px;
                height: 35px;
                line-height: 35px;
                margin-right:30px;
                font-size: 16px;
            }
            span{
                font-size: 16px;
                color: #EA6264;
            }
        }
    }
    .no-data{
        height:420px;
        background-color: #fff;
        border-radius: 5px;
        justify-content: center;
        align-items: center;
        p{
            font-size: 24px;
            color: #2A2A36;
            margin-left:40px;
            margin-bottom:8px;
        }
        span{
            display: inline-block;
            font-size: 18px;
            color: #2A2A36;
            margin-left:40px;
        }
    }
}
</style>

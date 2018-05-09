<template>
    <div class="join-container" v-if="userType !== 4 && userType !== 3 ">
        <div>
            <p class="title">{{words.title}}</p>
            <p class="desc">{{words.desc}}</p>
        </div>
        <router-link :to="{name:link}">
            <div class="btn btn-default-border pointer upp" v-lang.join></div>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: 'join',
        props:{
            joinType:{
                required:true
            }
        },
        data(){
            return{
                words:{},
                link:''
            }
        },
        computed:{
            userType:function(){
                return this.$store.state.user.userType
            }
        },
        created(){
            if(this.joinType === 'company'){
                this.words.title = this.translate('becomePartner');
                this.words.desc = this.translate('becomePartner2');
                this.link='joinBusinessOne'
            }
            else{
                this.words.title = this.translate('artistUnique');
                this.words.desc = this.translate('artistJoin');
                this.link='joinArtistOne'
            }
        }
    }
</script>

<style scoped lang="scss">
.join-container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 122px;
    width: 100%;
    background: #FFFFFF;
    border-radius: 4px;
    margin:20px 0;
    border-bottom: 4px solid #EA6264;
    padding:0 40px;
    .title{
        font-family: bebas-neue;
        font-size: 26px;
        color: #4A4A4A;
        margin-bottom: 10px;
    }
    .desc{
        font-size: 16px;
        color: #7D7D7D;
    }
    .btn{
        width: 106px;
        height: 36px;
        line-height: 36px;
        font-size: 16px;
        color: #EA6264;
    }
}
</style>
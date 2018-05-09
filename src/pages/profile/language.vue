<template>
    <div class="language-container">
        <div class="btn btn-default upp" @click="save" v-lang.save></div>
        <p class="tag">Web language</p>
        <label for="en" class="input-radio">
            <input type="radio" id="en" v-model="selectedLanguage" value="en">
            <span class="value">English</span>
        </label>
        <label for="cn" class="input-radio">
            <input type="radio" id="cn" v-model="selectedLanguage" value="zh">
            <span class="value">中文</span>
        </label>
    </div>
</template>

<script>
    export default {
        name: 'languages',
        data(){
            return{
                selectedLanguage:''
            }
        },
        created(){
            this.selectedLanguage = this.$store.state.user.userLanguage
        },
        methods:{
            save:function () {
                this.$store.dispatch('userSaveLanguage',this.selectedLanguage).then(response => {
                    this.$store.commit('setUserLanguage',this.selectedLanguage);
                    this.$alert({type:'alert',message:'update language successful!'})
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .language-container{
        width: 100%;
        height: 122px;
        background: #FFFFFF;
        border: 1px solid #F0F0F0;
        border-radius: 4px;
        margin-top: 45px;
        padding:30px 42px;
        position: relative;
        .tag{
            font-size: 18px;
            color: #515254;
            margin-bottom: 17px;
        }
        .value{
            font-size: 16px;
            color: #9B9B9B;
        }
        .input-radio{
            margin-right: 70px;
        }
        label input{
            margin-right: 10px;
        }
        .btn{
            width: 54px;
            height: 25px;
            line-height: 25px;
            position: absolute;
            right:0;
            top:- 35px;
            font-size: 12px;
            color: #FFFFFF;
        }
    }
</style>
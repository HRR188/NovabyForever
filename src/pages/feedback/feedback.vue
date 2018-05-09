<template>
    <section class="main">
        <div class="w-940 feedback-warp auto">
            <h1 class="text-center">Feedback</h1>
            <template v-if="step === 1">
                <input type="text" placeholder="Your email" v-model="email" :readonly="status">
                <textarea v-model="message"></textarea>
                <div class="flex form-footer">
                    <button type="button" class="btn btn-175 btn-default" :disabled="disabledStatus" @click="feedback">Submit</button>
                </div>
            </template>
            <template v-else>
                <p class="text-center">Thank  you to help us grow!</p>
            </template>
        </div>
    </section>
</template>

<script>
export default {
    name:'feedback',
    data(){
        return {
            email:'',
            message:'',
            status:true,
            disabledStatus:true,
            step:1
        }
    },
    computed:{
        userEmail(){
            return this.$store.state.user.userEmail
        }
    },
    watch:{
        message:function(val,oldval){
            this.str()
        },
        email:function(val,oldval){
            this.str()
        }
    },
    mounted(){
        if(this.userEmail != '') {
            this.status = true;
            this.email = this.userEmail
        }
        else {
            this.status = false;
        }
    },
    methods:{
        str(){
            let emailStr =  /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if(emailStr.test(this.email) && this.message != '') {
                this.disabledStatus = false
            }
        },
        feedback(){
            this.$store.dispatch('feedbackAc',{email:this.email,content:this.message}).then((response) => {
                if(response.code === 200) {
                    this.step = 2
                }
            })
        }
    }
}
</script>

<style lang="scss">
.feedback-warp{
    >h1{
        padding:65px 0 55px;
        font-size: 30px;
        color: #515254;
        font-weight: normal;
    }
    input{
        width:100%;
        display: block;
        height:35px;
        background: #fff;
        border: 1px solid #D2D2D2;
        border-radius: 2px;
        padding:10px;
        font-size: 16px;
        color: #9B9B9B;
        margin-bottom:20px;
    }
    input[readonly]{
        background: #F1F1F1;
        color: #515254;
    }
    textarea{
        display: block;
        width:100%;
        height:330px;
        background: #fff;
        border: 1px solid #D2D2D2;
        border-radius: 4px;
        padding:10px;
        font-size: 14px;
        color: #7A7A7A;
        resize: none;
    }
    p{
        font-size: 18px;
        color: #4A4A4A;
        &:before{
            content:'';
            display: block;
            width:94px;
            height:94px;
            background: url(../../assets/images/projects-sprite.png) -123px -188px no-repeat;
            margin:0 auto 30px;
        }
    }
}
</style>

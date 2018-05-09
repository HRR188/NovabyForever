<template>
    <div class="log-container mark" @click.stop="closePop">
        <transition name="flip" mode="out-in">
            <log-in-pop
                    v-if="status"
                    @switchStatus="switchStatus"
                    :closePop="closePop"
                    @logIn="logIn"
                    @forgot="forgot"
                    :errorMessage="logInErrorMsg"
            ></log-in-pop>
            <log-up-pop
                    v-else
                    @switchStatus="switchStatus"
                    :closePop="closePop"
                    @logUp="logUp"
                    :errorMessage="logUpErrorMsg"
                    :logUpStatus="logUpStatus"
                    :artistsList = "artistsList"
                    @follow="follow"
            ></log-up-pop>
        </transition>
    </div>
</template>

<script>
    import LogInPop from './logInPop.vue'
    import LogUpPop from './logUpPop.vue'
    import lockScreen from '../../mixins/lockScreen/lockScreen'

    export default {
        name: 'log-pop',
        mixins: [lockScreen],
        components:{
            LogInPop,
            LogUpPop
        },
        methods:{
            switchStatus:function () {
                this.status = !this.status
            }
        }
    }
</script>

<style scoped>
    .log-container{
        width: 100%;
        height: 100%;
        position: fixed;
        top:0;
        left:0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    }
    .flip-enter-active{
        animation:flip-in .5s linear;
    }
    .flip-leave-active{
        animation:flip-out .5s linear;
    }
    @keyframes flip-in {
        from{
            transform: perspective(1000px) rotateY(-90deg);
            opacity: 0;
        }
        to {
            transform: perspective(1000px) rotateY(0deg);
            opacity: 1;
        }
    }
    @keyframes flip-out {
        from {
            transform: perspective(1000px) rotateY(0deg);
            opacity: 1;
        }
        to {
            transform: perspective(1000px) rotateY(90deg);
            opacity: 0;
        }
    }

</style>
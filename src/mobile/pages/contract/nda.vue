<template>
    <div class="mobile-main">
        <mobile-head></mobile-head>
        <div class="nda-content">
            <p>Novaby contract</p>
            <div v-html="nda" class="project-nda-content"></div>
            <div class="btns">
                <div class="btn btn-default" @click="setNda(1)" style="margin-right:36px;">{{translate('Agree')}}</div>
                <div class="btn btn-default-border" @click="setNda(0)">{{translate('Disagree')}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import mobileHead from '../../components/mobileHead.vue'

    export default {
        name: 'nda',
        created() {
            this.getNda();
        },
        data() {
            return {
                nda: '',
            }
        },
        components:{
            mobileHead
        },
        messages: {
            en: {
                Agree: 'Agree',
                Disagree: 'Disagree'
            },
            zh: {
                Agree: '同意',
                Disagree: '不同意'
            }
        },
        methods: {
            getNda: function () {
                this.$store.dispatch('saas/nda/getNda', this.$route.params.id).then(response => {
                    this.nda = response
                })
            },
            setNda: function (isAgree) {
                if(isAgree !== 0){
                    this.$store.dispatch('saas/nda/setNda', {
                        id: this.$route.params.id,
                        isAgree: isAgree,
                        code: this.$route.params.code
                    }).then(response => {
                        this.$router.push({name: 'ndaSuccess',params:{id:this.$route.params.id}})
                    })
                }else{
                     this.$router.push({name: 'sign-in'})
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .mobile-main {
        width: 100%;
        height: 100vh;
        .nda-content {
            background: #F7F8FA;
            height: 91.5%;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            .project-nda-content{
                width: 90%;
                height: 80%;
                margin-top: 3%;
                display: flex;
                flex-direction: column;
                overflow: scroll;
            }
            p{
                margin-top: 8%;
                height:4%;
                font-size: 1rem;
                color: #4A4A4A;
            }
            .btns {
                text-align: center;
                display: flex;
                background: #FFFFFF;
                width: 100vw;
                height: 10vh;
                justify-content: center;
                align-items: center;
                .btn {
                    width: 35%;
                    height: 43%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
        }
    }
</style>
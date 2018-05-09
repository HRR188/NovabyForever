<template>
    <div class="nda">
        <h1>NDA</h1>
        <!--<p>{{nda}}</p>-->
        <div v-html="nda"></div>
        <div class="btns">
            <div class="btn btn-default" @click="setNda(1)" style="margin-right:36px;">Agree</div>
            <div class="btn btn-default-border" @click="setNda(0)">Disagree</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'nda',
        created(){
            this.getNda();
        },
        data(){
            return{
                nda:'',
            }
        },
        methods:{
            getNda:function () {
                this.$store.dispatch('saas/nda/getNda',this.$route.params.id).then(response => {
                    this.nda = response
                })
            },
            setNda:function (isAgree) {
                this.$store.dispatch('saas/nda/setNda',{id:this.$route.params.id,isAgree:isAgree,code:this.$route.params.code}).then(response => {
                    this.$router.push({name:'saasModelSpecification',params:{id:this.$route.params.id}})
                })
            }
        }
    }
</script>

<style scoped lang="scss">
.nda{
    width: 1033px;
    margin:0 auto;
    h1{
        font-size: 24px;
        color: #4A4A4A;
        text-align: center;
    }
    p{
        font-size: 14px;
        color: #7A7A7A;
        line-height: 22px;
    }
    .btns{
        text-align: center;
        margin-top: 50px;
        padding:40px 0;
        .btn{
            width: 112px;
            height: 30px;
            line-height: 30px;
        }
    }

}
</style>
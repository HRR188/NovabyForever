<template>
    <div class="upload-new-project-success w-940 auto text-center">
        <p v-lang.p></p>
        <router-link :to="{name:'personalProtfolio',params:{id}}" class="btn btn-default btn-175" v-lang.t></router-link>
        <!--<div class="w-940" v-if="privacy === 'public'">-->
        <!--<p>Share With</p>-->
        <!--<share-links></share-links>-->
        <!--</div>-->
        <!--<button class="btn btn-default check-btn">Check the model</button>-->
    </div>
</template>

<script>
    //    import ShareLinks from '../../components/commons/ShareLinks.vue'
    export default {
        name: 'uploadNotModelSuccess',
        messages:{
            en:{
                p:'Congratulations! You have uploaded a model successfully!',
                t:'My portfolio'
            },
            zh:{
                p:'恭喜！ 您已经成功发布了一个模型！',
                t:'我的作品集'
            }
        },
        computed:{
            id:function () {
                return this.$store.state.user.userId
            }
        }
    }
</script>

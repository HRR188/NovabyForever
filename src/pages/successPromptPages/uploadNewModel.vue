<template>
    <div class="projects-success-container w-940 auto text-center">
        <p v-lang.p></p>
        <router-link :to="{name:'model-detail',params:{id}}" class="btn btn-default btn-175" v-lang.t></router-link>
    </div>
</template>

<script>
    export default {
        name: 'uploadNewModel',
        messages:{
            en:{
                p:'Your model was uploaded successfully!',
                t:'View model'
            },
            zh:{
                p:'你的模型已经上传成功!',
                t:'查看作品'
            }
        },
        computed:{
            id:function () {
                return this.$route.params.id
            }
        }
    }
</script>

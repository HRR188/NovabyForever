<template>
    <div class="upload-new-project-success w-940 auto text-center">
        <p v-lang.p></p>
        <router-link :to="{name:'personalProtfolio',params:{id}}" class="btn btn-default btn-175" v-lang.t></router-link>
    </div>
</template>

<script>
    export default {
        name: 'uploadNewModelSuccess',
        messages:{
            en:{
                p:'Your model was uploaded successfully, you can check the 3D process status in my portfolio',
                t:'My portfolio'
            },
            zh:{
                p:'你的模型已经上传成功，正在转换，请在作品集里查看模型转换进程',
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

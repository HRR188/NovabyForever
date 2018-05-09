<template>
    <section class="main success-prompt-warp">
        <router-view></router-view>
    </section>
</template>

<script>
export default {
    name:"successPrompt",
    data(){
        return {

        }
    }
}
</script>
<style lang="scss">
.success-prompt-warp{
    .projects-success-container,.upload-new-project-success{
        >p{
            font-size: 24px;
            color: #4A4A4A;
            margin:128px 0 100px;
        }
    }
    .projects-success-container{
        >p:before{
            content:'';
            display: block;
            width:94px;
            height:94px;
            margin:0 auto 34px;
            background: url(../../assets/images/projects-sprite.png) -123px -188px no-repeat;
        }
    }
    .upload-new-project-success{
        >p:before{
            content:'';
            display: block;
            width:94px;
            height:94px;
            background:url(../../assets/images/projects-sprite.png) 0 -188px no-repeat;
            margin:0 auto 34px;
        }
    }
}
</style>

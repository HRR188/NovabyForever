<template>
    <div class="main projects-container">
        <div class="top-banner-warp position-relative" style="height: 350px;">
            <img src="../../assets/images/projects-bg.png" alt="" class="img-max">
            <div class="position-absolute">
                <h1 v-lang.projects></h1>
                <p v-lang.makeItReal></p>
            </div>
        </div>
        <router-view></router-view>
        <back-to-top :target="150" :type="true"></back-to-top>
    </div>
</template>
<script>
    import backToTop from '../../components/commons/backToTop.vue'
    import backTopFn from '../../mixins/backToTop/backToTop'
    export default {
        name:'projectsHeader',
        mixins:[backTopFn],
        components:{
            backToTop
        }
    }
</script>
<style lang="scss">

</style>
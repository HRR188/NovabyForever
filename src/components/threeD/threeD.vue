<template>
    <div class="canvas-container" ref="container" id="container">
        <div ref="canvas" v-show="loadStatus.loadCom" id="canvas"></div>
        <btns
                :id="id"
                ref="btns"
                :loadComplete="loadStatus.loadCom"
                :showEditBtn="showEditBtn"
                :showAnnoBtn="showAnnoBtn"
                :hideBtns="hideBtns"
                :showFullScreenBtn="showFullScreenBtn"
                @goEdit="goEdit"
                @goAnno="goAnno"
                @fullScreen="fullScreen"
                @toggleWireframe="showWireframe"
        ></btns>
        <loading v-if="!loadStatus.loadCom" :percent="loadStatus.loadPercent" :transparentBack="transparentBack"></loading>
    </div>
</template>

<script>
    import Loading from './loading.vue'
    import btns from './btns.vue'
    import initScene from '../../mixins/threeD/initScene'

    export default {
        name: 'three-d',
        mixins:[initScene],
        components:{
            Loading,
            btns
        },
        mounted(){
            this.init()
        }
    }
</script>

<style scoped lang="scss">
    .canvas-container{
        width: 100%;
        height: 100%;
        .canvas{
            width: 100%;
            height: 100%;
            position: absolute;
            top:0;
            left:0;
        }
    }
</style>
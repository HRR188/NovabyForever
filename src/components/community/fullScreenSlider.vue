<!--create by Fred Chen-->
<template>
    <div class="slide-plugin-warp position-relative">
        <div class="slide-container position-relative">
            <ul>
                <li v-for="item in resultImgList" :class="{'show':item.status}">
                    <div class="pointer" @click.stop.prevent="closeFullScreen">
                        <img src="../../assets/images/icon-close-fullscreen.png" class="close-fullscreen"/>
                    </div>
                    <img :src="item.url" style="max-height: calc(100vh)"/>
                </li>
            </ul>
            <div class="model-btn" v-show="btnBoxStatus">
                <button style="left: 45px;" @click="prev()"><img src="../../assets/images/icon-left.png"/></button>
                <button style="right: 45px;" @click="next()"><img src="../../assets/images/icon-right.png"/></button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'full-screen-slider',
    }
</script>
<style lang="scss" scoped>
    .slide-plugin-warp {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        background-color: rgba(26, 26, 26, 0.95);
        .slide-container {
            overflow: hidden;
            width: 100%;
            height: 100%;
            > ul {
                width: 100%;
                height: 100%;
                flex-direction: row;
                transition-property: transform;
                transition-timing-function: ease;
                position: relative;
                li {
                    width: 100%;
                    height: 100%;
                    display: none;
                    justify-content: center;
                    align-items: center;
                    overflow: hidden;
                    &.show {
                        display: flex;
                    }
                    .close-fullscreen {
                        height: 20px;
                        width: 20px;
                        top: 5%;
                        right: 45px;
                        position: absolute;
                        border: none;
                        cursor: pointer;
                        z-index: 10;
                    }
                }
            }
            .model-btn {
                img {
                    width: 28px;
                    height: 48px;
                } > button {
                      position: absolute;
                      top: 50%;
                      margin-top: -24px;
                      border: none;
                      background-color: rgba(0, 0, 0, 0);
                      cursor: pointer;
                      z-index: 10;
                  }
            }
        }
    }
</style>
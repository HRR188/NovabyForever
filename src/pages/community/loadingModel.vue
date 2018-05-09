<template>
    <div class="slots">
        <slot v-if="show"></slot>
        <div class="loading-container" v-else>
            <div class="v-ring v-ring1" style="height: 60px; width: 60px; position: relative;">
                <div class="v-ring v-ring2" style="height: 60px; width: 60px; border: 6px solid #dddddd; opacity: 0.4; border-radius: 100%;">
                </div>
                <div class="v-ring v-ring3" style="height: 60px; width: 60px; border: 6px solid #dddddd; opacity: 0.4; border-radius: 100%;">
                </div>
            </div>
            <p>Loading...</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "loading-model",
        data(){
            return{
                show:false
            }
        },
        methods:{
            showSlots(){
                this.show = true
            }
        }
    }
</script>

<style scoped lang="scss">
@-webkit-keyframes v-ringRightRotate {
    0%
    {
        -webkit-transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
        transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    }
    100%
    {
        -webkit-transform: rotateX(180deg) rotateY(360deg) rotateZ(360deg);
        transform: rotateX(180deg) rotateY(360deg) rotateZ(360deg);

    }
}
@keyframes v-ringRightRotate {
    0%
    {
        -webkit-transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
        transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    }
    100%
    {
        -webkit-transform: rotateX(180deg) rotateY(360deg) rotateZ(360deg);
        transform: rotateX(180deg) rotateY(360deg) rotateZ(360deg);

    }
}
@-webkit-keyframes v-ringLeftRotate {
    0%
    {
        -webkit-transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
        transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    }
    100%
    {
        -webkit-transform: rotateX(360deg) rotateY(180deg) rotateZ(360deg);
        transform: rotateX(360deg) rotateY(180deg) rotateZ(360deg);

    }
}
@keyframes v-ringLeftRotate {
    0%
    {
        -webkit-transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
        transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    }
    100%
    {
        -webkit-transform: rotateX(360deg) rotateY(180deg) rotateZ(360deg);
        transform: rotateX(360deg) rotateY(180deg) rotateZ(360deg);

    }
}
.loading-container{
    width: 100%;
    height: 436px;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    background-color: white;
    margin-top: 99px;
    .v-ring2{
        -webkit-animation: v-ringRightRotate 2s 0s infinite linear;
        animation: v-ringRightRotate 2s 0s infinite linear;
        -webkit-animation-fill-mode: forwards;
        animation-fill-mode: forwards;
        -webkit-perspective: 800px;
        perspective: 800px;
        position: absolute;
        top: 0;
        left: 0;
    }
    .v-ring3{
        -webkit-animation: v-ringLeftRotate 2s 0s infinite linear;
        animation: v-ringLeftRotate 2s 0s infinite linear;
        -webkit-animation-fill-mode: forwards;
        animation-fill-mode: forwards;
        -webkit-perspective: 800px;
        perspective: 800px;
        position: absolute;
        top: 0;
        left: 0;
    }
    p{
        color:#DDDDDD;
        width: 100%;
        text-align: center;
        margin-top: 30px;
    }
}
</style>
<template>
    <div class="loading-warp flex">
        <img src="../../assets/images/default.svg" v-show="loadingMsg.loadingStatus && !loadingMsg.noteStatus"/>
        <div class="text-center" v-show="loadingMsg.noteStatus">{{loadingMsg.noteText}}</div>
    </div>

</template>
<script>
    export default {
        name:'loading',
        props:{
            loadingMsg:{
                required: true
            }
        },
        data(){
            return {

            }
        },

    }
</script>
<style lang="scss">
.loading-warp{
    justify-content: center;
    align-items: center;
    padding:20px 0;
    font-size: 14px;
    color: #7A7A7A;
}
</style>

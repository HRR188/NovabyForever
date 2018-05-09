<template>
    <div class="w-940 auto">
        <div class="applyfor-warp">
            <div class="portrait-container position-relative auto">
                <img src="../../assets/images/user-model-icon.png" class="note-img">
                <img :src="headerUrl" alt="" class="portrait-img">
            </div>
            <p class="text-center">Welcome to Novaby Model Artist Family. Now you can</p>
            <ol class="text-center">
                <li>
                    1、Peace On Earth A Wonderful Wish But No Way
                </li>
                <li>
                    1、Peace On Earth A Wonderful Wish But No Way
                </li>
                <li>
                    1、Peace On Earth A Wonderful Wish But No Way
                </li>
            </ol>
        </div>
        <div class="border-box"></div>
        <div class="flex form-footer">
            <router-link to="/projects" class="btn btn-default btn-175">Projects</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name:'applyForSuccess',
    data(){
        return {

        }
    },
    computed:{
        headerUrl(){
            return this.$store.state.user.userAvatar
        }
    }
}
</script>

<style lang="scss">
.applyfor-warp{
    .portrait-container{
        width:120px;
        margin-top:110px;
        .portrait-img{
            width:120px;
            height:120px;
            border-radius: 100%;
            overflow: hidden;
        }
        .note-img{
            display: block;
            width:30px;
            height:35px;
            position: absolute;
            right:0px;
            top:0px;
        }
    }
    >p{
        margin-top:45px;
        font-size: 18px;
        color: #4A4A4A;
    }
    >ol{
        margin:35px 0 52px;
        font-size: 14px;
        color: #9B9B9B;
        line-height: 22px;
    }
}
</style>

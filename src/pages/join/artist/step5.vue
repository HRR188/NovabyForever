<template>
    <div class="join-success">
        <div class="portrait-container position-relative auto">
            <img src="../../../assets/images/user-model-icon.png" class="note-img">
            <img :src="userAvatar" alt="" class="portrait-img">
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
        <div class="form-footer flex" style="padding: 0">
            <router-link :to="{name:'biddingGallery'}" class="btn-default btn btn-175">Projects</router-link>
        </div>
    </div>
</template>
<script>
    export default {
        name:"joinArtistFive",
        messages:{
            en:{

            },
            zh:{

            }
        },
        computed:{
            userId(){
                return this.$store.state.user.userId
            },
            userAvatar(){
                return this.$store.state.user.userAvatar
            }
        }
    }
</script>
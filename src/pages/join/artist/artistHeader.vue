<template>
    <div class="main join-server-warp">
        <div class="artist-banner position-relative">
            <h1 v-lang.na></h1>
        </div>
        <div class="w-940 auto signup-artist">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    export default {
        name:'artistHeader',
        messages:{
            en:{
                na:'Novaby artist'
            },
            zh:{
                na:'novaby艺术家'
            }
        }
    }
</script>
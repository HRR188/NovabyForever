<template>
    <div class="main join-server-warp">
        <div class="enterprise-banner">
            <h1 v-lang.h></h1>
        </div>
        <div class="w-940 auto signup-business">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    export default {
        name:'businessHeader',
        messages:{
            en:{
                h:'Novaby business account'
            },
            zh:{
                h:'Novaby 商业用户'
            }
        }
    }
</script>

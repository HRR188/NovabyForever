<template>
    <div class="waiting-box" style="margin-top: 20px;">
        <h2 class="text-center" v-lang.c></h2>
        <p class="text-center" v-lang.p></p>
    </div>
</template>
<script>
    export default {
        name:'joinArtistFour',
        messages:{
            en:{
                c:'Congratulations!',
                p:'Thanks for you submission, we will send you notification when the review is finished.'
            },
            zh:{
                c:'恭喜!',
                p:'谢谢您的申请，审核结束后我们立即通知您。'
            }
        }
    }
</script>
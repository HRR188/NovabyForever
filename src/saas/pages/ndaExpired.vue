<template>
    <div class="nda">
        <div class="nda-content">
            <img src="../../assets/images/icon_link_expired.png" alt="">
            <p>{{translate('expired')}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'saasNdaExpired',
        messages: {
            en: {
                expired: 'Sorry, this link has expired.',
            },
            zh: {
                expired: '对不起，链接已经失效',
            }
        },
    }
</script>

<style scoped lang="scss">
.nda{
    width: 100%;
    margin:0 auto;
    display: flex;
    justify-content: center;
    .nda-content{
        display: flex;
        justify-content: center;
        flex-direction: row;
        align-items: center;
        width: 1140px;
        height: 467px;
        margin-top: 115px;
        background: #FFFFFF;
        border-radius: 2px 2px 2px 2px;
        img{
            width: 90px;
            height: 90px;
        }
        p{
            margin-left: 48px;
            font-size: 26px;
            color: #515254;
            text-align: center;
        }
    }

}
</style>
<template>
    <div class="mobile-main">
        <mobile-head></mobile-head>
        <div class="nda-expired-container">
            <div class="nda-expired-content">
                <img src="../../../assets/images/icon_link_expired.png" alt="">
                <p>{{translate('expired')}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import mobileHead from '../../components/mobileHead.vue'

    export default {
        name: 'ndaExpired',
        components: {
            mobileHead
        },
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
    .mobile-main {
        width: 100%;
        height: 100vh;
        .nda-expired-container {
            background: #F7F8FA;
            height: 91.5%;
            display: flex;
            flex-direction: column;
            align-items: center;
            .nda-expired-content {
                width: 90%;
                height: 47vw;
                margin-top: 5%;
                background: #FFFFFF;
                align-items: center;
                display: flex;
                flex-direction: column;
                img {
                    margin-top: 12%;
                    height: 16vw;
                    width: 16vw;
                }
                p {
                    margin-top: 4%;
                    font-size: 14px;
                    color: #515254;
                    text-align: center;
                }
            }
        }
    }
</style>
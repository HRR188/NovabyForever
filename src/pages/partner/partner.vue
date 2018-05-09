<template>
    <section class="partner-container main">
        <div class="top-banner-warp position-relative" style="height: 350px;">
            <img src="../../assets/images/partner-bg.png" alt="" class="img-max">
            <div class="position-absolute">
                <h1 v-lang.partners></h1>
                <p v-lang.meet></p>
            </div>
        </div>
        <div class="tabs">
            <div>
                <router-link :to="{name:'partnerCompany'}" class="cap">{{translate('enterprise')}}</router-link>
            </div>
            <div>
                <router-link :to="{name:'partnerArtist'}" class="cap">{{translate('designers')}}</router-link>
            </div>
        </div>
        <router-view></router-view>
    </section>
</template>

<script>
    import backToTop from '../../components/commons/backToTop'
    export default {
        name:'partner',
        messages:{
            en:{
                meet:'Meet 3D talents around the world'
            },
            zh:{
                meet:'与全球的3D天才相遇'
            }
        }
    }
</script>

<style lang="scss">
.partner-container{
    .tabs{
        height: 50px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        >div{
            position: relative;
            margin:0 40px;
            a{
                font-size: 16px;
                color: #2A2A36;
                height: 50px;
                line-height: 50px;
                &.router-link-active{
                    color: #EA6264;
                    &:after{
                        content:"";
                        width: 100%;
                        height: 2px;
                        background-color: #EA6264;
                        position: absolute;
                        left:0;
                        bottom:0;
                    }
                }
            }
        }
    }
    .partner-child-container{
        width: 1020px;
        margin:0 auto;
        .partners-container{
            background-color: white;
            border-radius: 4px;
            text-align: center;
            margin-top: 20px;
            >.btn{
                width: 106px;
                height: 25px;
                line-height: 25px;
                font-size: 14px;
                margin: 40px 0;
            }
        }
    }
}
</style>

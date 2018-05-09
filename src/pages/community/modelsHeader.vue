<template>
    <div class="main models-container">
        <div class="top-banner-warp position-relative" style="height: 350px;">
            <img src="../../assets/images/models-bg.png" alt="" class="img-max">
            <div class="position-absolute">
                <h1 v-lang.models></h1>
                <p v-lang.meetMagic></p>
            </div>
        </div>
        <div class="tabs-sub-menu position-relative">
            <ul class="flex">
                <li class="cap" :class="{active:marketActive}" @click="linkTo('market')">{{translate('market')}}</li>
                <li class="cap" :class="{active:followingActive}" @click="linkTo('following')">{{translate('following')}}</li>
            </ul>
            <button class="upload-btn btn btn-default upp" @click="linkTo('uploadNewModel')">
                {{translate('uploadWork')}}
            </button>
        </div>
        <router-view></router-view>
        <back-to-top :target="150" :type="true"></back-to-top>
    </div>
</template>
<script>
    import backToTop from '../../components/commons/backToTop.vue'
    import backTopFn from '../../mixins/backToTop/backToTop'

    export default {
        name: 'modelsHeader',
        mixins: [backTopFn],
        data() {
            return {
                marketActive: false,
                followingActive: false
            }
        },
        components: {
            backToTop
        },
        computed: {
            loginStatus() {
                return this.$store.state.user.loginStatus
            }
        },
        created() {
            if (this.$route.name === 'marketList') {
                this.marketActive = true;
                this.followingActive = false
            }
            else if (this.$route.name === 'followingList') {
                this.marketActive = false;
                this.followingActive = true
            }
        },
        methods: {
            linkTo(target) {
                if (target === 'market') {
                    this.$router.push({name: 'marketList'});
                    this.marketActive = true;
                    this.followingActive = false
                }
                else if (target === 'following') {
                    if (this.loginStatus) {
                        this.marketActive = false;
                        this.followingActive = true;
                        this.$router.push({name: 'followingList'});
                    }
                    else {
                        this.$logPop().then((response) => {
                            if (response) {
                                this.marketActive = false;
                                this.followingActive = true;
                                this.$router.push({name: 'followingList'});
                            }
                        });
                    }
                }
                //if not login,first to login then show create new model layer
                else if (target === 'uploadNewModel') {
                    if (this.loginStatus) {
                        this.$createNewModel({});
                    }
                    else {
                        this.$logPop().then((response) => {
                            if (response) {
                                this.$createNewModel({});
                            }
                        });
                    }
                }
            },
        }
    }
</script>
<style lang="scss">
    .models-container {
        .small-big-switch {
            margin-bottom: 20px;
            height: 18px;
            span {
                display: inline-block;
                width: 18px;
                height: 18px;
                cursor: pointer;
                background-repeat: no-repeat;
                float: right;
            }
            .market-small {
                background-image: url(../../assets/images/models-list-small.png);
                margin-right: 15px;
            }
            .market-small.active {
                background-image: url(../../assets/images/models-list-small-hover.png);
            }
            .market-big {
                background-image: url(../../assets/images/models-list-big.png);
            }
            .market-big.active {
                background-image: url(../../assets/images/models-list-big-hover.png);
            }
        }
        .project-small-warp {
            width: 100%;
            flex-direction: row;
            > .column {
                flex-direction: column;
                flex: 1;
                margin-right: 15px;
                &:last-child {
                    margin-right: 0;
                }
            }
            .masonry-item {
                position: relative;
                margin-bottom: 15px;
                .cover-box {
                    display: block;
                    width: 100%;
                    img {
                        width: 100%;
                        vertical-align: top;
                        border-radius: 5px;
                        background-color: #575761;
                    }
                }
                .icon-3d {
                    position: absolute;
                    z-index: 10;
                    top: 12px;
                    right: 12px;
                    img {
                        width: 24px;
                        height: 24px;
                    }
                }
                .item-mark {
                    position: absolute;
                    z-index: 5;
                    width: 100%;
                    height: 45px;
                    left: 0;
                    bottom: 0;
                    background: linear-gradient(0deg, rgba(0, 0, 0, .3) 0, rgba(0, 0, 0, .15) 40%, transparent);
                    display: none;
                }
                .bottom-msg {
                    display: none;
                    width: 100%;
                    height: 32px;
                    padding: 0 12px;
                    position: absolute;
                    z-index: 10;
                    left: 0;
                    bottom: 12px;
                    > a {
                        display: block;
                        width: 32px;
                        height: 32px;
                        margin-right: 10px;
                        float: left;
                    }
                    .name-details {
                        height: 32px;
                        line-height: 32px;
                        float: left;
                        span.name {
                            font-size: 14px;
                            color: #FFFFFF;
                        }
                        .job {
                            line-height: 12px;
                        }
                        .follow-btn {
                            float: left;
                            margin-top: 0;
                        }
                    }
                    .download-container {
                        float: right;
                        margin-top: 5px;
                    }
                    .follow-btn {
                        float: right;
                        margin-top: 5px;
                    }
                }
                .like-container {
                    display: none;
                    position: absolute;
                    top: 12px;
                    left: 12px;
                    z-index: 10;
                }
                .time {
                    display: block;
                    position: absolute;
                    top: 12px;
                    left: 12px;
                    z-index: 10;
                    padding: 2px 12px;
                    background: rgba(41, 41, 41, 0.50);
                    border: 2px solid rgba(193, 193, 193, 0.53);
                    border-radius: 100px;
                    font-size: 12px;
                    color: #F2F4F6;
                }
                &.active {
                    .icon-3d, .time {
                        display: none;
                    }
                    .item-mark, .bottom-msg, .like-container {
                        display: block;
                    }
                }
                .follow-title {
                    width: 100%;
                    position: absolute;
                    font-size: 16px;
                    color: #fff;
                    top: 0;
                    left: 0;
                    padding: 12px 0 0 12px;
                    background: linear-gradient(0deg, transparent 0, rgba(0, 0, 0, 0.15) 40%, rgba(0, 0, 0, 0.3));
                }
            }
        }
        .who-to-follow-container {
            margin-bottom: 80px;
        }
        .follow-projects {
            .project {
                width: 24% !important;
                margin-right: 1.2% !important;
            }
        }
        .new-market-note {
            width: 148px;
            height: 38px;
            line-height: 38px;
            position: fixed;
            left: 50%;
            margin-left: -74px;
            top: 50px;
            background: rgba(41, 41, 41, 0.70);
            border: 1px solid #575757;
            font-size: 14px;
            color: #fff;
            z-index: 30;
        }
    }
</style>
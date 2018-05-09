<template>
    <div class="guide-container">
        <div class="guide-top">
            <h1>GUIDE</h1>
            <h3>How does Novaby work for 3D?</h3>
            <div class="advantages">
                <div class="advantage rai">
                    <img src="../../assets/images/guide/rai.png" alt="">
                    <h4>RAI MATCHING</h4>
                    <p>Fast and accurate match between requirement and artist</p>
                </div>
                <div class="advantage private">
                    <img src="../../assets/images/guide/private.png" alt="">
                    <h4>PRIVATE</h4>
                    <p>Private projects only accessible by invited artists</p>
                </div>
                <div class="advantage secure">
                    <img src="../../assets/images/guide/secure.png" alt="">
                    <h4>SECURE</h4>
                    <p>Concepts are saved after
                        encryption</p>
                </div>
                <div class="advantage anywhere">
                    <img src="../../assets/images/guide/anywhere.png" alt="">
                    <h4>IN-BROWSER DISPLAY</h4>
                    <p>Model can be perfectly
                        displayed in browser</p>
                </div>
                <div class="advantage feedback">
                    <img src="../../assets/images/guide/feedback.png" alt="">
                    <h4>EFFICIENT FEEDBACK</h4>
                    <p>Feedback and update in a
                        easy way</p>
                </div>
            </div>
        </div>
        <div class="guide-middle">
            <h2>How can I apply for project?</h2>
            <img src="../../assets/images/guide/middle.png" alt="">
        </div>
        <div class="guide-bottom">
            <h2>How can I submit a project?</h2>
            <img src="../../assets/images/guide/bottom.png" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'guide'
    }
</script>

<style scoped lang="scss">
.guide-container{
    padding-top: 50px;
    text-align: center;
    .guide-top{
        width: 100%;
        padding-top: 33%;
        background-image: url(../../assets/images/guide/banner.png);
        background-size: cover;
        background-position: center;
        position: relative;
        h1{
            font-family: bebas-neue;
            font-size: 70px;
            color: #FFFFFF;
            position: absolute;
            top:82px;
            width: 100%;
        }
        h3{
            font-size: 32px;
            color: #FFFFFF;
            position: absolute;
            bottom: 225px;
            width: 100%;
        }
        .advantages{
            width: 1020px;
            display: flex;
            justify-content: space-between;
            position: absolute;
            bottom:-47px;
            left:50%;
            transform: translateX(-50%);
            .advantage{
                width: 190px;
                height: 230px;
                border-radius: 4px;
                background: #FFFFFF;
                box-shadow: 0 2px 16px 0 rgba(103,103,103,0.50);
                padding:0 14px;
                img{
                    height: 78px;
                    margin-top: 28px;
                    margin-bottom: 20px;
                }
                h4{
                    font-size: 14px;
                    margin-bottom: 12px;
                }
                p{
                    font-size: 12px;
                    color: #717171;
                }
                &.rai{
                    border-bottom: 4px solid #EA6264;
                    h4{
                        color: #EA6264;
                    }
                }
                &.private{
                    border-bottom: 4px solid #4A90E2;
                    h4{
                        color: #4A90E2;
                    }
                }
                &.anywhere{
                    border-bottom: 4px solid #6F5E7F;
                    h4{
                        color: #6F5E7F;
                    }
                }
                &.secure{
                    border-bottom: 4px solid #D8A77B;
                    h4{
                        color: #D8A77B;
                    }
                }
                &.feedback{
                    border-bottom: 4px solid #869973;
                    h4{
                        color: #869973;
                    }
                }
            }
        }
    }
    .guide-middle,.guide-bottom{
        height: 556px;
        h2{
            font-size: 32px;
            color: #90A3AC;
            font-weight: 300;
        }
        img{
            width: 1020px;
        }
    }
    .guide-middle{
        background: #FFFFFF;
        padding-top: 140px;
        h2{
            margin-top: 0;
            margin-bottom: 58px;
        }
    }
    .guide-bottom{
        padding-top: 96px;
        h2{
            margin-top: 0px;
            margin-bottom: 58px;
        }
    }
}
</style>
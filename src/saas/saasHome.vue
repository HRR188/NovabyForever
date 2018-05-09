<template>
    <div class="main novahub-home">
        <div class="novahub-top position-relative">
            <img src="../assets/images/novahub-bg.png" alt="" class="img-max">
            <div class="position-absolute">
                <h1 class="text-center">Novahub</h1>
                <p class="text-center" v-lang.an></p>
                <img src="../assets/images/novahub-computer.png" alt="">
            </div>
        </div>
        <div class="novahub-bottom auto w-940">
            <div class="flex">
                <div class="three-d-icon">
                    <span></span>
                    <dl>
                        <dt v-lang.11></dt>
                        <dd v-lang.12></dd>
                    </dl>
                </div>
                <div class="annotation-icon">
                    <span></span>
                    <dl>
                        <dt v-lang.21></dt>
                        <dd v-lang.12></dd>
                    </dl>
                </div>
            </div>
            <div class="flex" style="margin-top:95px;">
                <div class="feedback-icon">
                    <span></span>
                    <dl>
                        <dt v-lang.31></dt>
                        <dd v-lang.32></dd>
                    </dl>
                </div>
                <div class="review-icon">
                    <span></span>
                    <dl>
                        <dt v-lang.41></dt>
                        <dd v-lang.42></dd>
                    </dl>
                </div>
            </div>
        </div>
        <div class="form-footer flex">
            <router-link :to="{name:'saasProjectsList'}" class="btn btn-default btn-175" v-lang.es></router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'sassHome',
        messages:{
            en:{
                an:'A new way to source 3D models, streamline workflows and manage assets.',
                11:'View 3D models in a easy way',
                12:'Easily view high-res 3D models in real time immediately after you upload your model.',
                21:'Annotation',
                22:'Easily annotate any model in your browser',
                31:'Feedback',
                32:'Add comments and draw right on top of models to pinpoint exactly where to find feedback. Artists receive a note with the annotated images detailing exactly what to do.',
                41:'Review Anywhere, Anytime',
                42:'Whether you’re at your desk or on-the-go, NovaHub makes review easy. As long as you have an internet connection, you can review from anywhere in your browser, or on your phone with our iPhone app.',
                es:'Learn More'
            },
            zh:{
                an:'一款管理3D建模外包项目的利器',
                11:'更方便的查看3D模型',
                12:'上传之后立即查看高精度3D模型',
                21:'标注模型',
                22:'方便的在浏览器对模型进行标注',
                31:'反馈系统',
                32:'便捷的为模型添加反馈意见，标注模型问题，并且模型师能实时同步收到修改意见',
                41:'随时随地审核',
                42:'NovaHub让模型审核方便快捷。支持桌面版，移动端即将推出',
                es:'立即体验'
            }
        }
    }
</script>

<style lang="scss">
.novahub-home{
    background-color: #fff;
    .novahub-top{
        height: 700px;
        >div{
            width:810px;
            left:50%;
            top:0;
            transform: translate(-50%,0);
            p{
                font-size: 22px;
                color: #fff;
                line-height: 34px;
                margin:8px 0 30px 0;
            }
        }
        h1{
            margin-top:50px;
            font-size: 60px;
            font-weight: normal;
            font-family: bebas-neue;
            color:#fff;
        }
    }
    .novahub-bottom{
        margin-top:15px;
        margin-bottom:65px;
        >div{
            justify-content: space-between;
            span{
                display: block;
                float: left;
                background-image: url(../assets/images/novahub-home-sprite.png);
                background-repeat: no-repeat;
                margin-right:30px;
            }
        }
        dl{
            width:378px;
            float: left;
            dt{
                font-size: 18px;
                color: #0F0F14;
                display: inline-block;
            }
            dd{
                margin-top:12px;
                font-size: 14px;
                color: #4A4A4A;
                line-height: 24px;
            }
        }
        .three-d-icon{
            span{
                width:43px;
                height:42px;
                background-position: 0 0;
            }
        }
        .annotation-icon{
            span{
                width:45px;
                height:42px;
                background-position: -54px -53px;
            }
        }
        .feedback-icon{
            span{
                width:42px;
                height:42px;
                background-position: 0 -53px;
            }
        }
        .review-icon{
            span{
                width:42px;
                height:43px;
                background-position: -57px 0;
            }
        }
    }
}
</style>
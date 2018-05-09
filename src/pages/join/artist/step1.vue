<template>
    <div class="join-step-1">
        <dl>
            <dt v-lang.in></dt>
            <dd>
                {{translate('p1')}}
                <p>
                    {{translate('p2')}}
                </p>
                <p>
                    {{translate('p3')}}
                </p>
            </dd>
        </dl>
        <p class="text-center">
            <template v-if="language === 'zh'">
                <img src="../../../assets/images/join-model-zh.png">
            </template>
            <template v-else>
                <img src="../../../assets/images/join-model.png">
            </template>
        </p>
        <div class="border-box"></div>
        <div class="flex form-footer">
            <router-link :to="{name:'joinArtistTwo'}" class="btn btn-175 btn-default upp" v-lang.join></router-link>
        </div>
    </div>
</template>
<script>
    export default {
        name:'joinArtistOne',
        messages:{
            en:{
                in:'Introduction',
                p1:'Apply to be a Novaby verified aritst is easy, just upload one of your model work, and you can',
                p2:'1. have your own business homepage in Novaby and update your fortolio easily that customers can know you easily;',
                p3:'2. have the right to get 3D outsource work on Novaby platform'
            },
            zh:{
                in:'介绍',
                p1:'申请成为novaby艺术家的流程很简单，只需要上传一个您的模型作品，您就可以',
                p2:'1. 拥有自己的商业主页，方便的更新作品集，以便更多用户了解您；',
                p3:'2. 可以在novaby平台上接外包订单。'
            }
        }
    }
</script>
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
            <img v-if="language === 'zh'" src="../../../assets/images/join-business-zh.png" alt="">
            <img v-else="" src="../../../assets/images/join-business.png" alt="">
        </p>
        <div class="border-box"></div>
        <div class="flex form-footer">
            <router-link :to="{name:'joinBusinessTwo'}" class="btn btn-175 btn-default upp" v-lang.join></router-link>
        </div>
    </div>
</template>
<script>
    export default {
        name:'joinBusinessOne',
        messages:{
            en:{
                in:'Introduction',
                p1:'Become a Novaby partner company, you can',
                p2:'1. Have your own homepage on Novaby where you can display your portfolio and be found easily by customers;',
                p3:'2. Get outsourcing projects through Novaby'
            },
            zh:{
                in:'介绍',
                p1:'成为Novaby的商业合作公司，您可',
                p2:'1.拥有自己的商业主页，方便的更新作品集，以便更多用户了解您；',
                p3:'2.可以在novaby平台上接外包订单。'
            }
        }
    }
</script>
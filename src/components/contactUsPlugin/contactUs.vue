<template>
    <div class="release-quote-container mark" @click.stop="closePop">
        <div class="release-quote" @click.stop="">
            <h4 v-lang.report></h4>
            <div class="select" v-for="li in list" :class="{active:li.selected}" @click.stop="select(li)">{{li.content}}</div>
            <p class="other" v-lang.other></p>
            <textarea name="other" id="other" cols="30" rows="5" v-model="others"></textarea>
            <button class="btn btn-default" @click.stop="submit" v-lang.submit></button>
            <img src="../../assets/images/icon-close.png" class="close-icon pointer" @click="closePop">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'contact-pop',
        data(){
            return{
                list:[],
                enList:[
                    {
                        selected:false,
                        content:'Model disappear',
                    },
                    {
                        selected:false,
                        content:'Model miss some parts',
                    },
                    {
                        selected:false,
                        content:'Texture miss',
                    },
                    {
                        selected:false,
                        content:'Texture wrong position'
                    }
                ],
                zhList:[
                    {
                        selected:false,
                        content:'模型消失',
                    },
                    {
                        selected:false,
                        content:'模型部分缺失',
                    },
                    {
                        selected:false,
                        content:'贴图缺失',
                    },
                    {
                        selected:false,
                        content:'贴图位置不对'
                    }
                ],
                others:''
            }
        },
        messages:{
            en:{
                report:'Report an issue',
                other:'Other',
                submit:'submit'
            },
            zh:{
                report:'提交一个问题',
                other:'其他',
                submit:'提交'
            }
        },
        created(){
            if(this.language === 'zh'){
                this.list = this.zhList
            }
            else{
                this.list = this.enList
            }
        },
        methods:{
            select:function (li) {
                this.list.forEach(function (reason) {
                    reason.selected = li === reason
                })
            },
            getSelected:function () {
                let content;
                this.list.forEach(function (reason) {
                    if(reason.selected){
                        content = reason.content
                    }
                });
                return content
            }
        }
    }
</script>

<style scoped lang="scss">
    .release-quote-container{
        width: 100%;
        height: 100%;
        position: fixed;
        top:0;
        left:0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        .release-quote{
            width:512px;
            background-color: #fff;
            border-radius: 10px;
            position: relative;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            h4{
                font-size: 24px;
                color: #2A2A36;
                text-align: center;
                font-weight: normal;
                margin:45px 0 35px;
                width: 100%;
            }
            .select{
                width: 438px;
                height: 40px;
                border: 1px solid #E0E0E0;
                border-radius: 4px;
                text-align: center;
                font-size: 14px;
                color: #AEAEAE;
                line-height: 40px;
                margin-bottom: 8px;
                position: relative;
                &:last-child{
                    margin-bottom: 20px;
                }
                &.active{
                    border: 1px solid #EA6264;
                    color: #EA6264;
                }
                &:before{
                    content:"";
                    position: absolute;
                    top:11px;
                    left:12px;
                    height: 18px;
                    width: 18px;
                    background-image: url('../../assets/images/icon-true-gry.png');
                }
                &.active:before{
                    content:"";
                    background-image: url('../../assets/images/threeD/icon_contact_selected.png');
                }
            }
            .other{
                font-size: 14px;
                color: #AEAEAE;
                width: 438px;
                margin-top: 4px;
                margin-bottom: 5px;
            }
            textarea{
                border: 1px solid #E0E0E0;
                border-radius: 4px;
                width: 438px;
                padding:5px;
                resize: none;
            }
            .btn{
                width: 262px;
                height: 42px;
                line-height: 42px;
                font-size: 16px;
                color: #FFFFFF;
                margin-top: 28px;
                margin-bottom: 33px;
            }
            .close-icon{
                position: absolute;
                right:20px;
                top:20px;
            }
        }
    }
</style>

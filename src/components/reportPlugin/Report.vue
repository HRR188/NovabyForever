<template>
    <div class="release-quote-container mark" @click.stop="closePop">
        <div class="release-quote" @click.stop="">
            <h4 v-lang.report></h4>
            <div class="select" v-for="li in list" :class="{active:li.selected}" @click.stop="select(li)">{{li.content}}</div>
            <p class="other">Other</p>
            <textarea name="other" id="other" cols="30" rows="5" v-model="others"></textarea>
            <button class="btn btn-green upp" @click.stop="submit" v-lang.submit></button>
            <img src="../../assets/images/icon-close.png" class="close-icon pointer" @click="closePop">
        </div>
    </div>
</template>

<script>
    import store from '../../store/store'

    export default {
        name: 'report-pop',
        data(){
            return{
                list:[],
                others:''
            }
        },
        messages:{
            en:{
                report:'Report',
                other:'Other',
                submit:'submit'
            },
            zh:{
                report:'举报',
                other:'其他',
                submit:'提交'
            }
        },
        watch:{
            others:function () {
                this.disSelect()
            }
        },
        created(){
            store.dispatch('report/getReportReasons',this.type).then((response) => {
                this.list = response
            })
        },
        methods:{
            select:function (li) {
                this.list.forEach(function (reason) {
                    reason.selected = li === reason
                })
                this.others = ''
            },
            disSelect:function () {
                this.list.forEach(function (reason) {
                    reason.selected = false
                })
            },
            getSelected:function () {
                let id
                this.list.forEach(function (reason) {
                    if(reason.selected){
                        id = reason.id
                    }
                })
                return id
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
                    border: 1px solid #2CBE42;
                    color: #2CBE42;
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
                    background-image: url('../../assets/images/icon-true-green.png');
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

<template>
    <div class="saas-help-wrap">
        <saas-title :title="translate('help')"></saas-title>
        <template v-if="status">
            <div class="success">
                <p class="text-center" v-lang.p1></p>
            </div>
        </template>
        <template v-else>
            <div class="text-wrap">
                <textarea :placeholder="translate('p2')" v-model="str"></textarea>
            </div>
            <div class="form-footer flex">
                <button class="btn btn-default upp" @click="submitHelp" v-lang.submit></button>
            </div>
        </template>
    </div>
</template>
<script>
    import saasTitle from '../../components/saasTitle.vue'
    export default {
        name:'saasHelp',
        data(){
            return {
                status:false,
                str:''
            }
        },
        messages:{
            en:{
                help:'Help',
                p1:'Thanks  you to help us grow!',
                p2:'Please leave your comments here'
            },
            zh:{
                help:'帮助',
                p1:'感谢你帮助我们成长！',
                p2:'请在这里写下你的留言'
            }
        },
        props:{
            id:{
                required:true
            }
        },
        components:{
            saasTitle
        },
        methods:{
            submitHelp(){
                let data = {
                    id:this.id,
                    content:this.str
                };
                if(this.str) {
                    this.$store.dispatch('saas/help',data).then((response) => {
                        if(response.code === 200) {
                            this.status = true
                        }
                    })
                }
            }
        }
    }
</script>
<style lang="scss">
    .saas-help-wrap{
        background-color: #fff;
        .text-wrap{
            padding:20px;
        }
        textarea{
            font-size: 16px;
            color: #9B9B9B;
            display: block;
            width:100%;
            padding:15px;
            border: 1px solid #D2D2D2;
            border-radius: 4px;
            height:470px;
            resize: none;
        }
        .form-footer{
            border-top:1px solid #D2D2D2;
            padding:50px 0;
            button{
                width:112px;
                height:30px;
                font-size: 16px;
                color: #fff;
            }
        }
        .success{
            padding:85px 0;
            p{
                font-size: 18px;
                color: #4A4A4A;
                &:before{
                    content:'';
                    display: block;
                    width:94px;
                    height:94px;
                    margin:0 auto 30px;
                    background: url(../../../assets/images/projects-sprite.png) -123px -188px no-repeat;
                }
            }
        }
    }
</style>
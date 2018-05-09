<template>
    <div class="saas-invite-wrap">
        <saas-wrapper>
            <loading ref="loading">
                <saas-title :title="translate('recommend')"></saas-title>
                <div>
                    <invite-List
                            :input="canInvite"
                            :listData="inviteList"
                            @works="showLightbox"
                            @userId="saveUserId"
                            :type="false"
                    ></invite-List>
                </div>
                <div class="form-footer flex" v-if="canInvite">
                    <button class="btn btn-default" @click="sendInvite" v-lang.si></button>
                </div>
                <lightbox></lightbox>
            </loading>
        </saas-wrapper>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    import saasWrapper from '../../components/saasWrapper'
    import saasTitle from '../../components/saasTitle.vue'
    import inviteList from '../../components/inviteList.vue'
    import loading from '../../components/loading.vue'
    import lightbox from '../../../components/commons/lightbox.vue'
    export default {
        name:'saasInvite',
        data(){
            return {
                userId:[],
                canInvite:false
            }
        },
        messages:{
            en:{
                recommend:'NovaHub recommended artists',
                si:'Send invitation'
            },
            zh:{
                recommend:'NovaHub为您推荐的艺术家',
                si:'发送报价邀请'
            }
        },
        props:{
            id:{
                required:true
            }
        },
        created(){
            this.init()
        },
        computed: {
            ...mapState('saas/invite',[
                'inviteList'
            ])
        },
        components:{
            inviteList,
            saasTitle,
            saasWrapper,
            loading,
            lightbox
        },
        methods:{
            init(){
                this.$store.dispatch('saas/invite/getInvite',{id:this.id}).then(response => {
                    this.canInvite = response.data.functions.invite.operate;
                    this.$refs.loading.showSlots();
                })
            },
            showLightbox(val){
                this.$store.commit('lightbox/saveList',{list:val,index:0});
                this.$store.commit('lightbox/saveStatus',true)
            },
            saveUserId(val){
                this.userId = val;
            },
            sendInvite(){
                if(this.userId.length) {
                    this.$store.dispatch('saas/invite/sendInvite',{id:this.id,uids:this.userId}).then((response) => {
                        if(response.code === 200) {
                            if(!response.data.status){
                                this.$alert({type:'confirm',message:'Would you like to submit your project requirement now?'}).then((response) => {
                                    if(response.data === 'confirm'){
                                        this.$router.push({name:'saasModelSpecification'})
                                    }
                                });
                            }
                            else{
                                this.$router.push({name:'saasSelect'})
                            }
                        }
                    })

                }
            }
        }
    }
</script>
<style lang="scss">
    .saas-invite-wrap{
        .form-footer{
            padding:20px 0;
            button{
                width:135px;
                line-height: 30px;
                color:#fff;
                font-size: 16px;
            }
        }
    }
</style>
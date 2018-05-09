<template>
    <div class="partner" :class="{'no-border':lastChild}">
        <div class="portrait">
            <router-link :to="{name:'personalAbout',params:{id:partnerDetail.user_id}}">
                <portrait :portraitUrl="partnerDetail.user_avatar" :type="partnerDetail.user_type" :width="28" :height="28"></portrait>
            </router-link>
            <follow-btn :btnstyle="btnStyle" :followId="partnerDetail.user_id" :followBtnStatus="partnerDetail.follow"></follow-btn>
        </div>
        <div class="detail">
            <router-link :to="{name:'personalAbout',params:{id:partnerDetail.user_id}}">
                <p class="name p-one-line">{{partnerDetail.user_name}}</p>
            </router-link>
            <p class="location p-one-line">{{partnerDetail.user_country + ' / ' + partnerDetail.user_city}}</p>
            <p class="tag">{{translate('specialties')}}:</p>
            <p class="tags p-one-line">
                <span v-for="fields in partnerDetail.user_fields">
                    {{fields + ' '}}
                </span>
            </p>
            <p class="desc p-two-line">{{partnerDetail.user_description}}</p>
        </div>
        <div class="works">
            <template v-for="work in partnerDetail.work">
                <router-link target="_blank" :to="{name:'model-detail',params:{id:work.work_id}}">
                        <div class="work" :style="{backgroundImage:'url('+work.work_cover+')'}">
                            <img src="../../assets/images/icon-3D.png" v-if="work.work_model"/>
                        </div>
                </router-link>
            </template>
        </div>
    </div>
</template>

<script>
    import portrait from '../user/headPortrait.vue'
    import followBtn from '../commons/FollowBtn'
    export default {
        name: 'partner',
        props:{
            partnerDetail:{
                required:true
            },
            lastChild:{
                type:Boolean
            }
        },
        components:{
            portrait,
            followBtn
        },
        data(){
            return{
                btnStyle:{
                    width:'68px',
                    height:'18px'
                }
            }
        },
        messages:{
            en: {
                specialties: 'Specialties'
            },
            zh: {
                specialties: '专长领域'
            }
        }
    }
</script>

<style scoped lang="scss">
    .partner{
        display: flex;
        padding:30px;
        border-bottom: 1px solid #E8E8E8;
        &.no-border{
            border-bottom: none;
        }
        .portrait{
            display: flex;
            flex-flow: column;
            align-content: space-between;
            justify-content: center;
            margin-right: 22px;
            >a{
                display: block;
                width: 92px;
                height: 92px;
                margin-bottom: 27px;
            }
            button{
                margin:0 auto;
            }
        }
        .detail{
            width: 190px;
            text-align: left;
            margin-right: 10px;
            .name{
                font-size: 18px;
                color: #515254;
                margin-bottom: 6px;
            }
            .location{
                font-size: 14px;
                color: #7A7A7A;
                margin-bottom: 10px;
            }
            .tag{
                font-size: 12px;
                color: #515254;
                margin-bottom: 4px;
            }
            .tags{
                font-size: 12px;
                color: #7A7A7A;
                line-height: 20px;
                margin-bottom: 10px;
            }
            .desc{
                font-size: 12px;
                color: #989898;
                line-height: 12px;
                max-height: 24px;
            }
        }
        .works{
            display: flex;
            :last-child .cover{
                margin-right: 0;
            }
            .cover{
                margin-right: 12px;
            }
            .work{
                width: 207px;
                height: 137px;
                background-size: cover;
                background-position: center;
                background-color: #575761;
                position: relative;
                border-radius: 4px;
                margin-left: 10px;
                img{
                    position: absolute;
                    top:8px;
                    right: 8px;
                    width: 20px;
                    height: 20px;
                }
            }
        }
    }
</style>
<template>
    <div class="who-to-follow-container">
        <p class="title">Who to follow</p>
        <div class="follow-projects">
          <template v-for="items in recommendList">
              <div class="project"  :style="{'background-image':'url('+items.work_cover+')'}" @click.stop="goProject(items.work_id)">
                  <div class="black-cover"></div>
                  <p @click.stop="goHomePage(items.author.user_id)">
                    <a>
                        <people-portrait :portraitUrl="items.author.user_avatar" :type="items.author.user_type" :width="10" :height="10"></people-portrait>
                    </a>
                    {{items.author.user_name}}
                  </p>
                  <follow-btn :btnstyle="btnstyle" :followId="items.author.user_id" :followBtnStatus="items.following"></follow-btn>
              </div>
          </template>
        </div>
    </div>
</template>

<script>
    import peoplePortrait from '../user/headPortrait'
    import FollowBtn from '../commons/FollowBtn.vue'
    export default {
        name: 'who-to-follow',
        components:{
            FollowBtn,
            peoplePortrait
        },
        props:{
            projectNumber:{
                required:true,
                type:Number
            }
        },
        data(){
            return {
                btnstyle:{
                    width:'64px',
                    height:'20px',
                    lineHeight:'20px'
                },
                recommendList:[]
            }
        },
        created(){
            let data = {
                size:this.projectNumber,
                type:'model'
            };
            this.$store.dispatch('search/getRecommend',data).then( (response) => {
                response.works.forEach((items) => {
                    this.recommendList.push(items)
              })
            });
        },
        methods:{
            goProject(id) {
                this.$router.push({name:'model-detail',params:{id:id}})
            },
            goHomePage(id){
                this.$router.push({name:'personalAbout',params:{id:id}})
            }
        }
    }
</script>

<style>
    .who-to-follow-container{

    }
    .who-to-follow-container .title{
        font-size: 16px;
        color: #000000;
        width: 100%;
        margin-bottom: 17px;
    }
    .who-to-follow-container .follow-projects{
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
    }
    .who-to-follow-container .follow-projects .project{
        width: 300px;
        /*margin-right:18px;*/
        height: 202px;
        border-radius: 6px;
        background-position: center;
        background-size: cover;
        position: relative;
        cursor: pointer;
    }
    .who-to-follow-container .follow-projects .project:last-child{
        /*margin-right:0;*/
    }
    .who-to-follow-container .follow-projects .project .black-cover{
        background: rgba(0,0,0,0.15);
        width: 100%;
        height: 100%;
        border-radius: 6px;
    }
    .who-to-follow-container .follow-projects .project p{
        width: 100%;
        padding: 0 22px;
        font-size: 14px;
        color: #FFFFFF;
        position: absolute;
        left:0;
        bottom:22px;
        line-height: 32px;
        font-weight: 300;
    }
    .who-to-follow-container .follow-projects .project p>a{
        display: inline-block;
        width:32px;
        height:32px;
    }
    /*.who-to-follow-container .follow-projects .project p img{
        width: 32px;
        height: 32px;
        border-radius: 100%;
        margin-right: 5px;
    }*/

    .who-to-follow-container .follow-projects .project .follow-btn{
        position: absolute;
        right: 22px;
        bottom:22px;
    }


</style>

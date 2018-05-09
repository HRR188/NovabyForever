<template>
    <li>
        <div class="items-top">
            <div class="img-box">
                <router-link :to="{name:'personalAbout',params:{id:followersItem.authors.user_id}}">
                    <portrait :portraitUrl="followersItem.authors.user_avatar" :type="followersItem.authors.user_type" :width="18" :height="18"></portrait>
                </router-link>
            </div>
            <div class="name-msg flex">
                <div>
                    <p>{{followersItem.authors.user_name}}</p>
                    <span>{{followersItem.authors.user_country}}/{{followersItem.authors.user_city}}</span>
                    <div class="btn-box btn-disable-box">
                        <btnComponents :btnstyle="followBtnStyle" :followId="followersItem.authors.user_id" :followBtnStatus="followersItem.authors.isfollow"></btnComponents>
                    </div>
                </div>
            </div>
        </div>
        <ul class="flex show-list">
            <li v-for="index in followersItem.authors.works">
                <router-link :to="{name:'model-detail',params:{id:index.work_id}}" :style="{'background-image':'url('+index.work_cover+')'}">
                </router-link>
            </li>
        </ul>
    </li>
</template>
<script>
import portrait from './headPortrait'
import btnComponents from '../commons/FollowBtn'
export default {
  name:'pageFllowItems',
  components:{
    btnComponents,
    portrait
  },
  props:{
    followersItem:{
      type:Object,
      required:true
    }
  },
  data(){
    return {
      followBtnStyle:{
        width:'75px',
        height:'25px'
      }
    }
  }
}
</script>
<style lang="scss">
.personal-warp{
  .follow-container{
    >li{
      float: left;
      width:300px;
      height:170px;
      background-color:#fff;
      margin-right:20px;
      border: 1px solid #E1E1E1;
      border-radius: 5px;
      overflow: hidden;
      margin-bottom:50px;
      padding:22px;
      &:nth-child(3n){
        margin-right:0;
      }
      .items-top{
        float: left;
        width:100%;
        .name-msg{
          float: left;
          height: 64px;
          width:130px;
          margin-left:10px;
          align-items: center;
          p{
            font-size: 18px;
            color: #515254;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            text-align: left;
          }
          span{
            font-size: 12px;
            color: #7A7A7A;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            text-align: left;
          }
        }
        .btn-box{
          padding-top:5px;
        }
      }
      .img-box{
        width:64px;
        height:64px;
        float: left;
      }
      .show-list{
        float: left;
        width:100%;
        margin-top:15px;
        li{
          float: left;
          width:85px;
          height:55px;
          margin-right:8px;
          border-radius: 5px;
          overflow: hidden;
          &:last-child{
            margin-right:0;
          }
          a{
              display: block;
              width:100%;
              height:100%;
              background-size:cover;
          }
        }
      }
    }
  }
}
</style>

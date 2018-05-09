<template>
  <section>
    <div class="main">
      <div class="guide-box auto position-relative">
        <h1 class="text-center" v-lang.h></h1>
        <form class="clearfix artists-list">
          <router-link to="/home" class="float-left" v-lang.skip></router-link>
          <button type="button" class="btn btn-default float-right" @click="follow" v-lang.f></button>
          <ul class="float-left">
            <li v-for="item in artistsList">
              <div>
                  <people-portrait :portraitUrl="item.user_avatar" :type="item.user_type" :width="16" :height="16"></people-portrait>
              </div>
              <div>
                <p>{{item.user_name}}</p>
                <span>{{item.user_city}}/{{item.user_country}}</span>
              </div>
              <label>
                  <!-- :value="item.user_id" -->
                <input type="checkbox"  v-model="item.checked">
              </label>
            </li>
          </ul>
        </form>
        <div class="bottom"></div>
      </div>
    </div>
  </section>
</template>
<script>
import peoplePortrait from '../../components/user/headPortrait'
export default{
    name:'guide',
    data () {
        return {
            userID:[],
            artistsList:[]
            //userID:true
        }
    },
    messages:{
        en:{
            h:'Meet with great 3D artists',
            skip:'Skip',
            f:'Follow'
        },
        zh:{
            h:'与伟大的3D艺术家相遇',
            skip:'跳过',
            f:'关注'
        }
    },
    components:{
        peoplePortrait
    },
    mounted(){
        // const _this = this;
        // this.$store.dispatch('getRecommendlist').then(function (response) {
        //     _this.artistsList = response
        //     _this.artistsList.forEach(function(item,index){
        //         item.checked = true
        //     })
        // });
        this.$store.dispatch('getRecommendlist').then((response) => {
            this.artistsList = response;
            this.artistsList.forEach(function(item,index){
                item.checked = true
            })
        })
    },
    methods:{
        follow(){
            this.artistsList.forEach((item,index) => {
                if(item.checked == true) {
                    this.userID.push(item.user_id)
                }
            });
            let guideData = {
                users:this.userID
            };
            this.$store.dispatch('followUser',guideData).then((response) => {
                if(response.code == 200) {
                    this.$router.push({name:'marketList'});
                }
            });
        }
    }
}
</script>

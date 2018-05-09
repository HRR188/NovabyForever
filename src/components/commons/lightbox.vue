<template>
    <section class="linghtbox-warp" v-show="status">
        <span class="switch" @click="cloeseLightBox">X</span>
        <div class="lightbox-body">
                <img :src="curImg">
        </div>
        <div class="lightbox-footer">
            <ul>
                <li v-for="(item,index) in list" :class="{active:item.status}" @click="switchLightboxImg(index)">
                    <img :src="item.url">
                </li>
            </ul>
        </div>
    </section>
</template>
<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
    name:'lightbox',
    computed:{
        ...mapState('lightbox',[
            'list','status','index','curImg'
        ])
    },
    methods:{
        cloeseLightBox(){
            this.$store.commit('lightbox/rester')
        },
        switchLightboxImg(index){
            this.$store.commit('lightbox/saveCur',index)
        }
    }
}
</script>
<style lang="scss">
.linghtbox-warp{
  position: fixed;
  width:100%;
  height:100%;
  background-color: rgba(0,0,0,1);
  left:0;
  top:0;
  z-index:10000;
  .switch{
    position: absolute;
    right:20px;
    top:20px;
    font-size:25px;
    color:#fff;
    font-weight: bold;
    cursor: pointer;
  }
  .lightbox-body,.lightbox-footer{
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .lightbox-body{
    height:80%;
    img{
      display: block;
      max-width: 100%;
      max-height: 100%;
      background-size: cover;
      background-position: center;
      background-color: #575761;
    }
  }
  .lightbox-footer{
    height:20%;
    border-top:20px solid #333;
    justify-content: center;
    align-items: center;
    ul{
      max-width: 100%;
      overflow-x: auto;
    }
    li{
      width:100px;
      height:100px;
      margin:0 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      float: left;
      cursor: pointer;
      transition:all linear 0.3s;
      border-radius: 5px;
      overflow: hidden;
      &:hover{
        border:2px solid #fff;
      }
      &.active{
        border:2px solid #fff;
      }
      img{
        display: block;
        max-width:100%;
        max-height:100%;
      }
    }
  }
}
</style>

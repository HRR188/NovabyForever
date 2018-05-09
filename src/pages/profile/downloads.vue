<template>
    <div>
        <div class="downloads-container"  v-infinite-scroll="downMoreFn" infinite-scroll-disabled="downMoreSwitch" infinite-scroll-distance="100">
          <table class="w-p-1">
            <thead>
              <tr>
                <th style="width:250px;">Model</th>
                <th style="width:120px;">Model ID</th>
                <th style="width:100px;">Price</th>
                <th style="width:140px;">Download time </th>
                <th style="width:100px;">Download</th>
                <!--<th>My ratings</th>-->
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in downloadsList">
                <td>
                  <div class="model-msg">
                    <router-link :to="{name:'model-detail',params:{id:item.work_id}}">
                      <img :src="item.cover">
                    </router-link>
                    <div class="">
                      <p>
                        <router-link :to="{name:'model-detail',params:{id:item.work_id}}">{{item.work_title}}</router-link>
                      </p>
                      <router-link :to="{name:'personalAbout',params:{id:item.user_id}}">{{item.user_name}}&nbsp;{{item.user_lastname}}</router-link>
                    </div>
                  </div>
                </td>
                <td>
                  <p>#{{item.work_id}}</p>
                </td>
                <td>
                  <p>#{{item.work_price}}</p>
                </td>
                <td>
                  <div>
                    <div>
                      <p class="text-center">{{item.dl_time_day}}</p>
                      <p class="text-center">{{item.dl_time_year}}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p>
                    <a :href="item.downurl" target="_blank">
                      <img src="../../assets/images/cloud-download.png" alt="">
                    </a>
                  </p>
                </td>
                <!--<td>-->
                  <!--<router-link :to="{name:'model-detail',params:{id:item.work_id}}" class="no-start" v-if="item.stars == 0">Rate Now</router-link>-->
                  <!--<div v-else>-->
                    <!--<Start  :score="item.stars" :type="false"></Start>-->
                  <!--</div>-->
                <!--</td>-->
              </tr>
            </tbody>
          </table>
        </div>
        <loading :loadingMsg="downloadsLoadingMsg"></loading>
        <back-to-top :target="200"></back-to-top>
    </div>
</template>

<script>
import Start from '../../components/commons/Stars'
import loading from '../../components/commons/loading'
import backToTop from '../../components/commons/backToTop'
export default {
    name:'personalDownloads',
    data(){
        return {
            downloadsList:[],
            page:0,
            downloadsLoadingMsg:{
                loadingStatus:false,
                noteText:"No more downloads",
                noteStatus:false
            },
            downMoreSwitch:false
        }
    },
    components:{
        Start,
        loading,
        backToTop
    },
    methods:{
        downMoreFn(){
            this.page++
            let data = {
                'page':this.page,
                'pagesize':10
            }
            this.$store.dispatch('myDownloadsAc',data).then((response) => {
                this.downloadsLoadingMsg.loadingStatus = true
                if(response.code === 200) {
                    this.downloadsList = this.downloadsList.concat(response.data.lists)
                    if(!response.data.has_more) {
                        this.downMoreSwitch = true
                        this.downloadsLoadingMsg.loadingStatus = false
                        this.downloadsLoadingMsg.noteStatus = true
                    }
                }
                else {
                    this.downMoreSwitch = true
                    this.downloadsLoadingMsg.loadingStatus = false
                    this.downloadsLoadingMsg.noteStatus = true
                }

            });
        }
    }
}
</script>

<style lang="scss">
.personal-warp{
    .downloads-container{
        border: 1px solid #E0E0E0;
        margin-top:20px;
        background-color: #fff;
        border-radius: 4px;
        overflow: hidden;
        table{
          border-collapse:collapse;
        }
        thead{
          background-color:#F7F7F7;
          th{
            height:52px;
            border-bottom:1px solid #E0E0E0;
            padding:0;
            font-size: 16px;
            color: #515254;
            font-weight: normal;
          }
        }
        tbody{
          font-size: 16px;
          color: #515254;
          tr{
            td:first-child{
              padding:0 0 0 20px;
            }
            td:last-child{
              padding:0 20px 0 0;
            }
            td{
              padding:0;
            }
          }
          td{
            >*{
              display: flex;
              justify-content: center;
              align-items: center;
              border-bottom:1px solid #D8D8D8;
              height:55px;
              padding:20px 0;
              box-sizing: content-box;
            }
          }
          tr:last-child{
            td >*{
              border-bottom:none;
            }
          }
          .no-start{
            font-size: 16px;
            color: #EA6264;
            text-decoration: underline;
          }
        }
        .model-msg{
          p{
            width:125px;
            margin-left:20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-bottom:10px;
          }
          div{
            >a{
              display: block;
              width:125px;
              margin-left:20px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 12px;
              color: #4990E2;

            }
          }
          a:hover{
            text-decoration: underline;
          }
          img{
            display: block;
            float: left;
            vertical-align: top;
            width:85px;
            height:55px;
            border-radius: 4px;
            overflow: hidden;
          }
        }
        .stars-container{
          padding-left:20px;
          img{
            width:20px;
            height:18px;
            display: inline-block;
            margin-right: 5px;
          }
          span{
            display: none;
          }
        }
    }
}
</style>

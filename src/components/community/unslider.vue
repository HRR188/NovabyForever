<template>
    <div class="slide-plugin-warp position-relative">
        <div class="slide-container position-relative" :style="{'backgroundColor':this.silideConfig.backgroundColor}">
            <!-- transition: transform 0.5s ease;   px-->
            <!-- id="slide-box" -->
            <ul :style="{'transform' : 'translateX(' + translateX + ')','transition-duration':''+speed+'ms',left:leftNum}">
                <li v-for="item in resultImgList" :class="{'show':item.status}">
                    <img :src="item.url" />
                </li>
            </ul>
            <!-- 如果是在模型详情页面，需要将按钮放在容器里面 -->
            <div class="model-btn" v-if="type === 'A'" v-show="btnBoxStatus">
                <button class="left-btn" @click="prev()">
                    <img src="../../assets/images/icon-left.png" />
                </button>
                <button class="right-btn" @click="next()">
                    <img src="../../assets/images/icon-right.png"  />
                </button>
            </div>
        </div>
        <!-- 如果是在project-details页面的轮播图，需要将按钮单独放在外层 -->
        <div class="projects-btn" v-if="type === 'B'" v-show="btnBoxStatus">
            <button class="left-btn" @click="prev()">
                <img src="../../assets/images/icon-left-circle.png" />
            </button>
            <button class="right-btn" @click="next()">
                <img src="../../assets/images/icon-right-circle.png" />
            </button>
        </div>
    </div>
</template>
<script>
export default {
    name:'unslider',
    props:{
        silideConfig:{
            required:true
        },
        slideList:{
            required:true,
            type:Array
        },
        type:{
            required:true   // 类型 A 使用在模型详情页面顶部轮播  类型 B 使用在project-details处轮播  typeof string
        }
    },
    data(){
        return {
            translateX:0,
            curPage:1,
            speed:0,
            leftNum:0,
            clickNum:0,
        }
    },
    computed:{
        btnBoxStatus(){
            return this.slideList.length > 1;
        },
        resultImgList(){
            let arr = [],
                firstArr = {
                    url:this.slideList[0],
                    status:false
                },
                lastArr = {
                    url:this.slideList[this.slideList.length-1],
                    status:false,
                };
            this.slideList.forEach((item,index) => {
                if(index === 0) {
                    let data = {
                        url:item,
                        status:true
                    }
                    arr.push(data)
                }
                else {
                    let data = {
                        url:item,
                        status:false
                    }
                    arr.push(data)
                }
            });
            arr.push(firstArr);
            arr.unshift(lastArr);
            return arr
        }
        // speed1:function(){
        //     return this.silideConfig.time
        // }
    },
    methods:{
        prev(){
            this.clickNum++
            if(this.clickNum === 1) {
                this.resultScroll('prev')
            }

        },
        next(){
            this.clickNum++
            if(this.clickNum === 1) {
                this.resultScroll('next')
            }
        },
        resultScroll(type){
            if(type === 'next'){
                this.leftNum = 0;
                this.resultImgList[this.curPage+1].status = true;
                this.translateX = '-100%'
                this.speed = this.silideConfig.time;
                window.clearTimeout(_time)
                let _time = setTimeout(() => {
                    if(this.curPage >= this.resultImgList.length-2) {
                        this.resultImgList.forEach((item,index) => {
                            if(index === 1) {
                                item.status = true
                            }
                            else {
                                item.status = false
                            }
                        })
                        this.curPage = 0
                    }
                    else {
                        this.resultImgList[this.curPage].status = false;
                    }
                    this.translateX = 0;
                    this.speed = 0;
                    this.curPage++
                    this.clickNum = 0;
                },this.speed)
            }
            else {
                this.leftNum = '-100%';
                this.resultImgList[this.curPage-1].status = true;
                this.translateX = '100%';
                this.speed = this.silideConfig.time;
                window.clearTimeout(_time);
                let _time = setTimeout(() => {
                    if(this.curPage <= 1) {
                        this.resultImgList.forEach((item,index) => {
                            if(index === this.resultImgList.length-2) {
                                item.status = true
                            }
                            else {
                                item.status = false
                            }
                        })
                        this.curPage = this.resultImgList.length-1
                    }
                    else {
                        this.resultImgList[this.curPage].status = false;
                    }
                    this.translateX = 0;
                    this.speed = 0;
                    this.curPage--
                    this.leftNum = 0;
                    this.clickNum = 0;
                },this.speed)
            }
        }
    }
}
</script>
<style lang="scss">
.slide-plugin-warp{
    width:100%;
    height:100%;
    .slide-container{
        overflow: hidden;
        width:100%;
        height:100%;
        >ul{
            width:100%;
            height:100%;
            display: -moz-box;                /* Mozilla */
            display: -webkit-box;             /* WebKit */
            display: box;
            -moz-box-orient: horizontal;      /* Mozilla */
            -webkit-box-orient: horizontal;   /* WebKit */
            box-orient: horizontal;
            -webkit-box-orient: horizontal;
            -webkit-box-direction: row;
            -webkit-flex-direction: row;
            -ms-flex-direction: row;
            flex-direction: row;
            transition-property:transform;
            transition-timing-function: ease;
            position:relative;
            li{
                width:100%;
                height:100%;
                // display: flex;
                display: none;
                justify-content: center;
                align-items: center;
                overflow: hidden;
                &.show{
                    display: flex;
                }
                img{
                    height:100%;
                    max-width:100%;
                }
            }
        }
    }
    .projects-btn{
        >button{
            position: absolute;
            top:50%;
            border: none;
            background-color: rgba(0,0,0,0);
            margin-top:-22px;
            cursor: pointer;
        }
        .left-btn{
            left:-80px;
        }
        .right-btn{
            right:-80px;
        }
    }
    .model-btn{
        img{
            width:28px;
            height:48px;
        }
        >button{
            position: absolute;
            top:50%;
            margin-top:-24px;
            border: none;
            background-color: rgba(0,0,0,0);
            cursor: pointer;
            z-index:10;
        }
        .left-btn{
            left:45px;
        }
        .right-btn{
            right:45px;
        }
    }
}

</style>

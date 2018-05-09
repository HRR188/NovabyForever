<template>
    <div class="time-result">
        <template v-if="status">
            <span class="day">{{day}}</span>d
            <span class="hours">{{hours}}</span>h
            <span class="minutes">{{minutes}}</span>m
            <span class="seconds">{{second}}</span>s
        </template>
        <template v-else>
            <span>Closed</span>
        </template>
    </div>
</template>
<script>
export default {
    name:'time',
    data(){
        return {
            day:0,
            hours:0,
            minutes:0,
            second:0,
            status:true
        }
    },
    props:{
        seconds:{
            required:true
        },
        cloesStatus:{  //是否在时间到了时候显示对应的提示文字，默认是false，关闭状态
            default:false
        }
    },
//     watch:{
//         seconds(){
//             this.result()
//         }
//     },
    created(){
        this.result();
    },
    methods:{
        result(){
            let parentsSecond = parseInt(this.seconds);
            let timeIndex = 0;
            let _time = setInterval(() => {
                let secondsNum = parentsSecond - timeIndex;
                if(secondsNum > 0) {
                    this.day = Math.floor(secondsNum / (60 * 60 * 24));
                    this.hours = Math.floor(secondsNum / (60 * 60)) - (this.day * 24);
                    this.minutes = Math.floor(secondsNum / 60) - (this.day * 24 * 60) - (this.hours * 60);
                    this.second = Math.floor(secondsNum) - (this.day * 24 * 60 * 60) - (this.hours * 60 * 60) - (this.minutes * 60);
                }
                timeIndex++;
                if(timeIndex == parentsSecond+1) {
                    this.second = 0;
                    clearInterval(_time);
                    if(this.cloesStatus) {
                        this.status = false
                    }
                    this.$emit('time',true)
                }
            },1000)
        }
    }
}
</script>
<style lang="scss" scoped>
.time-result{
    font-size: 18px;
    color: #EA6264;
    display: inline-block;
    >span{
        margin:0 2px;
    }
}
</style>

<template>
    <div class="calendar-container">
        <div class="name-wrap" v-lang.c></div>
        <div class="calendar-top clearfix">
            <span class="month-text">{{monthStr}}</span>
            <span class="next" @click="nextAndPrev('next')"></span>
            <span class="prev" @click="nextAndPrev('prev')"></span>
        </div>
        <div class="position-relative">
            <ul class="calendar-buttom clearfix" ref="box">
                <li v-for="item in calendarShowList" :data-status="item.status" :class={active:item.classStatus}>
                    <p class="weeks">{{item.week}}</p>
                    <p class="days" @click="emitData(item)">{{item.day}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name:'calendar',
    data(){
        return {
            calendarList:[],
            weeks:['Su','Mo','Tu','We','Th','Fr','Sa'],
            monthList:['January','February','March','April','May','June','July','August','September','October','November','December'],
            calendarShowList:[],
            monthStr:'',
            dayIndex:0,
            emitMs:null,
        }
    },
    messages:{
        en:{
            c:'Calendar'
        },
        zh:{
            c:'日历'
        }
    },
    props:{
        timeData:{
            required:true
        }
    },
    watch:{
        timeData(){
            this.resultDate()
        }
    },
    methods:{
        /**
         * [将秒数格式化为日期 2017-5-10]
         * @param  {[1494389532]} seconds [秒数]
         * @return {[2017-4-4]} [日期]
         */
        secondsDiff(seconds){
            let time = new Date(parseInt(seconds)*1000);
            let year = time.getFullYear(),
                month = time.getMonth()+1,
                day = time.getDate();
            return year+'-'+month+'-'+day
        },
        /**
        * [计算出两个日期之间的天数差]
        * @param  {[2017-4-4]} start [开始时间]
        * @param  {[2017-4-4]} end [结束时间]
        * @return {[number]} [相差的天数]
        */
        dateDiff(start,end){
            let startTime = start.split('-');
            let endTime = end.split('-');
            let startDate = new Date(parseInt(startTime[0]),parseInt(startTime[1])-1,parseInt(startTime[2]));
            let endDate = new Date(parseInt(endTime[0]),parseInt(endTime[1])-1,parseInt(endTime[2]));
            let res = Math.abs(parseInt(endDate  -  startDate))/1000/60/60/24;
            return res
        },
        /**
         * [根据索引截取不同位置的数组，以及设置月份]
         * @param  {[1]} index [索引的位置]
         */
        resuleIndex(index){
            if(index < 1) {
                this.calendarShowList = this.calendarList[index]
            }
            else {
                this.calendarShowList = this.calendarList[index-1]
            }
            this.monthStr = this.calendarShowList[0].month
        },
        emitData(data){
//            if(data.status === 'upload' || data.status === 'today' || data.status === 'todayend') {
//                this.calendarShowList.forEach(function(item,index){
//                    item.classStatus = false
//                })
//                data.classStatus = true
//                if(this.emitMs !== data.ms) {  // 如果当前存储的毫秒值和当前点击的毫秒值不一样的时候才传递数据
//                    this.$emit('detailsMS',data.ms)
//                    this.emitMs = data.ms
//                }
//            }
        },
        nextAndPrev(type){
            let maxLength = this.calendarList.length;
            if(type === 'next') {
                if(this.dayIndex+1 <= maxLength) {
                    this.dayIndex++;
                    this.resuleIndex(this.dayIndex)
                }
            }
            else {
                if(this.dayIndex-1 > 0) {
                    this.dayIndex--;
                    this.resuleIndex(this.dayIndex)
                }
            }
        },
        resultDate(){
            let boxContentWidth = this.$refs.box.offsetWidth-17;
            let maxLength = parseInt(boxContentWidth/65);
            // 转存出父组件传递进来时间秒数

            let startTimeSeconds = this.timeData.start_time,
                curTimeSeconds = this.timeData.current_time,
                endTimeSeconds = this.timeData.end_time,
                submitsList = this.timeData.submits_time;
            // 将秒数转为时间 例如 2017-4-5
            let curTime = this.secondsDiff(curTimeSeconds),
                startTime = this.secondsDiff(startTimeSeconds),
                endTime = this.secondsDiff(endTimeSeconds);
            let dataObj = new Date(curTimeSeconds*1000); // 将服务器的当前时间毫秒数存入date对象中
            let curDay = `${dataObj.getFullYear()}-${dataObj.getMonth()+1}-${dataObj.getDate()}`;
            let resultCurDay = this.dateDiff(startTime,curDay); // 计算出开始时间到当前时间的天数差
            this.dayIndex = Math.ceil(resultCurDay/maxLength);  //计算出共有多少页
            let timeDifference = this.dateDiff(startTime,endTime);
            const PROIECTSTIME = timeDifference+1; // 计算出项目共计需要多少天
            let dataList = []; // 用来存放格式化后的数据
            const DAYMS = 24*60*60*1000;  // 一天有多少毫秒
            for(let i = 0;i<PROIECTSTIME;i++) {
                // 计算出从项目开始时间到项目结束时的每一天的毫秒值
                let curMS = (startTimeSeconds*1000) + (i*DAYMS);
                let resultDate = new Date(curMS);
                let dataJson = {
                    month:`${this.monthList[resultDate.getMonth()]}`,
                    day:`${resultDate.getDate()}`,
                    week:`${this.weeks[resultDate.getDay()]}`,
                    ms:curMS,
                    status:true,
                    classStatus:false
                };
                dataList.push(dataJson)
            }
            dataList[resultCurDay].status = 'today';
            //this.$emit('detailsMS',dataList[resultCurDay].ms) // 在mounted的时候将当天的毫秒值传递到父组件中去
            this.emitMs = dataList[resultCurDay].ms;  // 将当天的毫秒值存到数据中去，为后面做判断使用

            for(let i=0;i<dataList.length;i++) {
                if(i>resultCurDay) {   // 如果日期是在当前时间之后
                    dataList[i].status = 'false'
                }
                if(i+1 === dataList.length) { // 给end日期添加状态
                    dataList[i].status = 'end'
                }
            }
            if(resultCurDay+1 === dataList.length) { // 如果当前时间是项目的最后一天
                dataList[resultCurDay].status = 'todayend'
            }
            if(submitsList.length > 0) {  // 如果项目时间内上传文件的时间戳数组不为空
                for(let i=0;i<submitsList.length;i++) {
                    for(let y =0;y<dataList.length;y++) {
                        if(dataList[y].ms === (submitsList[i]*1000)) {
                            dataList[y].status = 'upload'
                        }
                    }
                }
            }
            let dataIndex = Math.ceil((dataList.length)/maxLength); // 计算出整体的日历数据需要拆分几次
            for(let i =0;i<dataIndex;i++) {
                let index = i*maxLength;
                let showData = dataList.slice(index,(i+1)*maxLength);
                this.calendarList.push(showData)
            }
            this.resuleIndex(this.dayIndex)
        }
    }
}
</script>
<style lang="scss" scoped>
.calendar-container{
    background-color:#fff;
    margin-bottom:10px;
    .name-wrap{
        font-size: 16px;
        color: #4A4A4A;
        border-bottom:1px solid #E8E8E8;
        line-height: 45px;
        padding-left:20px;
    }
    .calendar-top{
        padding:0 25px;
        margin-top:20px;
        .month-text{
            font-size: 16px;
            color: #929DA8;
            &:before{
                content:'';
                display: inline-block;
                width:13px;
                height:14px;
                background:url(../../assets/images/projects-sprite.png) -258px -29px no-repeat;
                margin-right:5px;
            }
        }
        .prev,.next{
            display: inline-block;
            width:26px;
            height:26px;
            float: right;
            background-image: url(../../assets/images/projects-sprite.png);
            background-repeat: no-repeat;
            cursor: pointer;
        }
        .prev{
            background-position: 0 -136px;
            margin-right:12px;
        }
        .next{
            background-position: -38px -136px;
            margin-right:18px;
        }
    }
    .calendar-buttom{
        padding:0 25px 20px;
        margin-top:10px;
        width:100%;
        overflow: auto;
        >li{
            float: left;
            width:32px;
            margin-right:33px;
            .weeks{
                font-size: 18px;
                color: rgba(52,72,94,0.54);
                text-align: center;
            }
            .days{
                margin-top:6px;
                width:32px;
                height:32px;
                text-align: center;
                line-height: 32px;
                font-size: 17px;
                color: #929DA8;
            }
            &:last-child{
                margin-right:0;
            }
        }
        >[data-status=today]{
            .days{
                font-size:14px;
                color:#fff;
                background-color:#EA6264;
                border-radius: 4px;
                line-height: 24px;
                cursor: pointer;
                &:after{
                    content:'Today';
                    display: block;
                    line-height: 0;
                    font-size:12px;
                    transform:scale(0.65);
                }
            }
        }
        >[data-status=false]{
            .days,.weeks{
                color: #D5D5D5;
                cursor: not-allowed;
            }
        }
        >[data-status=end]{
            .weeks{
                color: #D5D5D5;
            }
            .days{
                font-size: 14px;
                color: #D5D5D5;
                line-height: 24px;
                cursor: not-allowed;
                &:after{
                    content:'END';
                    display: block;
                    line-height: 0;
                    font-size:12px;
                    transform:scale(0.65);
                }
            }
        }
        >[data-status=upload]{
            .days{
                position:relative;
                cursor: pointer;
                &:before{
                    content:'';
                    display: block;
                    width:5px;
                    height:4px;
                    background-color:#7C86A2;
                    position: absolute;
                    left:2px;
                    top:2px;
                }
            }
        }
        >[data-status=todayend]{
            .days{
                font-size:14px;
                color:#fff;
                background-color:#EA6264;
                border-radius: 4px;
                line-height: 24px;
                cursor: pointer;
                &:after{
                    content:'END';
                    display: block;
                    line-height: 0;
                    font-size:12px;
                    transform:scale(0.65);
                }
            }
        }
        // .active[data-status=true]{
        //     .days{
        //         border: 1px solid #EA6264;
        //         border-radius: 4px;
        //         color: #EA6264;
        //     }
        // }
        .active[data-status=upload]{
            .days{
                border: 1px solid #EA6264;
                border-radius: 4px;
                color: #EA6264;
                &:before{
                    background-color:#EA6264;
                }
            }
        }
    }
}
</style>

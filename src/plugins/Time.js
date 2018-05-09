/**
 * Created by harryliu on 9/6/17.
 */
const monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
];
const fiveMinuts = 1000*60*5;
const hour = 1000*60*60;
const day = hour*24;
const sevenDays = day*7;

let Time = {
    install:function (Vue) {
        Vue.filter('time',function (value,option) {
            //mst 带时区
            let timeDif = value.end*1000 - value.start*1000;
            if(timeDif<=fiveMinuts){
                return 'just now'
            }
            else if(timeDif<=hour){
                return 'several minutes ago'
            }
            else if(timeDif<=day){
                let time = parseInt(timeDif / hour);
                let result = '';
                switch(time){
                    case 1:
                        result = '1 hour ago';
                        break;
                    case 2:
                        result = '2 hours ago';
                        break;
                    default:
                        result = "several hours ago";
                }
                return result
            }
            else if(timeDif<sevenDays){
                let time = parseInt(timeDif / day);
                let result = '';
                switch(time){
                    case 1:
                        result = 'a day ago';
                        break;
                    default:
                        result = time+" days ago";
                }
                return result
            }
            else{
                let date = new Date(value.start*1000);
                return date.getDate()+','+monthNames[date.getMonth()]+','+date.getFullYear()
            }

            // if(option){
            //
            // }
            // else{
            //     //return hours+':'+minutes+':'+seconds+' '+day+','+monthNames[monthIndex]+','+year
            // }
        })
    }
};

export default Time

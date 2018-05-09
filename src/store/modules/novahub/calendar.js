/**
 * Created by harryliu on 11/6/17.
 */
import api from '../../../api/api'
const calendar = {
    namespaced:true,
    state:{
        countdown:0,
        timeMsg:false
    },
    mutations:{
        setCountdown(state,timeMsg){
            state.countdown = Math.abs(timeMsg.end_time - timeMsg.current_time)
        },
        setTimeMsg(state,timeMsg){
            state.timeMsg = timeMsg
        }
    },
    actions:{
        getTimeMsg(context,id){
            let proId = {
                id:id
            };
            api.getData('calendarData',proId).then(function (response) {
                if(response.data.code === 200) {
                    context.commit('setCountdown',response.data.data.data);
                    context.commit('setTimeMsg',response.data.data.data)
                }
            })
        }
    }
};

export default calendar

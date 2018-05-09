import api from '../../../api/api'

const feedback = {
    namespaced:true,
    actions:{
        async getFeedbackPageData(context,data){
            let result = await api.getData('saasGetFeedbackPageData',data);
            return result.data
        },
        async getFeedbackList(context,data){
            let result = await api.getData('saasGetFeedbackList',data);
            return result.data
        },
        async getFeedbackDetail(context,data){
            let result = await api.getData('saasGetFeedbackDetail',data);
            return result.data
        },
        async updateFeedbackDetail(context,data){
            let result = await api.postData('saasUpdateFeedbackStatus',data);
            return result.data
        },
        async leaveComment(context,data){
            let result = await api.postData('feedbackLeaveComment',data);
            return result.data
        },
        async deleteFeedback(context,data){
            let result = await api.postData('deleteFeedback',data);
            return result.data
        }
    }
};

export default feedback
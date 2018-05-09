import api from "../../../api/api";

const releaseQuote = {
    namespaced:true,
    actions:{
        async releaseQuote(context,data){
            let result = await api.postData('releaseQuote',data);
            return result.data.data
        }
    }
};

export default releaseQuote
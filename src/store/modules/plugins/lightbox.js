const lightbox = {
    namespaced:true,
    state:{
        list:[],
        status:false,
        index:0,
        curImg:''
    },
    mutations:{
        saveList(state,data){
            console.log(data)
            data.list.forEach((item,index) => {
                let resultData;
                if(data.index === index) {
                    resultData = {
                        status:true,
                        url:item
                    };
                    state.curImg = item
                }
                else {
                    resultData = {
                        status:false,
                        url:item
                    }
                }
                state.list.push(resultData)
            });
        },
        saveStatus(state,statusData){
            state.status = statusData
        },
        saveCur(state,indexData){
            state.curImg = state.list[indexData].url;
            state.list.forEach((item,index) => {
                item.status = false
            });
            state.list[indexData].status = true;
            state.curImg = state.list[indexData].url
        },
        rester(state){
            state.status = false;
            state.index = 0;
            state.list = [];
            state.curImg = ''
        }
    }
};
export default lightbox

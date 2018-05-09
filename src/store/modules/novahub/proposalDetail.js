/**
 * Created by harryliu on 19/6/17.
 */
import api from '../../../api/api'

const proposalDetail = {
    namespaced:true,
    state:{
        proposalDetail:{},
        conceptsDetail:{}
    },
    mutations:{
        setDetail:function (state,detail) {
            state.proposalDetail = detail
        },
        setConceptDetail:function (state,detail) {
            state.conceptsDetail = detail
        }
    },
    actions:{
        getProposalDetail:function (context,id) {
            let data = {
                id:id
            };
            api.getData('proposalDetail',data).then(function (response) {
                context.commit('setDetail',response.data.data.detail)
            })
        },
        getConceptDetail:function (context,id) {
            let data = {
                id:id
            };
            api.getData('abConcepts',data).then(function (response) {
                context.commit('setConceptDetail',response.data.data.attachment)
            })
        }
    }
};

export default proposalDetail

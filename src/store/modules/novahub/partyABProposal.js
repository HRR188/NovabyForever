/**
 * Created by harryliu on 19/6/17.
 */
import api from '../../../api/api'

const partyABProposal = {
    namespaced:true,
    state:{
        currentStep:0,
        finishedSteps:0,
    },
    mutations:{
        setStep (state,step) {
            state.currentStep = step;
            state.finishedSteps = step - 1
        },
        nextStep (state) {
            state.currentStep++;
            state.finishedSteps++
        }
    },
    actions:{
        getStep (context,id) {
            let data = {
                id:id
            };
            api.getData('proposalProgress',data).then((response) => {
                context.commit('setStep',response.data.data.progress)
            })
        }
    }
};

export default partyABProposal

/**
 *
 * Created by harryliu on 11/6/17.
 */
import calendar from './calendar'
import projects from './projects'
import projectDetail from './projectDetail'
import releaseQuotes from './releaseQuotes'
import partyABProposal from './partyABProposal'
import proposalDetail from './proposalDetail'
import contract from './contract'
import building from './building'
import submission from './submission'
import proposal from './proposal'
const novahub = {
    namespaced:true,
    modules:{
        calendar,
        projects,
        projectDetail,
        releaseQuotes,
        partyABProposal,
        proposalDetail,
        proposal,
        contract,
        building,
        submission,
    }
}

export default novahub

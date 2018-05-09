import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user/user'
import recommend from './modules/functions/recommend'
import imageUpload from './modules/functions/imageUpload'
import fileUpload from './modules/functions/fileUpload'
import modelsList from './modules/community/modelsList'
import nav from './modules/nav/nav'
import modelDetail from './modules/community/modelDetail'
import likeDownloadFollow from './modules/functions/likdDownloadFollow'
import search from './modules/search/search'
import home from './modules/home/home'
import share from './modules/functions/share'
import novahub from './modules/novahub/novahub'
import wallet from './modules/wallet/wallet'
import dict from './modules/functions/dict'
import userProfile from './modules/user/userProfile'
import feedback from './modules/feedback/feedback'
import partner from './modules/partner/partner'
import report from './modules/plugins/report'
import pay from './modules/pay/pay'
import lightbox from './modules/plugins/lightbox'
import three from './modules/threeD/three'
import message from './modules/message/message'
import uploadModel from './modules/community/uploadModel.js'
import getOssToken from './modules/functions/getOssToken'
import contact from './modules/functions/contact'
import saas from './modules/saas/saas'
import team from './modules/team/teamInfo'
import qiNiu from './modules/qiNiu/qiNiu'
import checkPermission from './modules/checkPermission/checkPermission'
import file from './modules/functions/file'
// import service from './modules/user/service'   //  服务类暂时隐藏
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex);

const STORE = new Vuex.Store({
    getters,
    actions,
    modules:{
        user,
        recommend,
        imageUpload,
        fileUpload,
        dict,
        userProfile,
        modelsList,
        nav,
        modelDetail,
        likeDownloadFollow,
        search,
        home,
        share,
        novahub,
        report,
        wallet,
        feedback,
        partner,
        pay,
        lightbox,
        three,
        message,
        uploadModel,
        getOssToken,
        contact,
        saas,
        team,
        qiNiu,
        checkPermission,
        file
    }
});

export default STORE

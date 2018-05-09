import API_BASE from './root'

let novahub = {
    login:'/api/auth/login',  //登录
    register:'/api/auth/register', // 注册
    recommend:'/api/behavior/recommend',  //推荐关注列表
    followUser:'/api/behavior/follow', //关注推荐关注设计师
    changepasswd:'/api/profile/changepasswd', // 修改密码
    getUserInfo:'/api/profile/userInfo', //个人资料获取
    userEdit:'/api/profile/edit',  // 个人资料修改
    getLoginStatus:'/api/profile/basicInfo',  //通过token拿到用户的基本信息
    country:'/api/data/dict/country',   // 字典 国家
    city:'/api/data/cities', // 字典 根据国际查询城市
    job:'/api/data/dict/job',   //字典 用户职业
    field:'/api/data/dict/field', //字典 用户专业领域
    tag:'/api/data/dict/tag', // 字典 模型标签
    format:'/api/data/dict/format', // 字典 模型格式
    myDownloads:'/api/work/mydownloads', // 我的下载列表
    myuploads:'/api/work/myworks', // my uploads
    pageUserWorks:'/api/users/userWorks', //个人主页 用户的作品列表
    pageLikedWorks:'/api/users/likedWorks',  //个人主页 用户喜欢的模型列表
    pageUsers:'/api/users', //个人主页 用户信息
    pageFollowers:'/api/users/followers', //个人主页 用户的粉丝 followers
    pageFollowings:'/api/users/followings', //个人主页 用户关注的用户 followings
    modelAttr:'/api/data/dict/modelattr', //上传project字典
    ossToken:'/api/data/ossToken', //获取阿里云token
    uploadProject:'/api/work/create', //上传模型
    editorModel:'/api/work/preview', //根据模型id获取模型信息
    createModel: '/api/work/create', //创建模型
    marketList:'/api/markets/',//获取market列表
    followingList:'/api/followings/',//获取following列表
    modelDetail:'/api/model/detail/', //获取模型详情
    modelReplies:'/api/model/comments/', //获取评论列表
    sendReply:'/api/model/comment', //发送评论
    getUserCard:'/api/user/usercard',
    editHeadPortrait:'/api/profile/editIcon', // Dashboard 更换头像
    downloadModel:'/api/work/download', //下载模型接口
    likeModel:'/api/work/like', //喜欢模型
    recommendMsg:'/api/recommend',  // 推荐信息，推荐关注的人 ／ 推荐的模型  ／ 推荐的项目
    search:'/api/getSearch',  // 搜索
    searchUserFilter:'/api/search/userData',//获取user搜索出的筛选条件
    searchModelFilter:'/api/search/modelData', //获取model搜索出的筛选条件
    sendEmailCode:'/api/account/findpass',  //找回密码 通过邮箱发送验证码
    validationCode:'/api/account/ckeckcode', //找回密码 校验验证码是否正确
    resetPassword:'/api/account/resetpass',  // 找回密码 重置密码
    messageList:'/api/message/list', //消息列表
    messageDelete:'/api/message/delete', //消息删除
    messageReading:'/api/message/markread', //将消息标记为已读
    homeData:'/api/home', //首页数据
    preShare:'/api/preshare', //分享数接口
    share:'/api/share', //分享
    zipUpload:'/api/work/upload', //模型zip上传
    linkStatus:'/api/social/status', // 获取用户社交账号的状态
    facebookLink:'/api/social/fbconnect', // facebook link
    facebookDisconnect:'/api/social/fbdisconnect', // facebook Disconnect
    twitter:'/api/social/twitter/connect', //twitter link
    twitterDisconnect:'/api/social/twitter/disconnect', //twitter Disconnect
    linkedinDisconnect:'/api/social/linkedin/disconnect', //linkedin Disconnect
    pinterestDisconnect:'/api/social/pinterest/disconnect', //pinterest Disconnect
    projectsHall:'/api/task/lists', //项目大厅列表
    myProjects:'/api/novahub/projects', //甲方乙方项目列表
    projectHallDetail:'/api/task/detail', //项目详情
    releaseAttr:'/api/project/pubattr', //发布属性
    releaseAttrTags:'/api/work/tags', //发布项目，根据选择不同类型获取不同tags
    timeZone:'/api/data/timezone', //时区字典表
    createProject:'/api/novahub/projects/create', //甲方发布项目
    proposalList:'/api/project/proposal_lists', // proposal列表
    proposalResults:'/api/project/proposalResult',  // proposal结果
    proposalProgress:'/api/project/progress', //项目当前进度
    proposalDetail:'/api/task/detail', //项目详情-甲方乙方所有查看详情详情用
    bProposalStep:'/api/task/myBidding', //乙方proposal
    aProposalStep:'/api/project/proposal', //甲方proposal
    bSubmitPrice:'/api/task/offer', //乙方提交报价
    aBContract:'/api/project/viewcontract', //甲方／乙方 查看contract
    aChooseArtist:'/api/project/chooseModeler', // 甲方选择模型师
    paypal:'/api/project/payPal', //甲方paypal支付
    aUploadFile:'/api/project/uploadAttachment', //甲方上传附件
    abConcepts:'/api/project/viewconcepts', //甲方／乙方 查看concepts
    checkPaypalResult:'/api/project/checkPayResult', //paypal支付结果
    calendarData:'/api/project/buildprocess', // 日历数据
    dayworks:'/api/project/dayworks', // 甲方／乙方查看选中天的上传结果
    uploadDaily:'/api/task/uploadDaily' , // proposal  building乙方上传文件
    finalAttach:'/api/project/finalattach', // 甲方查看乙方最终上传的文件
    submission:'/api/novahub/projects/projectRate', //甲方审核项目
    checkSubmission:'/api/novahub/projects/projectResult', //甲方／乙方 检查审核状态
    prevContract:'/api/project/prevContract', //预付款信息
    modifyPaypal:'/api/profile/savePay', //Dashboard修改paypal信息
    payPalInfo:'/api/profile/payInfo', // 获取paypal信息和账户余额
    cashWithdrawal:'/api/task/withdraw', // 申请提现
    withdrawHistory:'/api/task/withdrawHistory', // 提现记录
    feedback:'/api/feedback',  // feedback
    partnerList:'/api/partner', //partner列表
    partnerItem:'/api/partner/work', //partner 点击加载
    reportGetReason:'/api/getReason', // 获取举报原因
    submitReport:'/api/report', //举报
    planList:'/api/plan/list', //获取服务列表
    planReview:'/api/plan/choose', //购买服务预览
    planBuy:'/api/plan/buy/' ,//购买服务支付
    planFree:'/api/plan/freeupgrade', // 申请免费的标注服务
    getAnnotationModelData:'/api/project/modelformark', //待标注的模型信息
    buildingFeedBackList:'/api/project/marks', //novahub流程building反馈列表
    buildingFeedBackChecked:'/api/project/mark/check', //novahub流程building甲方审核乙方的修改
    buildingFeedBackModify:'/api/task/mark/response',  //novahub流程building乙方上传修改的图片
    buildingFeedBackHistory:'/api/project/mark/records', //novahub流程查看问题的历史记录
    uploadAnnotationList:'/api/project/mark', //提交标注问题
    submitModelConvertFinish:'/api/project/convertconfirm',//标记模型转换完成
    finduser:'/api/user/finduser', // homepage根据路由的字符串查询用户id跳转对应的个人主页
    invitation:'/api/user/modelersearch' , //发布项目时搜索人
    deleteProject:'/api/project/delete', //删除已经发布的项目
    deleteModel:'/api/work/delete', //删除已经发布作品
    newMarketNote:'/api/market/newworknum', //获取market目前有多少条最新的数据
    newMarketList:'/api/market/newworks', //market列表获取最新的数据
    editModel:'/api/work/modelEdit', // 模型编辑
    modelFeedback:'/api/modelFeedback', // 模型feedback
    saasModelList:'/api/novahub/projects/getWorkBench', //项目的模型列表
    saasModelDetails:'/api/novahub/projects/model',  //根据task模型列表获取对应的相关模型信息
    saasModelUpload:'/api/novahub/projects/modelUpload',  //saas工具项目过程模型上传
    taskPartyBSubmit:'/api/novahub/projects/modelSave', //乙方上传成功 submit信息
    taskPublish:'/api/novahub/projects/modelPublish' , //模型转换成功 乙方确认转换无误
    taskModelAccept:'/api/novahub/projects/modelAccept', // 甲方通过乙方单个模型
    projectApply:'/api/novahub/projects/projectIntention',  //novahub更改项目更新标记
    userSaveLanguage:'/api/profile/saveLang',  //保存语言
    modelFormat:'/api/data/dict/model',  //model模型格式
    companyBasicInfo:'/api/data/dict/companyInfo',  //model模型格式
    getTeamInfo: '/api/team/listTeam', //查看团队信息
    deleteMember: '/api/team/deleteMember', //查看团队信息
    createTeam: '/api/team/createTeam', //创建team,
    searchUser: '/api/team/searchUser', //搜索用户
    inviteMembers: '/api/team/inviteUser', //发送成员邀请
    joinMembers: '/api/team/joinTeam', //加入team
    rejectMembers: '/api/team/rejectTeam', //拒绝加入team
    saveTeam: '/api/team/saveTeam', //保存team
    releaseQuote:'/api/novahub/projects/saveQuote',
    getQiNiuToken:'/api/data/uploadToken' ,//获取七牛云存储token
    getFileTypeList:'/api/data/getFormat' //获取上传文件支持格式
};

let saas = {
    saasPayment:'/api/novahub/projects/projectContract',  //sass payment信息
    saasHelp:'/api/novahub/projects/projectHelp' ,//saas help
    saasInvite:'/api/novahub/projects/recommendList', //项目邀请人列表
    saasApply:'/api/novahub/projects/applyList', //项目报价人列表
    saasSendInvite:'/api/novahub/projects/projectInvite', //邀请对应选中的用户参与报价
    saasContract:'/api/novahub/projects/payTerm',//甲方获取支付合同
    saascConsentContract:'/api/novahub/projects/agreePayTerm', //甲方同意支付合同
    saasBid:'/api/novahub/projects/projectApply',  //乙方给甲方报价
    saasBidStatus:'/api/novahub/projects/applyStatus', //获取乙方的报价状态
    saasGetUserBaseData:'/api/novahub/projects/projectRole', //novahub判断用户角色
    saasSubmitSpecification:'/api/novahub/projects/requirement', //novahub上传原画需求
    saasGetSpecification:'/api/novahub/projects/getRequirement', ///api/novahub/projects/getRequirement
    saasChat:'/api/novahub/projects/chat', //获取聊天人的信息以及聊天内容
    saasSendChat:'/api/novahub/projects/chatSend',  //发送聊天内容
    saasCreateChat:'/api/novahub/projects/createChat',  //创建聊天会话
    saasOverProject:'/api/novahub/projects/projectOver', //判断项目是否已经结束
    sassPartyAFail:'/api/novahub/projects/projectReview',  //甲方fail项目
    sassGetNda:'/api/novahub/projects/getNDA',  //获取NDA接口
    sassSetNda:'/api/novahub/projects/projectNDA',  //novahub乙方签订NDA
    saasCheckProjectStart:'/api/novahub/projects/projectStatus',  //novahub判断项目是否开始
    saasMarkProjectAsRead:'/api/novahub/projects/projectUpdateStatus',  //novahub更改项目更新标记
    saasGetQuote:'/api/novahub/projects/getQuote', //novahub获取quote
    saasGetProjectInfo:'/api/novahub/projects/getProjectInfo', //novahub获取project info
    saasSaveProjectInfo:'/api/novahub/projects/saveProject', //novahub保存project info
    saasInviteMembers:'/api/novahub/projects/InviteMember', //novahub——project setting邀请成员
    getTeamMembers:'/api/novahub/projects/importTeam',//获取团队成员
    saasImportMembers:'/api/novahub/projects/saveImport', //导入成员
    saasGetMembers:'/api/novahub/projects/getMembers', //人员列表
    saasRemoveMember:'/api/novahub/projects/removeMember', //移除用户
    saasSaveMember:'/api/novahub/projects/saveMember', //保存用户
    saasMarkFail:'/api/novahub/projects/projectReview', //novahub项目审核
    saasGetFeedbackPageData:'/api/novahub/projects/getFeedBackInfo', //获取feedback页面信息
    saasGetFeedbackList:'/api/novahub/projects/getFeedBack', //FeedBack列表
    saasGetFeedbackDetail:'/api/novahub/projects/feedBackDetail', //feedBack详情
    saasUpdateFeedbackStatus:'/api/novahub/projects/updateStatus', //更新feedback状态
    removeInternalProject:'/api/novahub/projects/deleteProject', //删除项目
    feedbackLeaveComment:'/api/novahub/projects/sendComment', //发送feedback留言
    checkPermission:'/api/novahub/service/userService', //判断是否拥有服务权限
    testInternalPermission:'/api/novahub/service/validateKey', //验证服务密钥
    deleteFeedback:'/api/novahub/projects/deleteFeedBack', //删除feedback
    getChatUserList:'/api/novahub/projects/chatList', //获取联系人列表
    getChatUserHistory:'/api/novahub/projects/getChatHistory' //获取对话历史记录
};

let api = Object.assign(novahub,saas);

let apiUrl = {
    login:`${API_BASE}${api.login}`,
    register:`${API_BASE}${api.register}`,
    recommend:`${API_BASE}${api.recommend}`,
    followUser:`${API_BASE}${api.followUser}`,
    changepasswd:`${API_BASE}${api.changepasswd}`,
    getUserInfo:`${API_BASE}${api.getUserInfo}`,
    userEdit:`${API_BASE}${api.userEdit}`,
    getLoginStatus:`${API_BASE}${api.getLoginStatus}`,
    country:`${API_BASE}${api.country}`,
    city:`${API_BASE}${api.city}`,
    job:`${API_BASE}${api.job}`,
    field:`${API_BASE}${api.field}`,
    tag:`${API_BASE}${api.tag}`,
    format:`${API_BASE}${api.format}`,
    myDownloads:`${API_BASE}${api.myDownloads}`,
    myuploads:`${API_BASE}${api.myuploads}`,
    pageUserWorks:`${API_BASE}${api.pageUserWorks}`,
    pageLikedWorks:`${API_BASE}${api.pageLikedWorks}`,
    pageUsers:`${API_BASE}${api.pageUsers}`,
    pageFollowers:`${API_BASE}${api.pageFollowers}`,
    pageFollowings:`${API_BASE}${api.pageFollowings}`,
    modelAttr:`${API_BASE}${api.modelAttr}`,
    ossToken:`${API_BASE}${api.ossToken}`,
    uploadProject:`${API_BASE}${api.uploadProject}`,
    editorModel:`${API_BASE}${api.editorModel}`,
    createModel:`${API_BASE}${api.createModel}`,
    modelsList:`${API_BASE}${api.modelsList}`,
    marketList:`${API_BASE}${api.marketList}`,
    followingList:`${API_BASE}${api.followingList}`,
    modelDetail:`${API_BASE}${api.modelDetail}`,
    modelReplies:`${API_BASE}${api.modelReplies}`,
    sendReply:`${API_BASE}${api.sendReply}`,
    getUserCard:`${API_BASE}${api.getUserCard}`,
    editHeadPortrait:`${API_BASE}${api.editHeadPortrait}`,
    downloadModel:`${API_BASE}${api.downloadModel}`,
    likeModel:`${API_BASE}${api.likeModel}`,
    recommendMsg:`${API_BASE}${api.recommendMsg}`,
    search:`${API_BASE}${api.search}`,
    searchUserFilter:`${API_BASE}${api.searchUserFilter}`,
    searchModelFilter:`${API_BASE}${api.searchModelFilter}`,
    sendEmailCode:`${API_BASE}${api.sendEmailCode}`,
    validationCode:`${API_BASE}${api.validationCode}`,
    resetPassword:`${API_BASE}${api.resetPassword}`,
    messageList:`${API_BASE}${api.messageList}`,
    messageDelete :`${API_BASE}${api.messageDelete}`,
    messageReading:`${API_BASE}${api.messageReading}`,
    homeData:`${API_BASE}${api.homeData}`,
    share:`${API_BASE}${api.share}`,
    preShare:`${API_BASE}${api.preShare}`,
    zipUpload:`${API_BASE}${api.zipUpload}`,
    facebookLink:`${API_BASE}${api.facebookLink}`,
    facebookDisconnect:`${API_BASE}${api.facebookDisconnect}`,
    twitter:`${API_BASE}${api.twitter}`,
    twitterDisconnect:`${API_BASE}${api.twitterDisconnect}`,
    linkedinDisconnect:`${API_BASE}${api.linkedinDisconnect}`,
    pinterestDisconnect:`${API_BASE}${api.pinterestDisconnect}`,
    linkStatus:`${API_BASE}${api.linkStatus}`,
    projectsHall:`${API_BASE}${api.projectsHall}`,
    myProjects:`${API_BASE}${api.myProjects}`,
    projectHallDetail:`${API_BASE}${api.projectHallDetail}`,
    releaseAttr:`${API_BASE}${api.releaseAttr}`,
    releaseAttrTags:`${API_BASE}${api.releaseAttrTags}`,
    timeZone:`${API_BASE}${api.timeZone}`,
    createProject:`${API_BASE}${api.createProject}`,
    proposalList:`${API_BASE}${api.proposalList}`,
    proposalResults:`${API_BASE}${api.proposalResults}`,
    proposalProgress:`${API_BASE}${api.proposalProgress}`,
    proposalDetail:`${API_BASE}${api.proposalDetail}`,
    bProposalStep:`${API_BASE}${api.bProposalStep}`,
    aProposalStep:`${API_BASE}${api.aProposalStep}`,
    bSubmitPrice:`${API_BASE}${api.bSubmitPrice}`,
    aBContract:`${API_BASE}${api.aBContract}`,
    aChooseArtist:`${API_BASE}${api.aChooseArtist}`,
    paypal:`${API_BASE}${api.paypal}`,
    aUploadFile:`${API_BASE}${api.aUploadFile}`,
    abConcepts:`${API_BASE}${api.abConcepts}`,
    checkPaypalResult:`${API_BASE}${api.checkPaypalResult}`,
    calendarData:`${API_BASE}${api.calendarData}`,
    dayworks:`${API_BASE}${api.dayworks}`,
    uploadDaily:`${API_BASE}${api.uploadDaily}`,
    finalAttach:`${API_BASE}${api.finalAttach}`,
    submission:`${API_BASE}${api.submission}`,
    checkSubmission:`${API_BASE}${api.checkSubmission}`,
    prevContract:`${API_BASE}${api.prevContract}`,
    modifyPaypal:`${API_BASE}${api.modifyPaypal}`,
    payPalInfo:`${API_BASE}${api.payPalInfo}`,
    cashWithdrawal:`${API_BASE}${api.cashWithdrawal}`,
    withdrawHistory:`${API_BASE}${api.withdrawHistory}`,
    feedback:`${API_BASE}${api.feedback}`,
    partnerList:`${API_BASE}${api.partnerList}`,
    partnerItem:`${API_BASE}${api.partnerItem}`,
    reportGetReason:`${API_BASE}${api.reportGetReason}`,
    submitReport:`${API_BASE}${api.submitReport}`,
    planList:`${API_BASE}${api.planList}`,
    planReview:`${API_BASE}${api.planReview}`,
    planBuy:`${API_BASE}${api.planBuy}`,
    planFree:`${API_BASE}${api.planFree}`,
    getAnnotationModelData:`${API_BASE}${api.getAnnotationModelData}`,
    buildingFeedBackList:`${API_BASE}${api.buildingFeedBackList}`,
    buildingFeedBackChecked:`${API_BASE}${api.buildingFeedBackChecked}`,
    buildingFeedBackModify:`${API_BASE}${api.buildingFeedBackModify}`,
    buildingFeedBackHistory:`${API_BASE}${api.buildingFeedBackHistory}`,
    uploadAnnotationList:`${API_BASE}${api.uploadAnnotationList}`,
    submitModelConvertFinish:`${API_BASE}${api.submitModelConvertFinish}`,
    finduser:`${API_BASE}${api.finduser}`,
    invitation:`${API_BASE}${api.invitation}`,
    deleteProject:`${API_BASE}${api.deleteProject}`,
    deleteModel:`${API_BASE}${api.deleteModel}`,
    newMarketNote:`${API_BASE}${api.newMarketNote}`,
    newMarketList:`${API_BASE}${api.newMarketList}`,
    editModel:`${API_BASE}${api.editModel}`,
    modelFeedback:`${API_BASE}${api.modelFeedback}`,
    saasModelList:`${API_BASE}${api.saasModelList}`,
    saasModelDetails:`${API_BASE}${api.saasModelDetails}`,
    saasModelUpload:`${API_BASE}${api.saasModelUpload}`,
    taskPartyBSubmit:`${API_BASE}${api.taskPartyBSubmit}`,
    taskPublish:`${API_BASE}${api.taskPublish}`,
    taskModelAccept:`${API_BASE}${api.taskModelAccept}`,
    saasPayment:`${API_BASE}${api.saasPayment}`,
    saasHelp:`${API_BASE}${api.saasHelp}`,
    saasInvite:`${API_BASE}${api.saasInvite}`,
    saasApply:`${API_BASE}${api.saasApply}`,
    saasSendInvite:`${API_BASE}${api.saasSendInvite}`,
    saasContract:`${API_BASE}${api.saasContract}`,
    saascConsentContract:`${API_BASE}${api.saascConsentContract}`,
    saasBid:`${API_BASE}${api.saasBid}`,
    saasBidStatus:`${API_BASE}${api.saasBidStatus}`,
    saasGetUserBaseData:`${API_BASE}${api.saasGetUserBaseData}`,
    saasSubmitSpecification:`${API_BASE}${api.saasSubmitSpecification}`,
    saasGetSpecification:`${API_BASE}${api.saasGetSpecification}`,
    saasChat:`${API_BASE}${api.saasChat}`,
    saasSendChat:`${API_BASE}${api.saasSendChat}`,
    saasCreateChat:`${API_BASE}${api.saasCreateChat}`,
    saasOverProject:`${API_BASE}${api.saasOverProject}`,
    sassPartyAFail:`${API_BASE}${api.sassPartyAFail}`,
    sassGetNda:`${API_BASE}${api.sassGetNda}`,
    sassSetNda:`${API_BASE}${api.sassSetNda}`,
    saasCheckProjectStart:`${API_BASE}${api.saasCheckProjectStart}`,
    saasMarkProjectAsRead:`${API_BASE}${api.saasMarkProjectAsRead}`,
    projectApply:`${API_BASE}${api.projectApply}`,
    userSaveLanguage:`${API_BASE}${api.userSaveLanguage}`,
    modelFormat:`${API_BASE}${api.modelFormat}`,
    companyBasicInfo:`${API_BASE}${api.companyBasicInfo}`,
    getTeamInfo:`${API_BASE}${api.getTeamInfo}`,
    deleteMember:`${API_BASE}${api.deleteMember}`,
    createTeam:`${API_BASE}${api.createTeam}`,
    searchUser: `${API_BASE}${api.searchUser}`,
    inviteMembers: `${API_BASE}${api.inviteMembers}`,
    joinMembers: `${API_BASE}${api.joinMembers}`,
    rejectMembers: `${API_BASE}${api.rejectMembers}`,
    saveTeam: `${API_BASE}${api.saveTeam}`,
    releaseQuote: `${API_BASE}${api.releaseQuote}`,
    saasGetQuote: `${API_BASE}${api.saasGetQuote}`,
    saasGetProjectInfo: `${API_BASE}${api.saasGetProjectInfo}`,
    saasSaveProjectInfo: `${API_BASE}${api.saasSaveProjectInfo}`,
    saasInviteMembers: `${API_BASE}${api.saasInviteMembers}`,
    getTeamMembers: `${API_BASE}${api.getTeamMembers}`,
    saasImportMembers: `${API_BASE}${api.saasImportMembers}`,
    saasGetMembers: `${API_BASE}${api.saasGetMembers}`,
    saasRemoveMember: `${API_BASE}${api.saasRemoveMember}`,
    saasSaveMember: `${API_BASE}${api.saasSaveMember}`,
    saasMarkFail: `${API_BASE}${api.saasMarkFail}`,
    saasGetFeedbackPageData: `${API_BASE}${api.saasGetFeedbackPageData}`,
    saasGetFeedbackList: `${API_BASE}${api.saasGetFeedbackList}`,
    saasGetFeedbackDetail: `${API_BASE}${api.saasGetFeedbackDetail}`,
    saasUpdateFeedbackStatus: `${API_BASE}${api.saasUpdateFeedbackStatus}`,
    removeInternalProject: `${API_BASE}${api.removeInternalProject}`,
    getQiNiuToken: `${API_BASE}${api.getQiNiuToken}`,
    feedbackLeaveComment: `${API_BASE}${api.feedbackLeaveComment}`,
    checkPermission: `${API_BASE}${api.checkPermission}`,
    testInternalPermission: `${API_BASE}${api.testInternalPermission}`,
    getFileTypeList: `${API_BASE}${api.getFileTypeList}`,
    deleteFeedback: `${API_BASE}${api.deleteFeedback}`,
    getChatUserList: `${API_BASE}${api.getChatUserList}`,
    getChatUserHistory: `${API_BASE}${api.getChatUserHistory}`,
};

export default apiUrl
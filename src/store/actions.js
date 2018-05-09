/**
 * Created by harryliu on 23/5/17.
 */
import api from '../api/api'

// export const uploadProject = (context) => {
//     let data = {};
//     data.rphotos = context.getters.getUploadProjectImgs;
//     data.name = context.state.projectDetail.title;
//     data.category = context.state.projectDetail.category;
//     // data.tags = commit.state.projectDetail.tags;
//     // data.vertices = commit.state.projectDetail.vertices;
//     // data.faces = commit.state.projectDetail.faces;
//     data.features = context.state.projectDetail.features;
//     data.license = context.state.projectDetail.license;
//     data.description = context.state.projectDetail.description;
//     data.model = context.state.fileUpload.model;
//     data.model_3d = context.state.fileUpload.model_3d;
//     // data.privacy = commit.state.projectDetail.privacy;
//     data.permit = context.state.projectDetail.permit;
//     data.auth = context.state.uploadProject.auth
//     let promise = new Promise(function (resolve,reject) {
//         // console.log(data)
//         api.uploadProject(data).then(function (response) {
//             //console.log(response)
//             resolve(response)
//         })
//     })
//     return promise
// }

export const clearAllProjectUploadData = function (context) {
    context.commit('uploadProject/clearProjectState')
    context.commit('imageUpload/clearProjectImgs')
    context.commit('projectDetail/clearProjectDetailData')
    context.commit('fileUpload/deleteFile')
    context.commit('uploadProject/joinModel',false)
}

export const ReleaseQuotes = function (context) {
    let data = {
        title:context.state.novahub.releaseQuotes.title,
        industry:context.state.novahub.releaseQuotes.industry,
        engine:context.state.novahub.releaseQuotes.engine,
        category:context.state.novahub.releaseQuotes.category,
        format:context.state.novahub.releaseQuotes.format,
        accuracy:context.state.novahub.releaseQuotes.accuracy,
        texture:context.state.novahub.releaseQuotes.texture,
        rigged:context.state.novahub.releaseQuotes.rigged,
        nums:context.state.novahub.releaseQuotes.number,
        photos:context.getters.getUploadProjectImgs,
        desc:context.state.novahub.releaseQuotes.description,
        time_day:context.state.novahub.releaseQuotes.day,
        time_hour:context.state.novahub.releaseQuotes.hour,
        timezone:context.state.novahub.releaseQuotes.timeZone
    }
    return new Promise(function (resolve) {
        api.postData('releaseQuotes',data).then(function (response) {
            if(response.data.code === 200){
                resolve(response.data.data)
            }
        })
    })
}

export const clearReleaseQuotesData = function (context) {
    context.commit('fileUpload/deleteFile')
    context.commit('imageUpload/clearProjectImgs')
}

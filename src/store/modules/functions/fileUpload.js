/**
 * Created by harryliu on 22/5/17.
 */

import axios from 'axios'
import apiUrl from '../../../api/config'
import api from '../../../api/api'

const fileUpload = {
    namespaced:true,
    state:{
        progress:0,
        fileName:'',
        fileSize:0,
        fileComplete:false,
        model:'', //模型zip包id
        model_3d:'', // 3d 模型id
        fileDir:'',
        fileUploadError:false,
    },
    mutations:{
        setProgress:function (state,progress) {
            state.progress = progress;
        },
        setName:function (state,name) {
            state.fileName = name
        },
        setSize:function (state,size) {
            state.fileSize = size
        },
        setComplete:function (state,dir) {
            state.fileComplete = true;
            state.fileDir = dir
        },
        deleteFile:function (state) {
            state.progress = 0;
            state.fileName = '';
            state.fileComplete = false;
            state.model = '';
            state.model_3d = '';
            state.fileSize = 0;
            state.fileUploadError = false
        },
        setModel:function (state,data) {
            state.model = data.work_attach_id;
            state.model_3d = data.work_3d_id;
        },
        fileUploadError:function (state,status) {
            state.fileUploadError = status
        }
    },
    actions:{
        uploadFile(context,file){
            let formData = new FormData();
            context.commit('setName',file.name)
            context.commit('setSize',file.size)
            formData.append('file', file);

            axios({
                method:'post',
                url:apiUrl.zipUpload,
                headers: { 'Content-Type': 'multipart/form-data' },
                data:formData,
                onUploadProgress: function (progressEvent) {
                    if (progressEvent.lengthComputable) {
                        let percentComplete;
                        percentComplete = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        console.log(percentComplete)
                        context.commit('setProgress',percentComplete)
                    } else {
                        console.warn('upload progress unable to compute')
                    }
                }
            }).then(function (response) {
                if(response.data.code === 200){
                    context.commit('setComplete')
                    context.commit('setModel',response.data.data)
                }
                else{
                    context.commit('fileUploadError',true)
                    console.error('upload error')
                }
            })
        },
        uploadFileAli:function (context,file){
            let promise = new Promise(function (resolve) {
                api.ossToken().then(function (response) {
                    if (response.data.code === 200) {
                        resolve(response.data.data.osstoken)
                    }
                })
            })
            promise.then(function (response) {
                let formData = new FormData();
                let ossSet = response
                context.commit('setName',file.file.name)
                context.commit('setSize',file.file.size)

                formData.append('key', ossSet.dir+file.file.name)
                formData.append('policy',ossSet.policy)
                formData.append('OSSAccessKeyId',ossSet.accessid)
                formData.append('success_action_status',"'200'")
                formData.append('signature',ossSet.signature)
                formData.append('expire',ossSet.expire)

                formData.append('file', file.file);

                axios({
                    method:'post',
                    url:ossSet.host1,
                    headers: { 'Content-Type': 'multipart/form-data' },
                    data:formData,
                    onUploadProgress: function (progressEvent) {
                        if (progressEvent.lengthComputable) {
                            let percentComplete;
                            percentComplete = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                            console.log(percentComplete)
                            context.commit('setProgress',percentComplete)
                        } else {
                            console.warn('upload progress unable to compute')
                        }
                    }
                }).then(function (response) {
                    if(response.status === 204){
                        if(file.autoUpload){
                            api.postData('aUploadFile',{
                                attachment:{
                                    src:ossSet.dir+file.file.name,
                                    size:context.state.fileSize
                                },
                                id:file.id
                            })
                        }
                        context.commit('setComplete',ossSet.dir)
                        //context.commit('setModel',response.data.data)
                    }
                    else{
                        console.error('upload error')
                    }
                })
            })

        }
    }
}

export default fileUpload

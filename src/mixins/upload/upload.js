/**
 * @author harryliu on 19/03/2018
 * @GitHub https://github.com/harry-liu
 */

import apiUrl from "../../api/config";
import instance from '../../api/instance'
import * as qiniu from 'qiniu-js'
import store from '../../store/store'

let Upload = {
    OnChanged:function () {

    },
    OnStart:function () {

    },
    OnEnd:function () {

    },
    startUpload(file,type,params,callbacks){
        if(callbacks.OnStart instanceof Function){
            callbacks.OnStart()
        }
        this.OnStart = callbacks.OnStart;
        if(callbacks.OnChanged instanceof Function){
            this.OnChanged = callbacks.OnChanged;
        }
        if(callbacks.OnEnd instanceof Function){
            this.OnEnd = callbacks.OnEnd;
        }
        switch(type){
            case 'cloud':
                this.uploadToCloud(file,params);
                break;
            case 'backend':
                this.uploadToBackend(file,params);
                console.log(params)
                break;
            default:
                console.log('upload target is not in list');
                break;
        }
    },
    changeFileStatus(file,status,response){
        file.status = status;
        this.OnChanged();
        if(status === 'success' || status === 'error'){
            this.OnEnd({status,response})
        }
    },
    uploadToBackend(file,params){
        this.changeFileStatus(file,'uploading');
        let formData = new FormData();

        formData.append('file', file.file);
        formData.append("time",new Date().toString());
        formData.append('id',params.modelId);

        let url = params.target === 0?apiUrl.zipUpload:apiUrl.saasModelUpload;

        instance({
            method:'post',
            url,
            headers: { 'Content-Type': 'multipart/form-data' },
            data:formData,
            onUploadProgress(progressEvent) {
                let percentComplete;
                if (progressEvent.lengthComputable) {
                    percentComplete = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    file.progress = percentComplete
                } else {
                    console.warn('upload progress unable to compute')
                }
            }
        }).then((res) => {
            if(res.data.code === 200) {  //上传成功
                this.changeFileStatus(file,'success',res);
                file.file = null;
            }
            else{
                this.changeFileStatus(file,'error',res);
                console.log('upload error')
            }
        })
    },
    async uploadToCloud(file,params){
        this.changeFileStatus(file,'uploading');
        let observer = {
            next:(res) => {
                file.progress = res.total.percent;
            },
            error:(err) => {
                this.changeFileStatus(file,'error',err);
                console.warn('upload progress unable to compute: '+err);
            },
            complete:(res) => {
                this.changeFileStatus(file,'success',res);
                file.file = null;
            }
        };
        let setting = await store.dispatch('qiNiu/getQiNiuToken');
        let observable = qiniu.upload(file.file, file.dir + '/' + file.name, setting.data.token,{params:{}},{region:setting.data.region});
        observable.subscribe(observer)
    }
};

export default Upload